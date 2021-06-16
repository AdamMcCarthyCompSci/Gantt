import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectedTaskTable,
    renameTask,
    descTask
} from './TableSlice';
import styles from './Table.module.css';
import moment from "moment";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

export function TaskInfo() {
    const dispatch = useDispatch();
    const selectedTask = useSelector(selectedTaskTable);
    const classes = useStyles();
    const handleName = (event) => {
        dispatch(renameTask({name: event.target.value}))
    };
    const handleDesc = (event) => {
        dispatch(descTask({desc: event.target.value}))
    };

    return (
        <div className={styles.taskInfoContainer}>
        <Grid container spacing={0}>
            <Grid item xs={6}>
                {selectedTask.selected && <TextField id="TaskName" label="Task Name" value={selectedTask.name} defaultValue={selectedTask.name} onChange={handleName} variant="outlined"/>}
                {!selectedTask.selected && <TextField disabled id="TaskName" label="No Task Selected" value={selectedTask.name} defaultValue={selectedTask.name} onChange={handleName} variant="outlined"/>}
            </Grid>
            <Grid item xs={6}>
                {selectedTask.selected && <TextField
                id="TaskDesc"
                label="Task Description"
                multiline
                rows={4}
                rowsMax={4}
                value={selectedTask.desc}
                onChange={handleDesc}
                variant="outlined"
                />}
                {!selectedTask.selected && <TextField
                    disabled
                id="TaskDesc"
                label="No Task Selected"
                multiline
                rows={4}
                rowsMax={4}
                value={selectedTask.desc}
                onChange={handleDesc}
                variant="outlined"
                />}
            </Grid>
        </Grid>
      </div>
    )
}