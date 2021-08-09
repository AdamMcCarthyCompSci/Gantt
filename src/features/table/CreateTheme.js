import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    createTheme,
    themesTable,
    rowsPerThemeTable,
} from './TableSlice';
import styles from './Table.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import TextField from '@material-ui/core/TextField';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

export function CreateTheme() {
    const dispatch = useDispatch();
    const themes = useSelector(themesTable);
    const rowsPerTheme = useSelector(rowsPerThemeTable);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [color, setColor] = React.useState('');
    const [title, setTitle] = React.useState('');
    const themeColors = ["#f44336", "#e91e63", "#9c27b0", "#3f51b5", "#2196f3", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ff9800", "#ff5722", "#795548"];
  
    const handleTitleChange = (event) => {
      setTitle(event.target.value || '');
    };

    const handleColorChange = (event) => {
        setColor(event.target.value || '');
      };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleCancel = () => {
      setOpen(false);
    };

    const handleOk = () => {
        handleCancel();
        for (let theme of themes) {
            if (theme.title == title) {
                console.log("Theme name taken!")
                return;
            }
        }
        dispatch(createTheme({title: title, color: color, rows: rowsPerTheme}));
      };

    return (
        <div className={styles.row}>
      <Button variant="contained" color="primary" startIcon={<CreateIcon />} onClick={handleClickOpen}>New Theme</Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleCancel}>
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
                <TextField id="theme-title" label="Theme Title" 
                value={title} 
                defaultValue={title} 
                onChange={handleTitleChange} 
                variant="outlined"/>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Colour</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={color}
                onChange={handleColorChange}
                input={<Input />}
              >
                {themeColors.map((themeColor) => (
                  <MenuItem value={themeColor}><FiberManualRecordIcon style={{fill: themeColor}}/></MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>


        </div>
    )
}