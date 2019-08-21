import React, { useState } from 'react';
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
import lockr from 'lockr';

const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    //For the inner elements of the text field
    resize: {
        fontSize: 50
    },
    //TODO: Figure this stuff out
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

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleCreate = () =>{
        const url = 'https://a3dfa65b.ngrok.io/items/create';
        let data = lockr.get('data');
        data.name = name;
        data.price = price;

        setName('');
        setPrice('');

        var request = new Request(url, {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers: new Headers({ "Content-Type": "application/json" }),
        });
      
        return fetch(request)
        .then(res => res.json())
        .then(props.refresh)
        .then(props.handleCreateFormClose)
        .catch(err => { throw err })
    }

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
                value={name}
                onChange={(event)=>setName(event.target.value)}
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
                value={price}
                onChange={(event)=>setPrice(event.target.value)}
                fullWidth={true}
                InputProps={{
                    startAdornment: <InputAdornment position="start">KSh</InputAdornment>,
                }}
            />
            </DialogContent>
            <DialogActions>
            <Button className={classes.primaryButton} onClick={handleCreate} variant="contained">
                ADD
            </Button>
            <Button className={classes.secondaryButton} onClick={props.handleCreateFormClose} variant="contained">
                CANCEL
            </Button>
            </DialogActions>
        </Dialog>
    );
}