import React, { useEffect, useState } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Paper,
    Table,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles"

import AppBar from "./Components/AppBar"
import logOut from "./logout";

import lockr from "lockr";

function getItems() {
    const url = 'http://localhost:4000/orders/myOrders';
    let data = lockr.get('data');
    var request = new Request(url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers: new Headers({ 
            "Content-Type": "application/json",
            "x-access-token": data.token 
        }),
    });

    return fetch(request)
    .then(res => res.json())
    .catch(err => { throw err })
}

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#FFBB00",
        color: "black",
    },
    body: {
        fontSize: 10,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

const useStyles = makeStyles(theme => ({
    clearTop: {
        marginTop: theme.spacing(2),
    }
}));

export default function Orders(props){
    const classes = useStyles();

    const [content, setContent] = useState('');

    useEffect(() => {
        if (!lockr.get('data'))
            logOut(props.history, "/");
    })

    useEffect(() => {
        getItems()
        .then(result => {
            if (result.status === 401)
                logOut(props.history, "/");
            setContent(result.data);
        })
        .catch(err => {throw err})
    }, []);

    console.log(content);

    return (
        <div style={{ margin: "8px" }}>
            <AppBar history={props.history}/>
            <Paper className={classes.clearTop}>
                {content.length ? 
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Dish</StyledTableCell>
                        <StyledTableCell align="right">Amount</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {content.map((item, index) => (
                        <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">{item.person}</StyledTableCell>
                        <StyledTableCell align="right">{item.name}</StyledTableCell>
                        <StyledTableCell align="right">{item.amount}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>   
                :
                <List>
                    <ListItem>
                        <ListItemText primary="No orders have been made... So far"/>
                    </ListItem>
                </List>
                }
            </Paper>
        </div>
    );   
}