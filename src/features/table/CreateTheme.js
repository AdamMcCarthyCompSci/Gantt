import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    createTheme
} from './TableSlice';
import styles from './Table.module.css';

export function CreateTheme() {
    const dispatch = useDispatch();

    return (
        <div className={styles.row}>
            <button
                className={styles.button}
                aria-label="Create Theme"
                onClick={() => dispatch(createTheme())}
                >
                    Create Theme
            </button>
        </div>
    )
}