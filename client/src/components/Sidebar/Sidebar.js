import React from 'react';
import classes from './styles.module.css';
//import CompanyIcon from '../UI/Iconsx/CompanyIcone';
import User from '../UI/Iconsx/User';
import Settings from '../UI/Iconsx/Settings';
import Dashboard from '../UI/Iconsx/Dashboard';
import Logout from '../UI/Iconsx/Logout';
import Home from '../UI/Iconsx/Home';
import { Link, withRouter } from 'react-router-dom';

const Sidebar = (props) => {
	return (
		<>
			<div className={classes.container}></div>
			<div className={classes.box}>
				<a className={classes.home} href='/'>
					<div className={classes.home_icon}>
						<Home />
					</div>
					<div>HOME</div>
				</a>
				<a
					className={classes.user}
					href='user-options'
				>
					<div className={classes.user_icon}>
						<User />
					</div>
					<div>USER OPTIONS</div>
				</a>
				<a
					className={classes.settings}
					href='settings'
				>
					<div className={classes.settings_icon}>
						<Settings />
					</div>
					<div>SETTINGS</div>
				</a>
				<a
					className={classes.dashboard}
					href='dashboard'
				>
					<div className={classes.dashboard_icon}>
						<Dashboard />
					</div>
					<div>DASHBOARD</div>
				</a>
				<a
					className={classes.logout}
					href='/api/logout'
				>
					<div className={classes.logout_icon}>
						<Logout />
					</div>
					<div>LOGOUT</div>
				</a>
			</div>
		</>
	);
};

export default Sidebar;
