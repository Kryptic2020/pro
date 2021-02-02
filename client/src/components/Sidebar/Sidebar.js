import React from 'react';
import classes from './styles.module.css';
//import CompanyIcon from '../UI/Iconsx/CompanyIcone';
import User from '../UI/Iconsx/User';
import Settings from '../UI/Iconsx/Settings';
import Dashboard from '../UI/Iconsx/Dashboard';
import Logout from '../UI/Iconsx/Logout';
import Home from '../UI/Iconsx/Home';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
	return (
		<>
			<div className={classes.container}></div>
			<div className={classes.box}>
				<Link
					onClick={props.onClick}
					to='/'
					className={classes.home}
				>
					<div className={classes.home_icon}>
						<Home />
					</div>
					<div>HOME</div>
				</Link>
				<Link
					onClick={props.onClick}
					to='user-options'
					className={classes.user}
				>
					<div className={classes.user_icon}>
						<User />
					</div>
					<div>USER OPTIONS</div>
				</Link>
				<Link
					onClick={props.onClick}
					to='settings'
					className={classes.settings}
				>
					<div className={classes.settings_icon}>
						<Settings />
					</div>
					<div>SETTINGS</div>
				</Link>
				<Link
					onClick={props.onClick}
					to='dashboard'
					className={classes.dashboard}
				>
					<div className={classes.dashboard_icon}>
						<Dashboard />
					</div>
					<div>DASHBOARD</div>
				</Link>
				<a
					onClick={props.onClick}
					href='/api/logout'
					className={classes.logout}
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
