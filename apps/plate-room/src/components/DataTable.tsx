import type { ReactNode } from 'react';
import styles from './DataTable.module.css';

export interface Column<T> {
  key: string;
  head: string;
  align?: 'left' | 'right';
  render: (row: T) => ReactNode;
  /** Marks the column as the row's identifier for assistive technology. */
  rowHeader?: boolean;
}

export function DataTable<T>({
  columns,
  rows,
  caption,
  dense = false,
  footer,
}: {
  columns: readonly Column<T>[];
  rows: readonly T[];
  caption?: string;
  dense?: boolean;
  footer?: ReactNode;
}) {
  return (
    <table className={`${styles.table} ${dense ? styles.dense! : ''}`}>
      {caption && <caption className={styles.caption}>{caption}</caption>}
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key} scope="col" data-align={c.align ?? 'right'}>
              {c.head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {columns.map((c) =>
              c.rowHeader ? (
                <th key={c.key} scope="row" data-align={c.align ?? 'left'}>
                  {c.render(row)}
                </th>
              ) : (
                <td key={c.key} data-align={c.align ?? 'right'}>
                  {c.render(row)}
                </td>
              ),
            )}
          </tr>
        ))}
      </tbody>
      {footer && <tfoot>{footer}</tfoot>}
    </table>
  );
}
