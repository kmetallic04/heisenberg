import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Chip,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core';
import RestaurantMenu from '@material-ui/icons/RestaurantMenu';
import ListComponent from './ListComponent';

const useStyles = makeStyles(theme => ({
    menuCaption: {
        color: "black",
        backgroundColor: "#FFBB00",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        display: "flex",
    },
    icons: {
        marginLeft: theme.spacing(2)
    },
    listItem: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
  }));

export default function ListTop(props) {
    const classes = useStyles();

    function generate(items) {
        return (
            items.map((item, index) => 
            <ListComponent
                key={index}
                item={item}
                disableItem={props.disableItem}
                beginDisableItem={props.beginDisableItem}
                showItem={props.showItem}
            />
            )
        );
    }
      
    return(
        <div className={classes.grow}>
            <Chip 
            className = {classes.menuCaption} 
            label="AVAILABLE ITEMS"
            color="primary" 
            icon={<RestaurantMenu />} 
            />
            <List dense={true}>
            {
                    props.items.length > 0 ?
                    generate(props.items):
                    <Paper
                        className={classes.listItem}
                    >
                        <ListItem>
                            <ListItemText
                            primary={`NO ITEMS ADDED...`}
                            secondary={`Please tap or click on an item to avail it on the menu...`}
                            />
                        </ListItem>
                    </Paper>
                }
            </List>
        </div>
    );
}