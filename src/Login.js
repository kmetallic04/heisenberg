import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    TextField,
    Button,
} from '@material-ui/core';
import lockr from 'lockr';

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "darkorange",
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    headerContainer: {
        textAlign: "center",
        color: "#FFFFFF",
        marginBottom: theme.spacing(3),
    },
    textField: {
        display: "block",
        color:"#FFFFFF",
        margin: "auto",
        marginBottom: theme.spacing(3),
        width: 200,
    },
    button: {
        color: "#FFFFFF",
        borderColor: "#FFFFFF",
        width: 200,
        marginTop: theme.spacing(5),
    },
    errorMessage: {
        background: "red",
        color: "white",
        margin: theme.spacing(2),
        padding: theme.spacing(1),
        borderRadius: "2px",
        transition: "all 0.5s"
    },
}));

export default function Login(props){
    const classes = useStyles();

    const [vendor, setVendor] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(null);

    const handleClick = () => {
        setError(null)

        const url = 'http://localhost:4000/vendors/login';
        let data = {
            email: vendor,
            password: pass,
        }
        var request = new Request(url, {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers: new Headers({ "Content-Type": "application/json" }),
        });

        fetch(request)
        .then(res => res.json())
        .then(res => {
            switch (res.status) {
                case 200:
                    lockr.set('data', res.data);
                    props.history.push('/vendors');
                    break;
                case 400:
                    setError('Login Incorrect. Please try again...');
                    break;
                case 500:
                    setError('Something blew up. We\'re looking into it');
                    break;
                default:
                    setError('Something blew up. We\'re looking into it');
                    break;
            }
        })
        .catch(err => setError(err.message))
    }

    return (
        <div className={classes.root}>
            <div className={classes.headerContainer}>
                <Typography variant="h5" gutterBottom>
                    Africa's Talking Catering
                </Typography>
            </div>
            <div className={classes.formContainer}>
                <form noValidate autoComplete="off">
                    <TextField
                        label="Email"
                        className={classes.textField}
                        margin="normal"
                        onChange={(event) => {setVendor(event.target.value)}}
                    />
                    <TextField
                        label="Password"
                        className={classes.textField}
                        margin="normal"
                        type="password"
                        autoComplete="current-password"
                        onChange={(event) => {setPass(event.target.value)}}
                    />
                    <Button 
                        variant="outlined" 
                        className={classes.button}
                        onClick={handleClick}
                        >
                        SIGN IN
                    </Button>
                </form>
                {
                    error ? 
                    <div className={classes.errorMessage}>
                        {error}
                    </div> :
                    null
                }
            </div>
        </div>
    );
}