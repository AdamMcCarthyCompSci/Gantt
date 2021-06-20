import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    futureMonth,
    pastMonth
} from './TableSlice';
import styles from './Table.module.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import RestoreIcon from '@material-ui/icons/Restore';
import UpdateIcon from '@material-ui/icons/Update';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }));

export function IncrementMonths() {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <div className={styles.row}>
            <div className={classes.root}>
            <ButtonGroup color="primary" aria-label="Month Buttons">
            <Button variant="contained" color="primary" startIcon={<RestoreIcon />} onClick={() => dispatch(pastMonth())}>Last Month</Button>
              <Button variant="contained" color="primary" startIcon={<UpdateIcon />} onClick={() => dispatch(futureMonth())}>Next Month</Button>
            </ButtonGroup>
          </div>
        </div>
    )
}