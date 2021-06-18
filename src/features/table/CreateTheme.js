import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    createTheme,
    themesTable
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
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [color, setColor] = React.useState('');
    const [title, setTitle] = React.useState('');
  
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
        dispatch(createTheme({title: title, color: color}));
      };

    return (
        <div className={styles.row}>
      <Button onClick={handleClickOpen}>New Theme</Button>
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
          <MenuItem value={"#f44336"}><FiberManualRecordIcon style={{fill: "#f44336"}}/></MenuItem>
          <MenuItem value={"#e91e63"}><FiberManualRecordIcon style={{fill: "#e91e63"}}/></MenuItem>
          <MenuItem value={"#9c27b0"}><FiberManualRecordIcon style={{fill: "#9c27b0"}}/></MenuItem>
          <MenuItem value={"#3f51b5"}><FiberManualRecordIcon style={{fill: "#3f51b5"}}/></MenuItem>
          <MenuItem value={"#2196f3"}><FiberManualRecordIcon style={{fill: "#2196f3"}}/></MenuItem>
          <MenuItem value={"#00bcd4"}><FiberManualRecordIcon style={{fill: "#00bcd4"}}/></MenuItem>
          <MenuItem value={"#009688"}><FiberManualRecordIcon style={{fill: "#009688"}}/></MenuItem>
          <MenuItem value={"#4caf50"}><FiberManualRecordIcon style={{fill: "#4caf50"}}/></MenuItem>
          <MenuItem value={"#8bc34a"}><FiberManualRecordIcon style={{fill: "#8bc34a"}}/></MenuItem>
          <MenuItem value={"#cddc39"}><FiberManualRecordIcon style={{fill: "#cddc39"}}/></MenuItem>
          <MenuItem value={"#ffeb3b"}><FiberManualRecordIcon style={{fill: "#ffeb3b"}}/></MenuItem>
          <MenuItem value={"#ff9800"}><FiberManualRecordIcon style={{fill: "#ff9800"}}/></MenuItem>
          <MenuItem value={"#ff5722"}><FiberManualRecordIcon style={{fill: "#ff5722"}}/></MenuItem>
          <MenuItem value={"#795548"}><FiberManualRecordIcon style={{fill: "#795548"}}/></MenuItem>
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