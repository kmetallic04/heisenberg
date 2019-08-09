import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    InputAdornment,
    Zoom
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    //For the inner elements of the text field
    resize: {
        fontSize: 50
    }
    //TODO: Figure this stuff out
  }));

export default function Dialogue(props){
    const classes = useStyles();

    return (
        <Dialog 
            open={props.createFormOpen} 
            onClose={props.handleCreateFormClose} 
            TransitionComponent={Zoom} 
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">ADD ITEM</DialogTitle>
            <DialogContent>
            <TextField
                id="create-input-item"
                className={classes.textField}
                label="Item"
                fullWidth={true}
                placeholder="Placeholder"
                margin="normal"
                variant="outlined"
            />
            <TextField
                id="create-input-price"
                className={classes.textField}
                variant="outlined"
                label="Price"
                fullWidth={true}
                InputProps={{
                    startAdornment: <InputAdornment position="start">KSh</InputAdornment>,
                }}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={props.handleCreateFormClose} variant="contained" color="primary">
                ADD
            </Button>
            <Button onClick={props.handleCreateFormClose} variant="contained" color="secondary">
                CANCEL
            </Button>
            </DialogActions>
        </Dialog>
    );
}