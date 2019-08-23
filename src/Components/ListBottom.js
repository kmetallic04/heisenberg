import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Fab,
    Chip,
    List,
    Button,
} from '@material-ui/core';
import Restaurant from '@material-ui/icons/Restaurant';
import AddIcon from '@material-ui/icons/Add';

import CreateDialog from './CreateDialog';
import DeleteDialog from './DeleteDialog';
import EditDialog from './EditDialog';
import ListItemCustom from './ListItemCustom';
import { EventEmitter } from 'events';

const delayTransform = .125;

const useStyles = makeStyles(theme => ({
    listBottom:{
        transition: `transform ${delayTransform}s`,
        transitionTimingFunction: "ease-out",
    },
    menuCaption: {
        color: "black",
        backgroundColor: "#FFBB00",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        width: 250
    },
    createDialog:{
        backgroundColor: "#008F40",
    },
    icons: {
        marginLeft: theme.spacing(2)
    },
    title: {
        flex: 1,
        display:"flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textField: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    addIcon: {
        color: "white",
    },
    //For the inner elements of the text field
    resize: {
        fontSize: 50
    },
    //TODO: Figure this stuff out
    submitButtonContainer: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        display: "flex",
        justifyContent: "flex-end",
    },
    submitButton: {
        color: '#FFFFFF',
        backgroundColor: "#008F40",
    },
    listItem: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        borderRadius: "0",
    }
  }));


export default function ListBottom(props) {
    const classes = useStyles();
    const ref = useRef(null);

    const [createFormOpen, setCreateFormOpen] = useState(false);
    const [deleteFormOpen, setDeleteFormOpen] = useState(false);
    const [editFormOpen, setEditFormOpen] = useState(false);
    const [delta, setDelta] = useState(0);
    const [transformValue, setTransformValue] = useState(0);

    const [editItem, setEditItem] = useState("");
    const [deleteItem, setDeleteItem] = useState("");
    
    const commonEmitter = new EventEmitter();


    function handleCreateFormOpen() {
        setCreateFormOpen(true);
    }

    function handleCreateFormClose(){
        setCreateFormOpen(false);
    }

    function handleDeleteFormOpen(item){
        setDeleteItem(item)
        setDeleteFormOpen(true);
    }

    function handleDeleteFormClose(){
        setDeleteFormOpen(false);
    }

    function handleEditFormOpen(item){
        setEditItem(item);
        setEditFormOpen(true);
    }

    function handleEditFormClose(){
        setEditFormOpen(false);
    }

    function moveParent(delta = delta){
        setTransformValue(delta);
        ref.current.addEventListener("transitionend", (event) => {
            //We will rely on height because the transition property is set to all
            //in the child component
            if (event.propertyName === "opacity") {
                commonEmitter.emit("list_bottom_transition_done", ref.current);
            }
        }, {once: true});
    }

    function resetParentMovement(){
        setTimeout(() => {
            setTransformValue(0);
        }, 200);
    }

    function generate(items) {
        return (
            items.map((item, index) => 
                <ListItemCustom
                    key={index}
                    index={index}
                    item={item}
                    commonEmitter={commonEmitter}
                    handleEditFormOpen={handleEditFormOpen}
                    handleDeleteFormOpen={handleDeleteFormOpen}
                    delta={delta}
                    setDelta={setDelta}
                    moveParent={moveParent}
                    beginActivateItem={props.beginActivateItem}
                    activateItem={props.activateItem}
                    showItem={props.showItem}
                    resetParentMovement={resetParentMovement}
                />
            )
        );
    }

    return(
        <div
            className={classes.listBottom}
            style={{transform: `translate3d(0,${transformValue}px,0)`}}
            ref = {ref}
        >
            <div className={classes.title}>
                <Chip 
                    className = {classes.menuCaption} 
                    label="ALL ITEMS"
                    icon={<Restaurant style={{ color: 'black' }}/>} 
                />
                <div>
                    <Fab 
                    className={classes.createDialog} 
                    aria-label="Add" 
                    size="small"
                    onClick={handleCreateFormOpen}
                    >
                    <AddIcon className={classes.addIcon} />
                    </Fab>
                </div>
            </div>
            <List dense={true}>
                {generate(props.items)}
            </List>
            <CreateDialog 
                createFormOpen={createFormOpen}
                handleCreateFormClose={handleCreateFormClose}
                refresh={props.refresh}
                history={props.history}
            />
            <EditDialog 
                /* TODO: FIgure this out*/
                editFormOpen={editFormOpen}
                handleEditFormClose={handleEditFormClose}
                item={editItem}
                refresh={props.refresh}
                history={props.history}
            />
            <DeleteDialog 
                deleteFormOpen={deleteFormOpen}
                handleDeleteFormClose={handleDeleteFormClose}
                item={deleteItem}
                refresh={props.refresh}
                history={props.history}
            />
            <div className={classes.submitButtonContainer}>
            <Button variant="contained" className={classes.submitButton} onClick={props.handleSubmit}>
                PLACE ITEMS
            </Button>
            </div>
        </div>
    );
}