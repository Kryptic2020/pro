import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import classes from './styles.module.css';
import CompanyIcone from '../UI/Iconsx/CompanyIcone';
import Home from '../UI/Iconsx/Home';
import Dashboard from '../UI/Iconsx/Dashboard';
import Settings from '../UI/Iconsx/Settings';
import User from '../UI/Iconsx/User';
import Menu from '../UI/Iconsx/Menu';
import Close from '../UI/Iconsx/Close';
import Logout from '../UI/Iconsx/Logout';

import KeyboardLeftIcone from '../UI/Iconsx/KeyboardLeft';
import Button from 'react-bootstrap/Button';
import Sidebar from '../Sidebar/Sidebar';
import ButtonBookNow from '../UI/ButtonBookNow/ButtonBookNow';

class Navbar extends Component {
	state = {
		show: false,
	};

	showSideBarHandler = () => {
		this.setState((prevState) => {
			return {
				show: !prevState.show,
			};
		});
	};
	render() {
		const icons = (
			<div className={classes.icons}>
				<div className={classes.button}>
					<Link to='/book-now'>
						<ButtonBookNow
							width='70px'
							height='25px'
							fontSize='12px'
							text='Book Now'
							backgroundColor='#24CD98'
							color='#ffffff'
						/>
					</Link>
				</div>
				<Link to='/'>
					<Home width={24} />
				</Link>

				<Link to='/dashboard'>
					<Dashboard width={24} />
				</Link>

				<Link to='/settings'>
					<Settings width={22} />
				</Link>
				<Link to='/user-options'>
					<User width={22} />
				</Link>
				<a href='/api/logout'>
					<Logout width={24} />
				</a>
			</div>
		);
		return (
			<>
				<div className={classes.container}>
					<div
						onClick={this.props.history.goBack}
						className={classes.arrow}
					>
						<KeyboardLeftIcone
							width={18}
							fill={'white'}
						/>
					</div>

					<div className={classes.company}>
						<div
							className={classes.companyIcon}
						>
							<CompanyIcone
								width={25}
								fill={'white'}
							/>
						</div>

						<div
							className={classes.company_name}
						>
							Company
						</div>
					</div>

					<div className={classes.login_mobile}>
						{this.props.authenticated ? (
							<span
								onClick={
									this.showSideBarHandler
								}
							>
								{this.state.show ? (
									<Close width={40} />
								) : (
									<Menu width={30} />
								)}
							</span>
						) : (
							<div style={{ width: '65px' }}>
								<Link to='/loginx'>
									{window.location
										.pathname !==
									'/loginx' ? (
										<Button variant='outline-light '>
											Login
										</Button>
									) : null}
								</Link>
							</div>
						)}
					</div>

					{this.props.authenticated ? (
						icons
					) : (
						<div
							className={
								classes.login_desktop
							}
							style={{ width: '65px' }}
						>
							<Link to='/loginx'>
								{window.location
									.pathname !==
								'/loginx' ? (
									<Button variant='outline-light '>
										Login
									</Button>
								) : null}
							</Link>
						</div>
					)}
				</div>
				{this.state.show ? (
					<Sidebar
						onClick={this.showSideBarHandler}
					/>
				) : null}
			</>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		fullName: state.auth.fullName,
		authenticated: state.auth.authenticated,
	};
};

export default withRouter(
	connect(mapStateToProps, null)(Navbar)
);
