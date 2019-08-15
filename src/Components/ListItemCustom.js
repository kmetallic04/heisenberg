import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Typography,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

const delayTransform = 0.125;

const useStyles = makeStyles(theme => ({
    listItem: {
        color: "",
        backgroundColor:"#0B273B",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        borderRadius: "0",
        transitionTimingFunction: "ease-out",
    },
}));

export default function ListItemCustom(props){
    const classes = useStyles();
    const [transitionEnable, setTransitionEnable] = useState(true);
    const ref = useRef(null);
    const {
        item,
        commonEmitter,
        handleEditFormOpen,
        handleDeleteFormOpen,
        delta,
        setDelta,
        moveParent,
        beginActivateItem,
        activateItem,
        showItem,
        resetParentMovement,
    } = props;
    
    commonEmitter.once("list_bottom_transition_done", (event) => {
        if (item.clicked) {
            setTransitionEnable(false);
            activateItem(item);
            setTimeout(() => {
                showItem(item, "active");
            }, 100);
        }
        setTimeout(() => {
            setTransitionEnable(true);
            resetParentMovement();
        }, 150);
    });

    function onItemClick(){
        const delta = (ref.current.clientHeight);
        setDelta(delta * 0.125);
        beginActivateItem(item, "inactive");
    }

    function afterSiblingsMove(event) {
        if (ref.current)
            ref.current.removeEventListener("transitionend", afterSiblingsMove, {once: true});
        if (event.propertyName === "opacity"){
            moveParent(delta);
        }
    }

    function getStyleObject(){
        let opacity = item.removing? (item.clickedOut? 1 : 0) : 1,
            height = item.removing? (item.clickedOut? "4em" : 0) : "4em",
            transition = transitionEnable? `all ${delayTransform}s`: '';
        if (item.clicked){
            ref.current.addEventListener("transitionend", afterSiblingsMove, {once: true});
        }
        return {opacity, height, transition};
    }

    return (
        <Paper
            item={item}
            style={getStyleObject()}
            className={classes.listItem}
            ref={ref}
        >
            <ListItem
                onClick={onItemClick}
            >
                <ListItemText
                primary={<Typography style={{ color: '#F7FCFF' }}>{item.name}</Typography>}
                secondary={<Typography style={{ color: '#7B8D9C' }}>{`Price: ${item.price}`}</Typography>}
                />
                <ListItemSecondaryAction>
                <IconButton edge="end" onClick={handleEditFormOpen} aria-label="Edit">
                    <Edit fontSize="small"/>
                </IconButton>
                <IconButton edge="end" onClick={handleDeleteFormOpen} aria-label="Delete">
                    <DeleteIcon className={classes.icons} fontSize="small"/>
                </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </Paper>
    );
}