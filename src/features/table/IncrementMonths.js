import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    futureMonth,
    pastMonth
} from './TableSlice';
import styles from './Table.module.css';

export function IncrementMonths() {
    const dispatch = useDispatch();

    return (
        <div className={styles.row}>
            <button
                className={styles.button}
                aria-label="Past Month"
                onClick={() => dispatch(pastMonth())}
                >
                    {"<"}
            </button>
                <button
                className={styles.button}
                aria-label="Future Month"
                onClick={() => dispatch(futureMonth())}
                >
                    {">"}
                </button>
        </div>
    )
}