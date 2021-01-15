import React, { Component } from 'react';
//import { render } from 'react-dom';
import {
	BrowserRouter,
	Route,
	Redirect,
} from 'react-router-dom';
//import Header from '../container/Pages/Header';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import Landing from '../container/Pages/Landing';
import Dashboard from './surveys/Dashboard';
import SurveyNew from './surveys/SurveyNew';
import Auth from '../container/Auth/Auth';
import VerifyEmail from '../container/Pages/VerifyEmail';
import ReqResetPass from '../container/Auth/ReqResetPass';
import NewPass from '../container/Auth/NewPass';
import CalendarBuilder from '../container/Pages/CalendarBuilder';
import CreateTimeTables from '../container/Pages/TimeTables';
import Booking from '../container/Pages/Booking';
import BookingAdm from '../container/Pages/BookingAdm';
import MyBooking from '../container/Pages/MyBooking';
import Contacts from '../container/Pages/Contacts';
import Calendar from '../container/Pages/Calendar';
import WaitingList from '../container/Pages/WaitingList';
import TimeTables from '../container/Pages/TimeTables';
import SpecialtyAndServices from '../container/Pages/SpecialtyAndServices';
import StaffAssignment from '../container/Pages/StaffAssignment';
import Profile from '../container/Pages/Profile';
//import Headerx from '../components/Headerx/Headerx';

//import classes from './App.module.css';
//import Background from '../assets/LogoP.jpg';
import FacebookEmailAdd from '../container/Auth/FacebookEmailAdd';
import Loginx from '../container/Pages/Login/Loginx';
import PersonalInfo from '../container/Pages/PersonalInfo/PersonalInfo';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
		this.props.fetchAllUsers();
	}

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
					<div style={sectionStyle}>
						{this.props.email &&
						!this.props.emailVerified ? (
							<Redirect to='/verifyEmail' />
						) : null}
						{!this.props.email &&
						this.props.authenticated ? (
							<Redirect to='/auth/register/facebook/email' />
						) : null}
						<Route
							exact
							path='/'
							component={Landing}
						/>
						<Route
							exact
							path='/loginx'
							component={Loginx}
						/>
						<Route
							exact
							path='/personalInfo'
							component={PersonalInfo}
						/>

						<Route
							exact
							path='/auth'
							component={Auth}
						/>
						<Route
							exact
							path='/verifyEmail'
							component={VerifyEmail}
						/>
						{this.props.authenticated ? (
							<Route
								exact
								path='/surveys'
								component={Dashboard}
							/>
						) : null}
						<Route
							exact
							path='/reqresetpass'
							component={ReqResetPass}
						/>
						{this.props.authenticated ? (
							<Route
								exact
								path='/auth/register/facebook/email'
								component={FacebookEmailAdd}
							/>
						) : null}
						{this.props.authenticated ? (
							<Route
								exact
								path='/profile'
								component={Profile}
							/>
						) : null}
						<Route
							path='/newpass'
							component={NewPass}
						/>
						{this.props.authenticated ? (
							<Route
								exact
								path='/calendar/builder'
								component={CalendarBuilder}
							/>
						) : null}
						{this.props.authenticated ? (
							<Route
								exact
								path='/timetables'
								component={TimeTables}
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
								path='/surveys/new'
								component={SurveyNew}
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
								path='/staffassignment'
								component={StaffAssignment}
							/>
						) : null}
						{this.props.authenticated ? (
							<Route
								exact
								path='/timetables/create'
								component={CreateTimeTables}
							/>
						) : null}
					</div>
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
	};
};

export default connect(mapStateToProps, actions)(App);
