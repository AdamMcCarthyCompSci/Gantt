import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectedTaskTable,
    renameTask,
    descTask,
    themesTable,
    themeTask
} from './TableSlice';
import styles from './Table.module.css';
import moment from "moment";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";

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
    const themes = useSelector(themesTable);
    const classes = useStyles();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleName = (event) => {
        dispatch(renameTask({name: event.target.value}))
    };
    const handleDesc = (event) => {
        dispatch(descTask({desc: event.target.value}))
    };
    const handleThemeChange = (event) => {
        dispatch(themeTask({theme: event.target.value}))
    };

    return (
        <div className={styles.taskInfoContainer}>
        <Grid container spacing={0}>
            <Grid item xs={3}>
                {selectedTask.selected && <TextField id="TaskName" label="Task Name" value={selectedTask.name} defaultValue={selectedTask.name} onChange={handleName} variant="outlined"/>}
                {!selectedTask.selected && <TextField disabled id="TaskName" label="No Task Selected" value={selectedTask.name} defaultValue={selectedTask.name} onChange={handleName} variant="outlined"/>}
            </Grid>
            <Grid item xs={3}>
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
            <Grid item xs={3}>
            {selectedTask.selected && <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Theme</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={selectedTask.theme}
                onChange={handleThemeChange}
                input={<Input />}
              >
                {themes.map((option) => (
                    <MenuItem value={option.title}>{option.title}<FiberManualRecordIcon style={{fill: option.color}}/></MenuItem>
                ))}
              </Select>
              </FormControl>}
            </Grid>
            <Grid item xs={3}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
                disableToolbar
                variant="inline"
                label="Start Date"
                value={startDate}
                onChange={setStartDate}
            />
            <DatePicker
                disableToolbar
                variant="inline"
                label="End Date"
                value={endDate}
                onChange={setEndDate}
            />
            </MuiPickersUtilsProvider>
            </Grid>
        </Grid>
      </div>
    )
}