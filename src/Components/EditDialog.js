import React, { useState, useEffect } from 'react';
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

    const [name, setName] = useState(props.item.name);
    const [price, setPrice] = useState(props.item.price);
    const [objId, setObjId] = useState(null)
    const [nameEdited, setNameEdited] = useState(false);
    const [priceEdited, setPriceEdited] = useState(false);

    useEffect(() => {
        if (objId !== props.item._id) {
            setObjId(props.item._id);
            setNameEdited(false);
            setName(props.item.name);
            setPriceEdited(false);
            setPrice(props.item.price);
        }
    });

    function editItem(item) {
        const url = 'https://a3dfa65b.ngrok.io/items/update/edit';
        let data = item;
        data.name = name || props.item.name;
        data.price = price || props.item.price;
        var request = new Request(url, {
            method: 'PUT', 
            body: JSON.stringify(data), 
            headers: new Headers({ "Content-Type": "application/json" }),
        });
    
        return fetch(request)
        .then(res => res.json())
        .then(props.refresh)
        .then(props.handleEditFormClose)
        .catch(err => { throw err })
    }

    const handleEditFormClose = (item) => {
        setNameEdited(false);
        setPriceEdited(false);
        editItem(item)
    }

    return (
        <Dialog 
            open={props.editFormOpen} 
            onClose={props.handleEditFormClose}
            TransitionComponent={Zoom} 
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">MODIFY ITEM</DialogTitle>
            <DialogContent>
            <TextField
                id="create-input-item"
                className={classes.textField}
                label="Item"
                value={nameEdited? name : props.item.name}
                onChange={(event) => {
                    setName(event.target.value);
                    setNameEdited(true);
                }}
                fullWidth={true}
                margin="normal"
                variant="outlined"
            />
            <TextField
                id="create-input-price"
                className={classes.textField}
                variant="outlined"
                label="Price"
                value={priceEdited? price : props.item.price}
                onChange={(event) => {
                    setPrice(event.target.value);
                    setPriceEdited(true);
                }}
                fullWidth={true}
                InputProps={{
                    startAdornment: <InputAdornment position="start">KSh</InputAdornment>,
                }}
            />
            </DialogContent>
            <DialogActions>
            <Button className={classes.primaryButton} onClick={() => handleEditFormClose(props.item)} variant="contained" color="primary">
                EDIT
            </Button>
            <Button className={classes.secondaryButton} onClick={props.handleEditFormClose} variant="contained" color="secondary">
                CANCEL
            </Button>
            </DialogActions>
        </Dialog>
    );
}