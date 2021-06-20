import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    rowCountTable,
    decrement,
    increment
} from './TableSlice';
import styles from './Table.module.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }));

export function IncrementRows() {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <div className={styles.row}>
            <div className={classes.root}>
                <ButtonGroup color="primary" aria-label="Row Buttons">
                    <Button variant="contained" color="primary" startIcon={<RemoveIcon />} onClick={() => dispatch(decrement())}>Remove Row</Button>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => dispatch(increment())}>Add Row</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}