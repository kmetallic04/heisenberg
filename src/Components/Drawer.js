import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Drawer,
} from '@material-ui/core';

import Fastfood from "@material-ui/icons/Fastfood"
import ListAlt from "@material-ui/icons/ListAlt"

const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: "none",
        color: '#FF9100',
        marginRight: "10px"
    },
}))

export default function TemporaryDrawer(props) {
    const classes = useStyles();

    return (
        <Drawer open={props.drawerOpen} onClose={()=>props.toggleDrawerOpen(false)}>
            <List>
                <ListItem>
                    <ListItemText 
                    primary={
                    <Link to='/vendors' 
                    className={classes.link}
                    onClick={()=>props.toggleDrawerOpen(false)}>
                    My Items
                    </Link>
                    }
                    />
                    <ListItemIcon>
                        <ListAlt fontSize="small"/>
                    </ListItemIcon>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText 
                    primary={
                    <Link to='/orders'
                    className={classes.link} 
                    onClick={()=>props.toggleDrawerOpen(false)}>
                    My Orders
                    </Link>
                    }
                    />
                    <ListItemIcon>
                        <Fastfood fontSize="small"/>
                    </ListItemIcon>
                </ListItem>
                <Divider/>
            </List>
        </Drawer>
    );
}