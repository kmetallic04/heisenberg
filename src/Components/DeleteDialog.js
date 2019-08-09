import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    Zoom
} from '@material-ui/core';

export default function Dialogue(props){

    return (
        <Dialog 
            open={props.deleteFormOpen} 
            onClose={props.handleDeleteFormClose} 
            TransitionComponent={Zoom} 
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">DELETE ITEM?</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Are you sure you want to delete this item?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={props.handleDeleteFormClose} variant="contained" color="primary">
                DELETE
            </Button>
            <Button onClick={props.handleDeleteFormClose} variant="contained" color="secondary">
                CANCEL
            </Button>
            </DialogActions>
        </Dialog>
    );
}