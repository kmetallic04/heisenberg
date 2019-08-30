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

import lockr from 'lockr';
import logOut from "../logout";

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
        const url = 'http://app:4000/items/delete';
        const token = lockr.get('data').token;
        const data = props.item;
        var request = new Request(url, {
            method: 'DELETE', 
            body: JSON.stringify(data), 
            headers: new Headers({ 
                "Content-Type": "application/json",
                "x-access-token": token 
            }),
        });
      
        return fetch(request)
        .then(res => res.json())
        .then(result => {
            if (result.status === 401)
                logOut(props.history);
            return Promise.resolve(result);
        })
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