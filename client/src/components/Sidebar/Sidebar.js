import React from 'react';
import classes from './styles.module.css';
//import CompanyIcon from '../UI/Iconsx/CompanyIcone';
import User from '../UI/Iconsx/User';
import Settings from '../UI/Iconsx/Settings';
import Dashboard from '../UI/Iconsx/Dashboard';
import Logout from '../UI/Iconsx/Logout';
import Home from '../UI/Iconsx/Home';
import { Link } from 'react-router-dom';
import ButtonBookNow from '../UI/ButtonBookNow/ButtonBookNow';

const Sidebar = (props) => {
	return (
		<div>
			<div className={classes.container}></div>

			<div className={classes.box}>
				<div className={classes.button}>
					<Link to='/book-now'>
						{' '}
						<ButtonBookNow
							onClick={props.onClick}
							text='Book Now'
							backgroundColor='#24CD98'
							color='#ffffff'
						/>
					</Link>
				</div>
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
				{props.isAdmin ? (
					<Link
						onClick={props.onClick}
						to='settings'
						className={classes.settings}
					>
						<div
							className={
								classes.settings_icon
							}
						>
							<Settings />
						</div>
						<div>SETTINGS</div>
					</Link>
				) : null}
				{props.isAdmin ? (
					<Link
						onClick={props.onClick}
						to='dashboard'
						className={classes.dashboard}
					>
						<div
							className={
								classes.dashboard_icon
							}
						>
							<Dashboard />
						</div>
						<div>DASHBOARD</div>
					</Link>
				) : null}
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
		</div>
	);
};

export default Sidebar;
