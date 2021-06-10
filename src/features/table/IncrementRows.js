import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    rowCountTable,
    decrement,
    increment
} from './TableSlice';
import styles from './Table.module.css';

export function IncrementRows() {
    const count = useSelector(rowCountTable);
    const dispatch = useDispatch();

    return (
        <div className={styles.row}>
            <button
                className={styles.button}
                aria-label="Increment value"
                onClick={() => dispatch(increment())}
                >
                    +
            </button>
            <span className={styles.value}>{count}</span>
                <button
                className={styles.button}
                aria-label="Decrement value"
                onClick={() => dispatch(decrement())}
                >
                    -
                </button>
        </div>
    )
}