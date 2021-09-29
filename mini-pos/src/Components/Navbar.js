import React, { useState } from 'react';
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import MenuIcon from "@material-ui/icons/Menu";
import ReceiptIcon from "@material-ui/icons/Receipt";
import StoreIcon from "@material-ui/icons/Store";

import Billing from "../Pages/Billing";
import Product from "../Pages/Product";

// STYLE FOR NAVBAR
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex"
	},
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: 240,
			flexShrink: 0
		}
	},
	appBar: {
		backgroundColor: "#e572a0"
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: 240
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	}
}));

// NAVBAR - GLOBAL COMPONENT 
const Navbar = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [drawerOpen, setDrawerOpen] = useState(false); 

	const handleDrawerToggle = () => { // handle drawer menu (open / close)
		setDrawerOpen(!drawerOpen);
	};

	const drawer = (
		<div>
			<List> {/* list of drawer menu: billing list and product */}
				{["Billing", "Product"].map((text, index) => (
					<ListItem key={text.toLowerCase()} component={Link} to={"/" + text.toLowerCase()}> 
						<ListItemIcon>
							{index % 2 === 0 ? <ReceiptIcon /> : <StoreIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<div className={classes.root}> 
			<AppBar position="fixed" className={classes.appBar}> {/* header: menu icon and title*/}
				<Toolbar>
					<IconButton color="inherit" aria-label="open drawer"
						edge="start" onClick={handleDrawerToggle}
						className={classes.menuButton}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap> 
						Mini POS
					</Typography>
				</Toolbar>
			</AppBar>

			<BrowserRouter>
				<nav>
					<Hidden smUp implementation="css"> {/* If open=false, screens sm size and up are hidden for drawer menu.*/}
						<Drawer
							variant="temporary"
							anchor={theme.direction === "rtl" ? "right" : "left"}
							open={drawerOpen}
							onClose={handleDrawerToggle}
							classes={{ paper: classes.drawerPaper }}
							ModalProps={{ keepMounted: true }} >
							{drawer}
						</Drawer>
					</Hidden>
				</nav>

				<main className={classes.content}> {/* (router), if path is "/product" then will open Product page */}
					<div className={classes.toolbar} /> 
					<Switch> 
						<Route path="/product" component={Product} />
						<Route path="/billing" component={Billing} />
					</Switch>
				</main>
			</BrowserRouter>
		</div>
	);
}

export default Navbar;

