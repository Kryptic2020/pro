import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import classes from './Landing.module.css';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import WeekendIcon from '@material-ui/icons/Weekend';
import WorkIcon from '@material-ui/icons/Work';
import ContactsIcon from '@material-ui/icons/Contacts';
import TodayIcon from '@material-ui/icons/Today';
//import MailIcon from '@material-ui/icons/Mail';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { connect } from 'react-redux';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import HowToRegIcon from '@material-ui/icons/HowToReg';
//import Background from '../../assets/LogoB.png';
//import LogoDark from '../../assets/MagentaDarkLogo.jpg';
require('typeface-roboto');

class Landing extends Component {
	scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	componentDidMount() {
		this.scrollToTop();
	}

	userOptionsRender() {
		let show = '';
		if (this.props.auth.authenticated) {
			show = (
				<div>
					<div
						style={{
							textAlign: 'center',
							width: '100%',
							fontSize: '18px',
							color: 'yellow',
						}}
					>
						USER PANELA
					</div>
					<div
						className={classes.lines}
						style={{
							borderTop: '1px solid yellow',
						}}
					></div>
					<Link
						style={{ color: 'white' }}
						to={{
							pathname: '/profile',
							state: {
								_id: this.props.auth._id,
							},
						}}
					>
						<div
							style={{
								padding: '10px',
								fontSize: '18px',
								width: '100%',
								height: '50px',
							}}
						>
							<PermIdentityIcon
								style={{
									marginLeft: '45px',
									fontSize: '30px',
								}}
							/>
							<span
								style={{
									paddingLeft: '15px',
								}}
							>
								{' '}
								Profile
							</span>
						</div>
					</Link>
					<div
						className={classes.lines}
						style={{
							borderTop: '1px solid yellow',
						}}
					></div>

					<Link
						style={{ color: 'white' }}
						to={
							this.props.auth.authenticated
								? '/booking'
								: '/'
						}
					>
						<div
							style={{
								padding: '10px',
								fontSize: '18px',
								width: '100%',
								height: '50px',
							}}
						>
							<TodayIcon
								style={{
									marginLeft: '45px',
									fontSize: '30px',
								}}
							/>
							<span
								style={{
									paddingLeft: '15px',
								}}
							>
								{' '}
								Book Now
							</span>
						</div>
					</Link>

					<div
						className={classes.lines}
						style={{
							borderTop: '1px solid yellow',
						}}
					></div>

					<Link
						style={{ color: 'white' }}
						to={
							this.props.auth.authenticated
								? '/booking/mybooking'
								: '/'
						}
					>
						<div
							style={{
								padding: '10px',
								fontSize: '18px',
								width: '100%',
								height: '50px',
								color: 'white',
							}}
						>
							<DateRangeIcon
								style={{
									marginLeft: '45px',
									fontSize: '30px',
								}}
							/>
							<span
								style={{
									paddingLeft: '15px',
								}}
							>
								{' '}
								Booking History
							</span>
						</div>
					</Link>

					<div
						className={classes.lines}
						style={{
							borderTop: '1px solid yellow',
						}}
					></div>

					<Link
						style={{ color: 'white' }}
						to={
							this.props.auth.authenticated
								? '/waitinglist'
								: '/'
						}
					>
						<div
							style={{
								padding: '10px',
								fontSize: '18px',
								width: '100%',
								height: '50px',
							}}
						>
							<WeekendIcon
								style={{
									marginLeft: '45px',
									fontSize: '30px',
								}}
							/>
							<span
								style={{
									paddingLeft: '15px',
								}}
							>
								{' '}
								Waiting List
							</span>
						</div>
					</Link>
				</div>
			);
		}
		return (
			<div>
				<div>
					<div>{show}</div>
					<div
						className={classes.lines}
						style={{
							borderTop: '1px solid yellow',
						}}
					></div>

					<a
						href='https://instagram.com/prinail_aussie?igshid=e7iknqzerklx'
						style={{ color: 'white' }}
					>
						<div
							style={{
								padding: '10px',
								fontSize: '18px',
								width: '100%',
								height: '50px',
							}}
						>
							<InstagramIcon
								style={{
									fontSize: '30px',
									marginLeft: '45px',
								}}
							/>{' '}
							<span
								style={{
									paddingLeft: '15px',
								}}
							>
								Manicurist Instagram
							</span>
						</div>
					</a>

					<div
						className={classes.lines}
						style={{
							borderTop: '1px solid yellow',
						}}
					></div>

					<a
						href='https://www.instagram.com/thibarberbr_au'
						style={{ color: 'white' }}
					>
						<div
							style={{
								padding: '10px',
								fontSize: '18px',
								width: '100%',
								height: '50px',
							}}
						>
							<InstagramIcon
								style={{
									fontSize: '30px',
									marginLeft: '45px',
								}}
							/>{' '}
							<span
								style={{
									paddingLeft: '15px',
								}}
							>
								Hairdresser Instagram
							</span>
						</div>
					</a>

					<div
						className={classes.lines}
						style={{
							borderTop: '1px solid yellow',
						}}
					></div>

					<a
						href='https://www.facebook.com/pri.helena.96'
						style={{ color: 'white' }}
					>
						<div
							style={{
								padding: '10px',
								fontSize: '18px',
								width: '100%',
								height: '50px',
								color: 'white',
							}}
						>
							<FacebookIcon
								style={{
									fontSize: '30px',
									marginLeft: '45px',
								}}
							/>{' '}
							<span
								style={{
									paddingLeft: '15px',
								}}
							>
								Manicurist Facebook
							</span>
						</div>
					</a>

					<div
						className={classes.lines}
						style={{
							borderTop: '1px solid yellow',
						}}
					></div>

					<a
						href='https://www.facebook.com/ThiBarberBRAU'
						style={{ color: 'white' }}
					>
						<div
							style={{
								padding: '10px',
								fontSize: '18px',
								width: '100%',
								height: '50px',
								color: 'white',
							}}
						>
							<FacebookIcon
								style={{
									fontSize: '30px',
									marginLeft: '45px',
								}}
							/>{' '}
							<span
								style={{
									paddingLeft: '15px',
								}}
							>
								Hairdresser Facebook
							</span>{' '}
						</div>
					</a>

					<div
						className={classes.lines}
						style={{
							borderTop: '1px solid yellow',
						}}
					></div>

					<Link
						style={{ color: 'white' }}
						to={'/location'}
					>
						<div
							style={{
								padding: '10px',
								fontSize: '18px',
								width: '100%',
								height: '50px',
								color: 'white',
							}}
						>
							<LocationOnIcon
								style={{
									fontSize: '30px',
									marginLeft: '45px',
								}}
							/>{' '}
							<span
								style={{
									paddingLeft: '15px',
								}}
							>
								Our Location
							</span>
						</div>
					</Link>

					<div
						className={classes.lines}
						style={{
							width: '100%',
							borderTop: '1px solid yellow',
						}}
					></div>
					<div
						style={{
							width: '100%',
							height: '60px',
						}}
					></div>
				</div>
			</div>
		);
	}

