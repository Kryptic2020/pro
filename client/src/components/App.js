import React, {Component} from 'react';
//import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Header from '../components/UI/Header/Header';
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
import Location from '../container/Pages/Location';
//import classes from './App.module.css';
//import Background from '../assets/LogoP.jpg';
import FacebookEmailAdd from '../container/Auth/FacebookEmailAdd';



class App extends Component {
	componentDidMount() {
		this.props.fetchUser(); 
		this.props.fetchAllUsers(); 
	}
  
	render() {
		const sectionStyle = {
			minWidth: '100vw',
			minHeight: '100vh',
			backgroundColor: this.props.authenticated ? this.props.theme : '#23272B', //'#23272B',//'#032641', //'#23272B', //"#01579b",
			margin:'auto',
			backgroundRepeat  : 'no-repeat',
			//backgroundPosition:"center",
			marginTop: '-20px',
			//opacity: "0.7",
			resizeMode: 'stretch',
			//overflow: 'hidden',
			//backgroundImage: `url(${Background})`
		};
 
	
		return (
			<div  >
				<BrowserRouter>
					<Header />
					<div style={sectionStyle}>
						{this.props.email && !this.props.emailVerified ? <Redirect to="/verifyEmail" /> : null}
						{!this.props.email && this.props.authenticated ? <Redirect to="/auth/register/facebook/email"/> : null}
						<Route exact path="/" component={Landing} />
						<Route exact path="/auth" component={Auth} />
						<Route exact path="/verifyEmail" component={VerifyEmail} />
						{this.props.authenticated ? <Route exact path="/surveys" component={Dashboard} /> : null}
						<Route exact path="/reqresetpass" component={ReqResetPass} />
						{this.props.authenticated ? <Route exact path="/auth/register/facebook/email"  component={FacebookEmailAdd} /> : null}
						{this.props.authenticated ? <Route exact path="/profile" component={Profile} /> : null}
						<Route path="/newpass" component={NewPass} />
						{this.props.authenticated ? <Route exact path="/calendar/builder" component={CalendarBuilder} /> : null}
						{this.props.authenticated ? <Route exact path="/timetables" component={TimeTables} /> : null}
						{this.props.authenticated ? <Route exact path="/booking" component={Booking} /> : null}
						{this.props.authenticated ? <Route exact path="/bookingAdm" component={BookingAdm} /> : null}
						{this.props.authenticated ? <Route exact path="/calendar" component={Calendar} /> : null}
						{this.props.authenticated ? <Route exact path="/waitinglist" component={WaitingList}/> : null}
						{this.props.authenticated ? <Route exact path="/booking/mybooking" component={MyBooking} /> : null}
						{this.props.authenticated ? <Route exact path="/surveys/new" component={SurveyNew} /> : null}
						{this.props.authenticated ? <Route exact path="/contacts" component={Contacts} /> : null}
						{this.props.authenticated ? <Route exact path="/specialtyandservices" component={SpecialtyAndServices} /> : null}
						{this.props.authenticated ? <Route exact path="/staffassignment" component={StaffAssignment} /> : null}
						{this.props.authenticated ? <Route
							exact
							path="/timetables/create"
							component={CreateTimeTables}
						/> : null}
						<Route exact path="/location" component={Location} />
					</div>
				</BrowserRouter>
			</div>
		);
	};
};

const mapStateToProps = state => {
	return {
		email: state.auth.email,
		emailVerified: state.auth.emailVerified,
		authenticated: state.auth.authenticated,
		theme:state.auth.theme
	};
  
};

export default connect(mapStateToProps, actions) (App);
