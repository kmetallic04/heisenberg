import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    Zoom
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    primaryButton: {
        color: "#000000",
        backgroundColor: "#FFBB00",
    },
    secondaryButton: {
        color: "#FFFFFF",
        backgroundColor: "#008F40",
    },
}));

export default function Dialogue(props){
    const classes = useStyles();

    const handleDelete = () =>{
        const url = 'https://a3dfa65b.ngrok.io/items/delete';
        const data = props.item;
        console.log(data)
        var request = new Request(url, {
            method: 'DELETE', 
            body: JSON.stringify(data), 
            headers: new Headers({ "Content-Type": "application/json" }),
        });
      
        return fetch(request)
        .then(res => res.json())
        .then(props.refresh)
        .then(props.handleDeleteFormClose)
        .catch(err => { throw err })
    }

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
            <Button className={classes.secondaryButton} onClick={props.handleDeleteFormClose} variant="contained" color="secondary">
                CANCEL
            </Button>
            <Button className={classes.primaryButton} onClick={handleDelete} variant="contained" color="primary">
                DELETE
            </Button>
            </DialogActions>
        </Dialog>
    );
}