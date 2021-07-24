import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useState } from 'react';
import PlaylistAddCheckSharpIcon from '@material-ui/icons/PlaylistAddCheckSharp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { DashboardOutlined, DashboardRounded } from '@material-ui/icons';
import { Card, ListItemIcon } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import { useHistory } from 'react-router';
import { useAuth } from '../context/authContext';
import SignedInLinks from './parts/SignedInLinks';
import SignedOutLinks from './parts/SignedOutLinks';
import { firestore } from '../firebase/config';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Layout = ({ children }, props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const history = useHistory();
  
  const { currentUser } = useAuth();
  console.log(currentUser);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
      {
          text: 'My Notes',
          icon: <DashboardRounded/>,
          path: '/'
      },
      {
          text: 'Make Note',
          icon: <AddCircleOutlineSharpIcon/>,
          path: '/MakeNote'
      }
  ]

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {menuItems.map(item => (
            <ListItem
                button
                key={item.text}
                onClick={() => history.push(item.path)}
            >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text}/>
            </ListItem>
        ))}
      </List>
      <Divider />
      <SignedInLinks />
      <SignedOutLinks />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Welcome,
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default Layout;
