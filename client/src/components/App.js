import React, { Component } from 'react';
import {
	BrowserRouter,
	Route,
	Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import VerifyEmail from '../container/Pages/VerifyEmail/VerifyEmail';
import CreateTimeTables from '../container/Pages/TimeTables';
import Booking from '../container/Pages/Booking';
import BookingAdm from '../container/Pages/BookingAdm';
import MyBooking from '../container/Pages/MyBooking';
import Contacts from '../container/Pages/Contacts';
import Calendar from '../container/Pages/Calendar';
import WaitingList from '../container/Pages/WaitingList';
import SpecialtyAndServices from '../container/Pages/SpecialtyAndServices';
import Assign_staff from '../container/Pages/Assign_staff/Assign_staff';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import FacebookEmailAdd from '../container/Auth/FacebookEmailAdd';
import Loginx from '../container/Pages/Login/Loginx';
import PersonalInfoPage from '../container/Pages/PersonalInfo/PersonalInfo';
import ForgotPass from '../container/Pages/ForgotPass/ForgotPass';
import ResetPass from '../container/Pages/ResetPass/ResetPass';
import Settings from '../container/Pages/Settings/Settings';
import Specialty from '../container/Pages/Specialty/Specialty';
import Services from '../container/Pages/Services/Services';
import TimeTables from '../container/Pages/TimeTablesX/TimeTables';
import CalendarManager from '../container/Pages/CalendarManager/CalendarManager';
import UserOptions from '../container/Pages/UserOptions/UserOptions';
import Dashboard from '../container/Pages/Dashboard/Dashboard';
import CreateSlot from '../container/Pages/CreateSlot/CreateSlot';
import OverrideSlot from '../container/Pages/OverrideSlot/OverrideSlot';
import DeleteSlot from '../container/Pages/DeleteSlot/DeleteSlot';
import SlotHistory from '../container/Pages/SlotHistory/SlotHistory';
import ProfileManager from '../container/Pages/ProfileManager/ProfileManager';
import Profile from '../container/Pages/Profile/Profile';
import MyBookings from '../container/Pages/MyBookings/MyBookings';
import WaitingListReport from '../container/Pages/WaitingListReport/WaitingListReport';
import Sales from '../container/Pages/Sales/Sales';
import SalesReport from '../container/Pages/SalesReport/SalesReport';
import MySlots from '../container/Pages/MySlots/MySlots';
import BookNow from '../container/Pages/BookNow/BookNow';
import Homepage from '../container/Pages/Home/Home';
import Alert from 'react-bootstrap/Alert';

class App extends Component {
	state = {
		msn: '',
	};
	componentDidMount() {
		this.props.fetchUser();
		this.props.fetchAllUsers();
	}
	hideMsn = () => {
		this.setState({ ...this.state, msn: '' });
	};

	render() {
		const sectionStyle = {
			minHeight: '100vh',

			fontFamily: 'Roboto, sans-serif',
			backgroundColor: this.props.authenticated
				? '#EAE8E8'
				: '#EAE8E8', //'#23272B',//'#032641', //'#23272B', //"#01579b",
		};

		return (
			<div>
				<BrowserRouter>
					<Navbar />
					<div className='center'>
						{this.state.msn ? (
							<Alert
								variant='warning '
								id='msn'
								onClick={this.hideMsn}
								style={{
									marginBottom: '20px',
									fontSize: '18px',
								}}
							>
								<Alert.Heading>
									{this.state.msn}
								</Alert.Heading>
							</Alert>
						) : null}
					</div>
					<div style={sectionStyle}>
						{this.props.email &&
						!this.props.emailVerified ? (
							<Redirect to='/verify-email' />
						) : null}

						{!this.props.email &&
						this.props.authenticated ? (
							<Redirect to='/auth/register/facebook/email' />
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/auth/register/facebook/email'
								component={FacebookEmailAdd}
							/>
						) : null}

						{!this.props.phone &&
						this.props.authenticated ? (
							<Redirect to='/personal-info' />
						) : null}

						<Route
							exact
							path='/personal-info'
							component={PersonalInfoPage}
						/>

						<Route
							exact
							path='/loginx'
							component={Loginx}
						/>

						<Route
							exact
							path='/forgot-pass'
							component={ForgotPass}
						/>
						<Route
							exact
							path='/reset-pass'
							component={ResetPass}
						/>
						{!this.props.emailVerified ? (
							<Route
								exact
								path='/verify-email'
								component={VerifyEmail}
							/>
						) : null}

						<Route
							path='/settings'
							component={Settings}
						/>

						<Route
							path='/specialty'
							component={Specialty}
						/>

						{this.props.authenticated ? (
							<Route
								exact
								path='/calendar-manager'
								component={CalendarManager}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/time-tables'
								component={TimeTables}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/user-options'
								component={UserOptions}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/booking'
								component={Booking}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/bookingAdm'
								component={BookingAdm}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/calendar'
								component={Calendar}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/waitinglist'
								component={WaitingList}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/booking/mybooking'
								component={MyBooking}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/contacts'
								component={Contacts}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/specialtyandservices'
								component={
									SpecialtyAndServices
								}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/assign-staff'
								component={Assign_staff}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/service-settings'
								component={Services}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/dashboard'
								component={Dashboard}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/timetables/create'
								component={CreateTimeTables}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/slots-create'
								component={CreateSlot}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/slots-override'
								component={OverrideSlot}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/slots-delete'
								component={DeleteSlot}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/slot-history'
								component={SlotHistory}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/profile-manager'
								component={ProfileManager}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/profile'
								component={Profile}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/my-bookings'
								component={MyBookings}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/waiting-list-report'
								component={
									WaitingListReport
								}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/sales'
								component={Sales}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/my-slots'
								component={MySlots}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/sales-report'
								component={SalesReport}
							/>
						) : null}

						{this.props.authenticated ? (
							<Route
								exact
								path='/book-now'
								component={BookNow}
							/>
						) : null}

						<Route
							exact
							path='/'
							component={Homepage}
						/>
					</div>
					{window.location.pathname !==
					'/loginx' ? (
						<Footer />
					) : null}
				</BrowserRouter>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		email: state.auth.email,
		emailVerified: state.auth.emailVerified,
		authenticated: state.auth.authenticated,
		theme: state.auth.theme,
		phone: state.auth.phone,
	};
};

export default connect(mapStateToProps, actions)(App);

/*{this.state.msn ? (
					<div
						className={classes.msn}
					>
						{this.state.msn}
					</div>
				) : null} */

/*{
				this.setState({ msn: res.data });
				setTimeout(() => {
					this.setState({
						msn: '',
					});
				}, 3000);
			}*/

/*	<Modal.Dialog
					className={classes.modal}
					show={this.state.modalShow}
					onHide={this.handleModalClose}
				>*/

/*.backdrop {
	position: absolute;
	display: flex;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
}
.modal {
	width: 80%;
	margin: auto;
}

.msn {
	position: absolute;
	margin: 2px;
	padding: 1% 3%;
	background-color: black;
	border-radius: 10px;
	height: 40px;
	color: #ffffff;
	font-size: 16px;
	opacity: 0.9;
}*/
