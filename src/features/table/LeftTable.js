import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  rowCountTable,
} from './TableSlice';
import styles from './Table.module.css';

export function LeftTable() {

    const dispatch = useDispatch();
    const count = useSelector(rowCountTable);

    return (
        <div className={styles.leftTableContainer}>
        <table className={styles.leftTable}>
          <thead>
            <tr>
                <th className={styles.leftHeader}>
                    test1
                </th>
            </tr>
            <tr>
                <th className={styles.leftHeader}>
                    test1
                </th>
            </tr>
            </thead>
            <tbody>
              {[...Array(count)].map((index, row) => (
                  <tr>
                      <td key={row} className={styles.leftRow}>
                        task
                      </td>
                  </tr>
            ))}
              </tbody>
        </table>
        </div>
    );
  }
  