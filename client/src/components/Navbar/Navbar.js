import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './styles.module.css';
import CompanyIcone from '../UI/Iconsx/CompanyIcone';
import Home from '../UI/Iconsx/Home';
import Dashboard from '../UI/Iconsx/Dashboard';
import Settings from '../UI/Iconsx/Settings';
import User from '../UI/Iconsx/User';
import KeyboardLeftIcone from '../UI/Iconsx/KeyboardLeft';
import Button from 'react-bootstrap/Button';

class Navbar extends Component {
	render() {
		return (
			<div className={classes.container}>
				<div className={classes.arrow}>
					<KeyboardLeftIcone
						width={18}
						fill={'white'}
					/>
				</div>

				<div className={classes.company}>
					<div className={classes.companyIcon}>
						<CompanyIcone
							width={25}
							fill={'white'}
						/>
					</div>

					<div className={classes.company_name}>
						Company
					</div>
				</div>

				<div className={classes.login}>
					{this.props.auth.authenticated ? (
						<Button
							style={{ width: '80px' }}
							variant='outline-light'
							href='/api/logout'
						>
							Logout
						</Button>
					) : (
						<div style={{ width: '65px' }}>
							<Link to='/loginx'>
								<Button variant='outline-light '>
									Login
								</Button>
							</Link>
						</div>
					)}
				</div>

				<div className={classes.icons}>
					<a href='/'>
						<Home width={24} />
					</a>

					<a href='/dashboard'>
						<Dashboard width={24} />
					</a>

					<a href='/settings'>
						<Settings width={22} />
					</a>
					<a href='/user'>
						<User width={22} />
					</a>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		fullName: state.auth.fullName,
	};
};

export default withRouter(
	connect(mapStateToProps, null)(Navbar)
);