	adminOptionsRender() {
		return (
			<div>
				<div>
					<div
						style={{
							textAlign: 'center',
							width: '100%',
							fontSize: '18px',
							color: 'yellow',
						}}
					>
						ADMIN PANEL
					</div>
					{/*<div style={{ padding: '10px', fontSize: '18px', width: '100%', height: '50px', borderTop: '1px solid yellow' }}>
						<Link style={{ color: 'white' }} to={this.props.auth.authenticated ? '/surveys' : '/'}><MailIcon style={{ marginLeft: '55px', fontSize: '30px' }} /><span style={{ paddingLeft:'15px' }}> Survey</span></Link>
					</div>*/}

					<Link
						style={{ color: 'white' }}
						to={
							this.props.auth.authenticated
								? '/specialtyandservices'
								: '/'
						}
					>
						<div
							style={{
								padding: '10px',
								fontSize: '18px',
								width: '100%',
								height: '50px',
								borderTop:
									'1px solid yellow',
							}}
						>
							<WorkIcon
								style={{
									marginLeft: '45px',
									fontSize: '30px',
								}}
							/>
							<span
								style={{
									paddingLeft: '15px',
								}}
							>
								{' '}
								Specialties
							</span>
						</div>
					</Link>

					<Link
						style={{ color: 'white' }}
						to={
							this.props.auth.authenticated
								? '/staffassignment'
								: '/'
						}
					>
						<div
							style={{
								padding: '10px',
								fontSize: '18px',
								width: '100%',
								height: '50px',
								borderTop:
									'1px solid yellow',
							}}
						>
							<HowToRegIcon
								style={{
									marginLeft: '45px',
									fontSize: '30px',
								}}
							/>
							<span
								style={{
									paddingLeft: '15px',
								}}
							>
								{' '}
								Staff Assignment
							</span>
						</div>
					</Link>

					<Link
						style={{ color: 'white' }}
						to={
							this.props.auth.authenticated
								? '/timetables'
								: '/'
						}
					>
						<div
							style={{
								padding: '10px',
								fontSize: '18px',
								width: '100%',
								height: '50px',
								borderTop:
									'1px solid yellow',
							}}
						>
							<AccessTimeIcon
								style={{
									marginLeft: '45px',
									fontSize: '30px',
								}}
							/>
							<span
								style={{
									paddingLeft: '15px',
								}}
							>
								{' '}
								Time Tables
							</span>
						</div>
					</Link>

					<Link
						style={{ color: 'white' }}
						to={
							this.props.auth.authenticated
								? '/calendar/builder'
								: '/'
						}
					>
						<div
							style={{
								padding: '10px',
								fontSize: '18px',
								width: '100%',
								height: '50px',
								borderTop:
									'1px solid yellow',
							}}
						>
							<CalendarTodayIcon
								style={{
									marginLeft: '45px',
									fontSize: '30px',
								}}
							/>
							<span
								style={{
									paddingLeft: '15px',
								}}
							>
								{' '}
								Calendar Builder
							</span>{' '}
						</div>
					</Link>

					<Link
						style={{ color: 'white' }}
						to={
							this.props.auth.authenticated
								? '/calendar'
								: '/'
						}
					>
						<div
							style={{
								padding: '10px',
								fontSize: '18px',
								width: '100%',
								height: '50px',
								borderTop:
									'1px solid yellow',
								color: 'white',
							}}
						>
							<DateRangeIcon
								style={{
									marginLeft: '45px',
									fontSize: '30px',
								}}
							/>
							<span
								style={{
									paddingLeft: '15px',
								}}
							>
								{' '}
								Calendar
							</span>
						</div>
					</Link>

					<Link
						style={{ color: 'white' }}
						to={
							this.props.auth.authenticated
								? '/contacts'
								: '/'
						}
					>
						<div
							style={{
								padding: '10px',
								fontSize: '18px',
								width: '100%',
								height: '50px',
								borderTop:
									'1px solid yellow',
								color: 'white',
							}}
						>
							<ContactsIcon
								style={{
									marginLeft: '45px',
									fontSize: '30px',
								}}
							/>{' '}
							<span
								style={{
									paddingLeft: '15px',
								}}
							>
								Contacts
							</span>
						</div>
					</Link>

					<div
						style={{
							padding: '10px',
							fontSize: '18px',
							width: '100%',
							height: '50px',
							borderTop: '1px solid yellow',
							color: 'white',
						}}
					></div>
				</div>
				<div
					style={{
						width: '100%',
						height: '10px',
					}}
				></div>
			</div>
		);
	}

