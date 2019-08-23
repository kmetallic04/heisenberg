import React, { Fragment, useEffect } from "react";
import {
    List,
    ListItem,
    ListItemText,
    Divider,
    Paper,
    Typography,
    Chip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import lockr from "lockr";

import AppBar from "./Components/AppBar";
import logOut from "./logout";

const useStyles = makeStyles(theme => ({
    container: {
        margin: "8px"
    },
    clearTop: {
        marginTop: theme.spacing(2),
    },
    label: {
        color: "#FF9100",
    },
    info: {
        fontSize: "0.85em",
        color: "#7B8D9C",
    },
    instruction: {
        display: "flex",
        backgroundColor: "#FFBB00",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    }
}));

export default function Account(props){
    const data = lockr.get('data'),
          classes = useStyles();

    useEffect(() => {
        if (!lockr.get('data'))
            logOut(props.history, "/");
    });

    return (
        <div className={classes.container}>
            <AppBar history={props.history}/>
            <Paper className={classes.clearTop}>
                <List>
                    <ListItem>
                        <ListItemText
                        primary={
                            <Fragment>
                                <label className={classes.label}>Account Name:</label>
                                <Typography className={classes.info}>{data.name}</Typography>
                            </Fragment>
                        }
                        />  
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemText
                        primary={
                            <Fragment>
                                <label className={classes.label}>Contact Email:</label>
                                <Typography className={classes.info}>{data.email}</Typography>
                            </Fragment>
                        }
                        />  
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemText
                        primary={
                            <Fragment>
                                <label className={classes.label}>Contact Phone:</label>
                                <Typography className={classes.info}>{data.phone}</Typography>
                            </Fragment>
                        }
                        />  
                    </ListItem>
                </List>
            </Paper>
            <Chip
            className={classes.instruction}
            label={
                <Typography style={{ fontSize: "0.75em" }}>
                    If you want any of your details updated, please contact Africa's Talking
                </Typography>
            }
            />
        </div>
    );
}