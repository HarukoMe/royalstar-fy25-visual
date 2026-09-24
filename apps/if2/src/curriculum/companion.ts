/** Original study notes for the 2026 IF2 paper. Not the CII study text. */

export type CompanionBlock = {
  id: string;
  heading: string;
  hold?: string;
  paras: string[];
  bullets?: string[];
};

export type CompanionChapter = {
  chapter: number;
  title: string;
  lo: string;
  weight: string;
  blocks: CompanionBlock[];
};

export const COMPANION: CompanionChapter[] = [
  {
    chapter: 1,
    title: "Motor insurance",
    lo: "1.1",
    weight: "Inside the 36 product questions. Motor is the class they come back to.",
    blocks: [
      {
        id: "c1-how",
        heading: "How to read this chapter",
        hold: "Injury is unlimited at every rung. Property damage is not. That single split answers half the motor items.",
        paras: [
          "Private motor is one ladder, not four unrelated policies. Road Traffic Act only is the legal floor. Third party only is that floor plus the extras insurers actually sell. Third party, fire and theft adds the insured’s own car, but only for fire and theft. Comprehensive is the first rung that pays accidental and malicious damage to that car, and even then it is ‘all risks’ with a list of holes, not a promise to pay every loss.",
          "When a question names a driver, a passenger, a loading bay or a car that is not theirs, sort it before you look at the options. Whose car? Whose injury? On a road, or off it? Own damage, or someone else’s? The headings under this chapter are the full key-facts walk, in order. Use them as the book. Use this note as the map.",
          "Two exceptions people invent in the exam and that the specimen paper does not accept: a car in a garage, and a car on a private driveway. The stated way to be off the insurance duty is a Statutory Off Road Notification to the DVLA. Say that out loud once so the wrong options feel wrong.",
        ],
      },
      {
        id: "c1-split",
        heading: "The splits that actually get marked",
        paras: [
          "Motorcycle is not ‘a small car’. Accessories and spare parts are only covered if the machine itself is stolen at the same time. There is no personal accident benefit and no medical expenses beyond emergency treatment. Commercial motor is about the vehicle, not the load — goods in transit is another class. Commercial third-party property is usually tighter than the private-car £20 million, and driving other vehicles is left out because the range of vehicles is too wide to give away.",
          "Foreign use has two layers. Minimum cover for the country you visit is already there. The same cover you bought at home is an extension you ask for. A green card is a certificate, not a second policy, and the countries where it is not required have changed — learn the rule from the heading, not from a blog.",
        ],
      },
    ],
  },
  {
    chapter: 2,
    title: "Health insurance",
    lo: "1.1",
    weight: "Still inside the 36. Small chapter, sharp distinctions.",
    blocks: [
      {
        id: "c2-how",
        heading: "Benefit is not a refund",
        hold: "Personal accident pays a stated sum when a contingency happens. Medical expenses pays the bill.",
        paras: [
          "A personal accident and sickness policy is a benefit contract. The insurer does not measure your financial loss and reimburse it. They pay the capital sum or the weekly benefit you bought, if the contingency in the wording happens. That is why occupation rates the accident element — the chance of injury — and not the sickness element in the same way. It is also why weekly benefits are kept near normal earnings: not because the insurer thinks you will hurt yourself on purpose, but because a benefit that beats wages is a reason to stay off work.",
          "A franchise is the trap in the sickness section. Seven days usually means nothing is paid if you are back before day seven, and the whole period is paid if you are not. An excess is the opposite habit: it is always sliced off the claim. If you mix those two words you will miss an easy item.",
          "Medical expenses insurance is the other product in this chapter. It buys private treatment outside the NHS — hospital, specialist, ambulance — often as an employee benefit. It is indemnity for the cost of treatment. It is not a lump sum for losing a limb, and it is not long-term residential care.",
        ],
      },
    ],
  },
  {
    chapter: 3,
    title: "Package policies",
    lo: "1.1",
    weight: "Inside the 36. Household is the one they write scenes about.",
    blocks: [
      {
        id: "c3-how",
        heading: "One document, several boxes",
        hold: "Buildings, contents, and things away from the home are different boxes even when they share a schedule.",
        paras: [
          "A package exists because the customers look alike, not because the perils became one peril. A household policy can hold buildings, contents, liability, and sometimes travel or legal expenses. The exam still wants you to know which box pays. Subsidence is a buildings question, usually with a heavy excess. Storm damage to a fence may be out. Theft of contents often depends on forcible entry. All risks, or personal possessions, is the extension for things that leave the risk address.",
          "New for old is not the same promise as indemnity. Indemnity puts you back, wear and tear included. New for old replaces without that deduction, usually with conditions about the sum insured being enough. If the sum insured is short, average can still cut the claim. Commercial packages — shop, office, tradesman, hotel — are the same idea with a different schedule: property, money, liability, and sometimes business interruption, each with its own limit.",
        ],
      },
    ],
  },
  {
    chapter: 4,
    title: "Property insurance",
    lo: "1.1",
    weight: "Inside the 36. Name the peril before you name the policy.",
    blocks: [
      {
        id: "c4-how",
        heading: "Four questions, four policies",
        hold: "Fire, theft, glass and money do not answer each other.",
        paras: [
          "Fire and special perils is about the building or contents being damaged by named events: fire, lightning, explosion, and the special perils the wording adds — storm, flood, burst pipes, impact, riot, malicious damage. Unoccupancy changes the risk, so the wording often restricts cover or asks you to tell them. Do not assume a closed shop is still on full perils.",
          "Theft is not ‘anything missing’. The usual trigger is forcible and violent entry or exit, with hold-up as its own event. Money is a different policy because cash walks. Employee fraud is often fidelity, not theft. Glass is the shop front and the sign, often with a boarding-up extension, and a glass claim on a motor policy is the one that may leave the no-claims discount alone. All risks is specified or unspecified property against accidental loss, with a list of exclusions, not a mood.",
        ],
      },
    ],
  },
  {
    chapter: 5,
    title: "Pecuniary insurance",
    lo: "1.1",
    weight: "Inside the 36. Two products carry it: legal expenses, and business interruption.",
    blocks: [
      {
        id: "c5-how",
        heading: "Money that is not the building",
        hold: "Business interruption does not start until there is a valid material-damage claim. The indemnity period is how long they pay, not ‘until renewal’.",
        paras: [
          "Pecuniary means the loss is money — profit, fees, legal bills — rather than a burnt wall. Legal expenses pays the cost of specified disputes. It is not public liability. If the question is ‘a guest was injured’, you are in liability, not here. If the question is ‘they need a lawyer for a contract fight the wording covers’, you are here.",
          "Business interruption pays for the trading loss after insured damage: loss of gross profit or revenue, and extra cost of working, for the indemnity period. The material damage warranty is the hinge. No valid claim on the property policy, no business interruption, even if the shop is shut. The sum insured is built from turnover or gross profit, not from the rebuild cost. Fidelity and credit sit in the same family when the question is employee dishonesty or a customer who does not pay.",
        ],
      },
    ],
  },
  {
    chapter: 6,
    title: "Liability insurance",
    lo: "1.1",
    weight: "Inside the 36. The richest set of mix-ups in the product half.",
    blocks: [
      {
        id: "c6-how",
        heading: "Three questions, in this order",
        hold: "Who was hurt? Was there property damage? Does the policy care when the injury happened, or when the claim was made?",
        paras: [
          "Employers’ liability is compulsory for most employers in Great Britain. It pays for injury or disease to employees arising out of and in the course of employment. It does not pay for damage to their property. The statutory floor and the limit insurers actually write are different numbers — learn both from the heading, and do not borrow public liability’s figure.",
          "Public liability is the open policy for third parties who are not employees. Injury and property damage, happening in the period. The exclusions do the sorting: employees go to employers’ liability, products often go to a products section, professional advice goes to professional indemnity, motor goes to motor. Products liability is injury or damage from goods you supplied, often with a yearly aggregate, and it is not the buyer’s extended warranty. Extended warranty is the buyer paying to stretch the maker’s guarantee. A television that dies in month fourteen is warranty. A television that burns the house is products.",
          "Directors’ and officers’, professional indemnity, and pension trustees are claims-made. The claim has to be made in the period, usually with a retroactive date. Employers’ liability is occurrence: the injury is caused in the period, even if the claim arrives years later. If you only remember one sentence from this chapter, remember that trigger.",
        ],
      },
    ],
  },
  {
    chapter: 7,
    title: "Non-insurance services",
    lo: "1.2",
    weight: "The rest of learning outcome 1. The specimen paper does ask these. They are services, not covers.",
    blocks: [
      {
        id: "c7-help",
        heading: "Helplines are not claims",
        hold: "A helpline is advice. It does not indemnify a loss unless a separate section of the policy says it does.",
        paras: [
          "Around the policy, insurers and brokers sell help: a legal helpline, a domestic emergency number, a medical advice line on a travel or health package. The customer experiences it as ‘part of the insurance’. On the paper it is a non-insurance service. You are not being asked which peril responds. You are being asked what the service is for, and what it does not pay.",
          "The useful test is whether money is paid to put the person back, or whether someone talks them through a problem. Advice, a referral, a script the nurse reads — service. A cheque for the burnt kitchen — insurance. Some wordings then buy a contractor as well. That contractor may be an authorised supplier, which is the next heading, not a silent widening of the sum insured.",
        ],
      },
      {
        id: "c7-repair",
        heading: "Authorised repairers",
        paras: [
          "An approved repairer or supplier is how the insurer controls cost and quality. The insured often gets the work done with less hassle, sometimes with a guarantee from the network, and gives up a free choice of garage or builder. Motor policies push you toward the approved network for the same reason they like courtesy cars from that network: the rate was priced on that channel.",
          "If a question says the customer wants their own repairer, the point is usually whether the policy still pays a reasonable cost, not whether the peril has changed. Read the stem for ‘who does the work’, and keep that separate from ‘is it covered’.",
        ],
      },
      {
        id: "c7-risk",
        heading: "Risk control",
        paras: [
          "Risk control, or a survey, is the insurer looking at the thing they might insure and saying what would make it acceptable. A surveyor’s requirement — locks, sprinklers, a hot-work permit, waste removed — can become a condition of cover. Ignore it and you may have a cover problem later, not merely a disappointed underwriter.",
          "Brokers do a version of this too: helping a client see the risk before the form is filled in. That advice is a service. It is not itself the policy, and it does not move a loss from one class to another.",
        ],
      },
      {
        id: "c7-ulr",
        heading: "Uninsured loss recovery",
        hold: "Recovering your excess from the driver who hit you is not the same as your own-damage claim, and it is not the Motor Insurers’ Bureau.",
        paras: [
          "After a motor accident that is not your fault, your comprehensive insurer may pay your car and protect you, while your excess, hire charges, and injury still sit with the other driver. Uninsured loss recovery is the service that pursues those bits. It is often bundled, sometimes capped, and it assumes there is someone to pursue.",
          "If the other driver cannot be traced, or has no insurance, you are in a different mechanism — the Motor Insurers’ Bureau, in the claims chapter — or in the comprehensive ‘uninsured driver promise’ if the wording has one and you can identify the other vehicle. Three different doors. Do not open them with the same key.",
        ],
      },
    ],
  },
  {
    chapter: 8,
    title: "Material circumstances",
    lo: "2.1–2.3",
    weight: "Learning outcome 2 is about 31 questions. This is where that half of the paper starts.",
    blocks: [
      {
        id: "c8-material",
        heading: "What ‘material’ means",
        hold: "Material is what would influence a prudent underwriter’s mind — whether to take the risk, and on what terms. It is not ‘what the client thinks is important’.",
        paras: [
          "Underwriters are not curious for sport. They price a risk from facts. A circumstance is material when it would affect the judgement of a careful underwriter: accept or refuse, what premium, what excess, what warranty, what exclusion. A new kitchen the client is proud of may be irrelevant. A flood claim last year, a flat roof, a young main driver, a business that now does hot work — those move the decision.",
          "The law splits by who the customer is, and the paper expects you to know the split exists. A consumer has to take reasonable care not to make a misrepresentation. They are not under the old duty to volunteer everything a commercial proposer must present. A non-consumer has a duty of fair presentation: disclose every material circumstance they know or ought to know, or give the insurer enough information to put them on enquiry. Remedies for getting this wrong are proportionate in the modern statutes — avoid the contract only in the serious cases, alter terms, or reduce the claim — not an automatic ‘you lied, we pay nothing’ in every file. Learn the shape. Do not invent a percentage.",
        ],
      },
      {
        id: "c8-hazard",
        heading: "Physical hazard and moral hazard",
        hold: "Physical hazard is the thing. Moral hazard is the person.",
        paras: [
          "Physical hazard is anything about the subject matter that makes a loss more or less likely or more or less severe. Construction, heating, security, occupation, where the car is kept, how close the river is, whether the building is empty. You can photograph it.",
          "Moral hazard is the behaviour and character that change the odds: carelessness, dishonesty, a claims history that looks like a habit, an insured who will not maintain the property, a driver who lends the car to anyone. You infer it. The exam loves a sentence that could be either, so label it before you pick.",
          "Legislation sits beside both. Compulsory insurance — motor, employers’ liability — tells the underwriter the cover cannot simply be refused in the ordinary way, and that some exclusions will not bind an injured third party even if they bind the insured. Health and safety duties, how a vehicle may be used, what a business is allowed to do: all of that is part of assessing the risk, not a separate hobby.",
        ],
      },
      {
        id: "c8-ask",
        heading: "How the underwriter finds out",
        paras: [
          "The proposal form is the classic tool: a list of questions, a declaration, a warning that answers matter. Other routes are normal and examinable. A survey. A meeting. Last year’s claims. The previous insurer. What the broker puts in the presentation. What is already public. For a large commercial risk the ‘form’ may be a submission, not a two-page household sheet.",
          "Silence is not neutral when a question was asked. A blank answer, or a reckless guess, is how misrepresentation items are built. And the duty is not only at inception. A change in the risk during the year, and the renewal itself, put the facts back on the table. Renewal is a new contract, not a polite continuation of last year’s silence.",
        ],
      },
    ],
  },
  {
    chapter: 9,
    title: "Underwriting procedures and premium",
    lo: "2.4, 2.5, 2.8 and 3.1",
    weight: "Most of this is inside the 31 underwriting questions. Premium calculation is only about 2 questions — know the idea, do not memorise a fake formula.",
    blocks: [
      {
        id: "c9-chain",
        heading: "The chain, in order",
        hold: "Enquiry, presentation, quote, acceptance, documents, premium. A quote is not a contract.",
        paras: [
          "Someone asks for cover. The broker, or the client, presents the risk. The insurer offers terms: premium, excess, conditions, subjectivities such as ‘survey within 30 days’. The client accepts. Only then do you have an agreement to insure, and even then the paperwork has to match what was agreed. A quotation is an invitation to accept those terms. It is not cover. ‘We can do this for £400’ does not pay a fire that happens that night.",
          "Regulation sits on the chain rather than replacing it. The insurer and the intermediary need a clear relationship: who may bind, up to what limit, whose money the premium is while it sits in the client account, how complaints move. A terms of business agreement is that relationship written down. If the question is about authority — could the broker accept the risk on the insurer’s behalf? — you are in the agreement, not in the peril.",
        ],
      },
      {
        id: "c9-docs",
        heading: "What the documents are for",
        paras: [
          "The policy wording is the promise and its edges. The schedule is this insured, this period, these sums, these sections, this excess. A certificate is a short proof that compulsory cover exists — motor, employers’ liability — and it is not the full wording. Mixing ‘the certificate says’ with ‘the policy covers’ is how people pay the wrong claim in their head.",
          "Who produces the information, and when, matters. The proposer knows the risk. The broker assembles it and must not tidy away a material fact. The insurer asks, surveys, and decides. After inception, the insured still has to tell the insurer what the wording or the law requires when the risk changes. Timing in a question — before inception, mid-term, at renewal — changes which duty you are in.",
        ],
      },
      {
        id: "c9-premium",
        heading: "Premium, without the fairy tale",
        paras: [
          "Premium is the price of the risk plus the cost of selling it and a margin. Rating factors are whatever changes the expected cost: for a private car, who drives, what they drive, where, what cover, what history. For a factory, construction, occupation, protections, claims. You are not required to compute a rate. You are required to see which fact in the stem would move the price, and to know that non-payment can end cover if the condition says so.",
          "Instalments do not make the premium smaller. They spread it, and they create a credit risk. If the question is ‘they stopped paying in month four’, look for a condition about cancellation, not for a new peril. Learning outcome 3 is tiny on the paper. Spend your hours on the chain and the documents, then be able to say what a rating factor is.",
        ],
      },
    ],
  },
  {
    chapter: 10,
    title: "Policy wordings and renewals",
    lo: "2.5–2.8",
    weight: "Still the 31. Conditions, warranties, exclusions, excesses and renewals are a favourite cluster.",
    blocks: [
      {
        id: "c10-edges",
        heading: "Four different ‘no’",
        hold: "An exclusion was never covered. A condition is a duty. A warranty is a promise about facts or future conduct. An excess is covered, then sliced.",
        paras: [
          "Read a wording as layers. The operative clause says what is covered. Exclusions carve events out entirely — war, wear and tear, the driver’s own property in his custody. If it is excluded, you do not reach the claim. Conditions are duties: notify promptly, take reasonable care, do not admit liability. Some are so important that the claim depends on them. Warranties are promises — the alarm will be set, the vehicle will only be used as described. Breach of warranty is no longer, for the contracts the modern statute covers, an automatic end of the whole policy from day one. The cover is suspended while you are in breach, and it can return when you put it right, unless the loss had nothing to do with the promise. That is the point the old textbook habit gets wrong.",
          "Representations are what you said to get the contract. They live with misrepresentation and fair presentation, back in the material-circumstances chapter. Do not call every answer a warranty. The form has to make it a warranty, or the law has to.",
        ],
      },
      {
        id: "c10-money",
        heading: "Excess, deductible, franchise",
        paras: [
          "An excess, and in commercial language often a deductible, is the first part of a covered loss that the insured keeps. The loss is insured. The cheque is smaller. A franchise is a threshold. Under it, nothing is paid. Over it, the loss is paid in full, including the amount of the franchise. You already met this on sickness benefit. It is the same shape on a property wording when a wording still uses the word.",
          "A large excess is also an underwriting tool. It makes the insured carry the attritional losses so the premium can stay down. If the stem says ‘they bear the first £1,000’, you are not looking at an exclusion.",
        ],
      },
      {
        id: "c10-renew",
        heading: "Renewal is a new contract",
        paras: [
          "There is no general right to the same policy next year. The insurer offers terms. The insured accepts, or not. Duties about the facts come back, because this is a fresh agreement. Cooling-off and cancellation rights for consumers sit beside that, and they are not the same as a mid-term cancellation for non-payment.",
          "A question that says ‘at renewal they forgot to mention the new extension’ is a disclosure question wearing a diary date. A question that says ‘the insurer renewed but then avoided’ is about remedies, not about the peril.",
        ],
      },
    ],
  },
  {
    chapter: 11,
    title: "Valid claims and settlement",
    lo: "4 and 5",
    weight: "About 21 questions on claims, plus about 2 on applying policy conditions to a claim. This is the other big block after underwriting.",
    blocks: [
      {
        id: "c11-valid",
        heading: "When a claim is a claim",
        hold: "Insured event, in the period, inside the wording, conditions met, and the person has a right to claim. Miss one and it is not ‘a bit valid’.",
        paras: [
          "A valid claim needs an event the policy bought, during the period of insurance, to a person who can claim, with the loss not excluded, and with the duties in the conditions observed. Insurable interest is the old backbone: you claim for a loss that is yours, not for a stranger’s car you admire. On liability policies the ‘loss’ is the legal liability to someone else, so the interest looks different and is still real.",
          "Partly met is the ordinary day. Excess off. Average, where the sum insured is too low on a property policy that applies it, so you share the underinsurance. A limit that caps the payment. Contribution, where two policies cover the same loss and neither meant to pay twice. Those are payments. They are not refusals.",
          "A refusal sounds like: excluded peril, outside the period, no insurable interest, a condition precedent broken in a way that still defeats the claim, or fraud. Late notification is only fatal if the wording and the law make it so — delay that does not prejudice the insurer is not a magic wand. Read the stem for prejudice before you tick ‘refuse’.",
        ],
      },
      {
        id: "c11-duties",
        heading: "What the insured must do after a loss",
        paras: [
          "Tell the insurer, in time, with enough detail. Mitigate: put the tarp on the roof, don’t drive the wrecked car into a second accident. Do not admit liability on a third-party claim; that is the insurer’s argument to have. For theft, tell the police and get a reference. Keep damaged property until they have seen it, unless keeping it would make the loss worse.",
          "Evidence is how the claim is proved. Claim form, invoices, estimates, photographs, proof you owned it, a surveyor’s report on a larger loss, medical evidence on injury. The insurer may also appoint a loss adjuster. The adjuster investigates. They do not, by themselves, decide the law.",
        ],
      },
      {
        id: "c11-fight",
        heading: "When they disagree",
        paras: [
          "Alternative dispute resolution is the attempt to finish the argument without a court. Mediation is a guided settlement. Arbitration is a private decision, often binding if the wording says so. The Financial Ombudsman Service is for eligible complainants — typically consumers and smaller businesses — after the firm’s own complaint process. It is not the court, and it is not available to every commercial claimant.",
          "Market agreements are insurers agreeing among themselves how a recurring mess is shared, so the customer is not left in the middle. They do not rewrite the customer’s wording. If you see ‘knock for knock’ in an old motor context, that is this family: insurers sorting their own books.",
        ],
      },
      {
        id: "c11-mib",
        heading: "Motor Insurers’ Bureau, recovery, fraud",
        hold: "The MIB pays certain victims of uninsured or untraced drivers. It is not your comprehensive policy, and it is not uninsured-loss recovery.",
        paras: [
          "If a negligent driver has no insurance, or cannot be traced, an innocent victim may have a route through the Motor Insurers’ Bureau under its agreements. That is a fund and a set of rules, with its own limits and exceptions. Your own insurer’s ‘uninsured driver promise’ on a comprehensive policy is a contractual extra for your car and your no-claims discount, and only when you can identify the other vehicle. Uninsured loss recovery is a service that chases a known at-fault person for the pieces your policy did not pay. Three doors again.",
          "After the insurer pays you, they may step into your rights against the person who caused the loss. That is subrogation. They cannot recover more than they paid you, and they cannot sue you for the same insured loss. Contribution is the sister idea between insurers.",
          "Fraud is in its own box. A dishonest claim can cost the whole claim, not just the invented part, and it can end the relationship. Inventing a stolen ring is not ‘average’. It is a different wrong. Reserving, briefly: insurers put money aside for claims they know about and for claims they expect but have not been told. You will not be asked to calculate a reserve. You may be asked why one exists.",
        ],
      },
    ],
  },
  {
    chapter: 12,
    title: "Data, security and technology",
    lo: "6",
    weight: "About 5 questions. Enough to lose an easy pass if you skip it. Not enough to displace underwriting and claims.",
    blocks: [
      {
        id: "c12-data",
        heading: "Personal data is a duty, not a filing habit",
        hold: "Lawful, limited, accurate, kept only as long as needed, and kept safe. Health data on a medical policy is in a tighter class.",
        paras: [
          "A proposal form is full of personal data: name, address, health, convictions, a child’s date of birth on a family accident policy. UK data protection law — the UK GDPR and the Data Protection Act 2018 — says you need a lawful reason to hold it, you collect what you need for that reason, you keep it accurate, you do not keep it forever, and you secure it. Accountability means you can show you did those things, not merely hope you did.",
          "Health, race, religion, sexual life, biometrics and similar categories are special. A medical expenses insurer needs health information and must treat it as special category data, with a tighter lawful basis. Leaving a proposal on a train is not a customer-service slip. It is a security incident.",
        ],
      },
      {
        id: "c12-keep",
        heading: "Storage, disposal, security",
        paras: [
          "Keep what the claim, the regulator, or the tax rules still need. Do not keep everything because the cupboard is large. Disposal is part of the duty: shredding, secure deletion, a contractor who is themselves bound to confidentiality. A bin bag in the car park is an exam answer.",
          "Security is access. Who can open the claims system, passwords that are not shared, screens that lock, laptops encrypted, paper files not taken home ‘just this once’ unless the rule allows it. The industry’s wider problem is the same duty at scale: old systems, data shared with loss adjusters and repair networks, customers who expect an app, and criminals who would like the database. Cyber insurance, back in liability, is the product that responds to some of that. This chapter is the duty, not the product.",
        ],
      },
    ],
  },
  {
    chapter: 13,
    title: "Customer service",
    lo: "7",
    weight: "About 3 questions. Short, and still on the paper.",
    blocks: [
      {
        id: "c13-standard",
        heading: "A standard you can fail",
        hold: "A customer service standard is a promise with a measure. ‘We try to be nice’ is not a standard.",
        paras: [
          "A standard says what the customer can expect and how the firm will know it happened. Answer the phone in a stated time. Acknowledge a claim the same day. Explain a refusal in writing, with a reason, and with how to complain. You implement it by training people, measuring the thing you promised, and putting it right when you miss. A poster in the kitchen is not implementation.",
          "Insurance customers are often distressed, and some are vulnerable: bereavement, illness, low literacy, a first language that is not English. The standard has to work for them too. Speaking slower and offering a different channel is part of the job, not a favour.",
        ],
      },
      {
        id: "c13-rules",
        heading: "The obligations that sit on the service",
        paras: [
          "Conduct rules require the firm to pay due regard to the customer’s interests and to information needs, to handle claims promptly and fairly, and to run a complaint process that ends, if the customer is eligible and still unhappy, at the Financial Ombudsman Service. The Consumer Duty pushes the same idea harder: products that offer fair value, communications people can understand, and support that actually helps them use the policy. You will not be asked to quote a paragraph number. You will be asked which behaviour meets the duty and which is a slogan.",
          "A complaint is a chance to hear that the standard failed. It has a clock, a record, and a proper answer. Ignoring it is itself a breach. None of this changes which peril pays. It changes whether the firm is allowed to treat people this way while it decides.",
        ],
      },
    ],
  },
];