	render() {
		const BookNowLogin = (
			<Link to={'/loginx'}>
				<div>
					<Button
						variant='warning'
						style={{
							height: '50px',
							width: '100%',
						}}
					>
						<span
							style={{
								fontSize: '18px',
								fontWeight: 'bold',
								color: 'white',
							}}
						>
							Book Now
						</span>
					</Button>
				</div>
			</Link>
		);
		const BookNowBooking = (
			<Link to={'/loginx'}>
				<div>
					<Button
						style={{
							border: '1px solid #FFFF1C',
							backgroundColor: '#FFFF1C',
							height: '50px',
							width: '100%',
						}}
					>
						<span
							style={{
								fontSize: '18px',
								color: this.props.color,
							}}
						>
							Book Now
						</span>
					</Button>
				</div>
			</Link>
		);

		/*const sectionStyle = {
			//minWidth: '100vw',
			//minHeight: '100vh',
			//backgroundColor: '#23272B', //"#01579b",
			margin: 'auto',
			backgroundRepeat: 'no-repeat',
			width: '255px',
			height: '105px',
			//backgroundPosition:'center',
			marginTop: '-20px',
			//opacity: "0.7",
			resizeMode: 'stretch',
			//overflow: 'hidden',
			border: 'grey 3px solid',
			borderRadius: '5px',
			//border:'2px solid white',
			//backgroundImage: `url(${LogoDark})`
			backgroundImage: `url(${Background})`,
		};*/
		//};
		return (
			<div style={{}}>
				<div
					className='container'
					style={{
						marginTop: '77px',
						color: 'white',
						minWidth: '320px',
						maxWidth: '350px',
					}}
				>
					<div>
						<div
							style={{
								width: '100%',
								height: '20px',
							}}
						></div>
						{/*<div className={classes.logoAnimation} style={sectionStyle} />*/}
						<div className='center'>
							{/*
								<img
									className={
										classes.logoAnimation
									}
									src={Background}
									style={{
										width: '150px',
										height: '150px',
									}}
									alt='fireSpot'
								/>
							*/}
						</div>
						<div
							style={{
								width: '100%',
								height: '30px',
							}}
						></div>
						{!this.props.auth.authenticated
							? BookNowLogin
							: BookNowBooking}
					</div>
					<div
						style={{
							width: '100%',
							height: '40px',
						}}
					></div>
					<div>
						{/*this.props.auth.isAdmin
							? this.adminOptionsRender()
							: null*/}
					</div>
					<div>
						{/*this.userOptionsRender()*/}
					</div>
					<div
						style={{
							width: '100%',
							height: '100px',
						}}
					></div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		fullName: state.auth.fullName,
		color: state.auth.theme,
	};
};

export default withRouter(
	connect(mapStateToProps, null)(Landing)
);
