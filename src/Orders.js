import React, { useEffect, useState, Fragment } from 'react';
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

import lockr from "lockr";

function getItems() {
    const url = 'https://a3dfa65b.ngrok.io/orders/myOrders';
    let data = lockr.get('data');
    var request = new Request(url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers: new Headers({ "Content-Type": "application/json" }),
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
    root: {
        width: '100%',
        marginTop: theme.spacing(1),
        overflowX: 'auto',
    },
    clearTop: {
        marginTop: theme.spacing(2),
    }
}));

export default function Orders(props){
    const classes = useStyles();

    const [content, setContent] = useState('');

    useEffect(() => {
        getItems()
        .then(result => setContent(result.data));
    }, []);

    return (
        <Fragment>
            <AppBar />
            <Paper className={classes.clearTop}>
                {content ? 
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
                        <StyledTableCell component="th" scope="row">
                            {item.person}
                        </StyledTableCell>
                        <StyledTableCell align="right">{item.item[0].name}</StyledTableCell>
                        <StyledTableCell align="right">{item.amount}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>   
                :
                <ListItem>
                    <ListItemText primary="No orders have been made... So far"/>
                </ListItem>
                }
            </Paper>
        </Fragment>
    );   
}