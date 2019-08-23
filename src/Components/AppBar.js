import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Drawer from './Drawer';
import logOut from "../logout";
import lockr from 'lockr';

const useStyles = makeStyles(theme => ({
    mainAppBar: {
      backgroundColor: "#0B273B",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    myAccountLink: {
        textDecoration: "none",
        color: "#FF9100",
    }
  }));

export default function(props) {
    const classes = useStyles();

    const [drawerOpen, toggleDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function logMeOut() {
      logOut(props.history, "/");
      lockr.flush();
    }

    return (
        <AppBar className={classes.mainAppBar} position="static">
        <Toolbar className={classes.menuButton}>
          <IconButton 
          edge="start" 
          color="inherit" 
          aria-label="Menu"
          onClick={()=>toggleDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            AT Lunch App
          </Typography>
            <div>
              <IconButton
                aria-label="Account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem>
                  <Link className={classes.myAccountLink} to="/account">My Account</Link>
                </MenuItem>
                <MenuItem onClick={logMeOut}>Log Out</MenuItem>
              </Menu>
            </div>
        </Toolbar>
        <Drawer 
        drawerOpen={drawerOpen}
        toggleDrawerOpen={toggleDrawerOpen}        
        />
      </AppBar>
    );
}