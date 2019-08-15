import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Typography,
} from '@material-ui/core';

import RemoveCircle from '@material-ui/icons/RemoveCircle';

const delayTransform = 0.125;

const useStyles = makeStyles(theme => ({
    listItem: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        borderRadius: "0",
        transition: `all ${delayTransform}s`,
        transitionTimingFunction: "ease-out",
    },
}));

export default function ListItemCustom(props){
    const classes = useStyles();
    const ref = useRef(null);
    const {
        item,
        beginDisableItem,
        disableItem,
        showItem,
    } = props;

    async function onItemClick(){
        await beginDisableItem(item, "active");
    }

    async function afterSiblingsMove(event) {
        if (ref.current)
            ref.current.removeEventListener("transitionend", afterSiblingsMove, {once: true});
        if (event.propertyName === "opacity"){
            if (item.clickedOut) {
                await disableItem(item);
                setTimeout(async () => {
                    await showItem(item, "inactive");
                }, 100);
            }
        }
    }

    function getStyleObject(){
        let opacity = item.removing? 0 : 1,
            height = item.removing? "3.5em" : "4.5em";
        if (item.clickedOut){
            ref.current.addEventListener("transitionend", afterSiblingsMove, {once: true});
        }
        return {opacity, height};
    }

    return (
        <Paper
            item={item}
            style={getStyleObject()}
            className={classes.listItem}
            ref={ref}
        >
            <ListItem>
                <ListItemText
                primary={<Typography style={{ color: '#FF9100' }}>{item.name}</Typography>}
                secondary={<Typography style={{ color: '#7B8D9C' }}>{`Price: ${item.price}`}</Typography>}
                />
                <ListItemSecondaryAction>
                <IconButton onClick={onItemClick} edge="end" aria-label="Delete">
                    <RemoveCircle color="secondary"/>
                </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </Paper>
    );
}