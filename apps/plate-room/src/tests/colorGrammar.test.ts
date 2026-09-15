/**
 * Colour-grammar suite.
 *
 * The rule is: gold means an amount RoyalStar retains, violet means an amount
 * ceded to reinsurers. The rule is enforceable because chart components accept
 * a SemanticRole and never a colour, and src/data/roles.ts is the only mapping
 * from role to token.
 *
 * These tests fail if that invariant is broken, or if a figure is tagged with a
 * role that contradicts its meaning.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { GOLD_TOKENS, NON_RETAINED_ROLES, ROLE_TOKENS, roleColor } from '@/data/roles';
import { figures } from '@/data';
import { interpretations, thesis } from '@/data/interpretation';
import { revenueDecomposition } from '@/data/calculated';

const SRC = join(process.cwd(), 'src');

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const sourceFiles = walk(SRC).filter((f) => /\.(ts|tsx|css)$/.test(f));
const componentFiles = sourceFiles.filter(
  (f) => f.endsWith('.tsx') || (f.endsWith('.ts') && !f.includes('/data/') && !f.includes('/tests/')),
);

describe('gold is reachable only through the retained role', () => {
  it('no non-retained role resolves to a gold token', () => {
    for (const role of NON_RETAINED_ROLES) {
      for (const variant of ['base', 'low', 'high'] as const) {
        expect(GOLD_TOKENS, `${role}/${variant}`).not.toContain(roleColor(role, variant));
      }
    }
  });

  it('the retained role does resolve to gold', () => {
    expect(GOLD_TOKENS).toContain(roleColor('retained', 'base'));
    expect(GOLD_TOKENS).toContain(roleColor('retained', 'high'));
  });

  it('every role maps to a distinct base token', () => {
    const bases = Object.values(ROLE_TOKENS).map((t) => t.base);
    expect(new Set(bases).size).toBe(bases.length);
  });
});

describe('components never name a colour directly', () => {
  it('no component contains a raw hex colour', () => {
    const offenders: string[] = [];
    for (const file of componentFiles) {
      const src = readFileSync(file, 'utf8');
      const matches = src.match(/#[0-9a-fA-F]{3,8}\b/g);
      // Gradient and mask ids legitimately contain "#" references via url(#id),
      // which the pattern above does not match. Anything left is a literal.
      if (matches) offenders.push(`${file}: ${matches.join(', ')}`);
    }
    expect(offenders, `raw hex colours outside the token layer:\n${offenders.join('\n')}`).toEqual(
      [],
    );
  });

  it('no component reaches for a --role- token directly instead of roleColor()', () => {
    const offenders: string[] = [];
    for (const file of componentFiles) {
      if (file.endsWith('roles.ts')) continue;
      const src = readFileSync(file, 'utf8');
      if (/var\(--role-/.test(src)) offenders.push(file);
    }
    expect(offenders, `direct role-token use:\n${offenders.join('\n')}`).toEqual([]);
  });
});

describe('figures are tagged with roles that match their meaning', () => {
  it('reinsurance amounts are tagged ceded, never retained', () => {
    for (const f of Object.values(figures)) {
      const mentionsReinsurance = /reinsur/i.test(f.label);
      const isNetOfReinsurance = /net of reinsurance|net ultimate|as a percentage of gross/i.test(
        f.label,
      );
      if (mentionsReinsurance && !isNetOfReinsurance) {
        expect(f.role, `${f.id} — "${f.label}"`).not.toBe('retained');
      }
    }
  });

  it('insurance revenue and premiums written are gross, not retained', () => {
    expect(figures.insuranceRevenue!.role).toBe('gross');
    expect(figures.premiumsWritten!.role).toBe('gross');
    expect(figures.premiumsReceived!.role).toBe('gross');
    expect(figures.revenueIncrease!.role).toBe('gross');
  });

  it('gross claims figures are gross and net claims figures are retained', () => {
    expect(figures.grossUltimateTotal!.role).toBe('gross');
    expect(figures.ay2019GrossCurrent!.role).toBe('gross');
    expect(figures.netUltimateTotal!.role).toBe('retained');
    expect(figures.ay2019NetCurrent!.role).toBe('retained');
    expect(figures.cededUltimate!.role).toBe('ceded');
  });

  it('equity and retained earnings are retained', () => {
    expect(figures.totalEquity!.role).toBe('retained');
    expect(figures.retainedEarnings!.role).toBe('retained');
    expect(figures.bookValuePerOrdinaryShare!.role).toBe('retained');
    expect(figures.insuranceServiceResult!.role).toBe('retained');
    expect(figures.netIncome!.role).toBe('retained');
  });

  it('the reinsurance contract asset is ceded, despite being an asset', () => {
    expect(figures.reinsuranceContractAssets!.role).toBe('ceded');
  });
});

describe('the revenue decomposition observes the grammar', () => {
  it('opens on gross, sheds ceded and operating, and resolves to retained', () => {
    const [increase, reins, svc, remainder] = revenueDecomposition;
    expect(increase!.role).toBe('gross');
    expect(reins!.role).toBe('ceded');
    expect(svc!.role).toBe('operating');
    expect(remainder!.role).toBe('retained');
  });

  it('the revenue increase does not enter as gold', () => {
    expect(GOLD_TOKENS).not.toContain(roleColor(revenueDecomposition[0].role));
  });
});

describe('the interpretation register', () => {
  it('every interpretation declares a basis that resolves to known figures', () => {
    for (const i of interpretations) {
      expect(i.basis.length, `${i.id} basis`).toBeGreaterThan(0);
      for (const id of i.basis) expect(figures[id], `${i.id} basis ${id}`).toBeDefined();
    }
  });

  it('the thesis declares a basis that resolves to known figures', () => {
    for (const id of thesis.basis) expect(figures[id], `thesis basis ${id}`).toBeDefined();
  });

  it('no interpretation claims that dividends reduced net income', () => {
    const all = [thesis.headline, ...interpretations.map((i) => i.text)].join(' ').toLowerCase();
    expect(all).not.toMatch(/dividend[^.]{0,80}(reduc|lower|decreas)[^.]{0,20}(net income|earnings|profit)/);
    expect(all).not.toMatch(/(net income|earnings|profit)[^.]{0,60}because[^.]{0,60}dividend/);
  });

  it('the thesis separates growth, protection cost and retention without causal bleed', () => {
    expect(thesis.headline).toContain('retained more of the earnings it still produced');
    expect(thesis.headline).not.toMatch(/by design/i);
  });
});
