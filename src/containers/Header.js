import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import { Link } from 'react-router-dom';

//images
import check from '../images/check.png';

import './index.css';

//icon for sideBar
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import Dashboard from './Dashboard';
import Contacts from './contacts';
import Inbox from './inbox';
import Report from './report';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        backgroundColor: "white",
        height: "60px",
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        display: "flex",
        justifyContent: "center"
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
}));

function Header(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const listItems = [
        {
            title: 'Dashboard',
            icon: "fas fa-home"
        },
        {
            title: 'Inbox',
            icon: "far fa-envelope"
        },
        {
            title: 'Report',
            icon: "fas fa-chart-line",
        },
        {
            title: 'Contacts',
            icon: "fas fa-users"
        }
    ]

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const renderPage = () => {
        switch (props.page) {
            case "Dashboard":
                return <Dashboard />
            case "Inbox":
                return <Inbox />
            case "Report":
                return <Report />
            case "Contacts":
                return <Contacts />
            default:
                return <Dashboard />
        }
    }

    const drawer = (
        <div className="drawermain">
            <div className="sideBarMain">
                <img width="30px" src={check} alt="logo" />
                <Typography className="sideBarMainText">
                    Sales Reach
                </Typography>
            </div>
            <List className="List">
                {
                    listItems.map(item => (
                        <Link key={item.title} className="link" to={`/${item.title}`}>
                            <ListItem button className={props.page === item.title ? "activePage" : "sideBarItems"}>
                                <i className={`${item.icon}`} style={{ marginRight: "16px" }}></i>
                                <ListItemText primary={item.title} />
                            </ListItem>
                        </Link>
                    ))
                }
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className="root">
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon className="MenuIcon" />
                    </IconButton>
                    <SearchIcon className="searchIcon" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="search"
                    />
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
                            paper: "drawerPaper",
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
            <main className="content">
                <div className={classes.toolbar} />
                {renderPage()}
            </main>
        </div>
    );
}

Header.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Header;
