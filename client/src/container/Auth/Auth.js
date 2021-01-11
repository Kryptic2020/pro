import React, {Component} from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
//import { updateObject, checkValidity } from '../../utils/utility2';
//import Input from '../../components/UI/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
//import classes from './Auth.module.css';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import * as actions from '../../store/actions/index';
//import FacebookIcon from '@material-ui/icons/Facebook';
import Button from 'react-bootstrap/Button';
import Input from '../../components/UI/Input/Input';
import Label from '../../components/UI/Label/Label';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';

class Auth extends Component {
	state = {
		fullName: '',
			firstName: '',
				lastName: '',
		phone: '',
		email: '',
		password:'',
  	isSignup: false,
  	isVisible: true,
  	isLoading: false,
		msn: '',
		isEmailValid: false,
		passwordVisible:false,
	};

	scrollToTop() {
  	window.scrollTo({
  		top: 0,
  		behavior: 'smooth'
  	});
	}
	
	componentDidMount() {
  	if (this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath(); 
			this.scrollToTop();
  	}
	}

	inputChangeHandler = (event, input) => {
		this.setState({ [input]: event.target.value });
	}
		

  hideMsn = () => {
  /*	document.getElementById('fullName').value = document.getElementById('fullName').value;
  	document.getElementById('phone').value = document.getElementById('phone').defaultValue;*/
  	//document.getElementById('email').value = document.getElementById('email').value;
  	//document.getElementById('password').value = document.getElementById('password').value;
  	//	window.location.reload(false);
  	this.setState({ ...this.state, msn: '', fullName: '', phone: '', email: '', password: '', isLoading: false, });
  	window.location.reload(false);
  } 
	
  //Name  - Component 1
  firstNameRender() {
  	return (
  		<div>
  			<Input id="firstName" label='First Name' msg={this.state.firstName.length < 3 ? 'First name is required. Min length is 3':null} onChange={event => this.inputChangeHandler(event, 'firstName')} type='text'></Input>
  		</div>
  	);
	}
	//Name  - Component 1
	lastNameRender() {
  	return (
  		<div>
  			<Input id="lastName" label='Last Name' msg={this.state.lastName.length < 3 ? 'Last name is required. Min length is 3':null} onChange={event => this.inputChangeHandler(event, 'lastName')} type='text'></Input>
  		</div>
  	);
  }
	
  //Phone  - Component 2
	
  phoneRender() {
  	return (
  		<div style={{width:'100%', marginBottom:'15px' }}>
  			<div style={{width:'100%', height:'20px', marginTop:'10px' }}>
  			<label style={{ color: 'white'}} className="left">Phone</label>
	  		<label style={{ color: 'yellow'}} className="right">{this.state.phone.length > 8 ? null : 'A valid phone is required.Min length is 10'}</label>
  			</div>
  			<div >
  				<PhoneInput 
  				inputStyle={{ width:'100%', height:'50px',textAlign:'center',fontSize:'18px',color: '#01579b', borderRadius:'4px', backgroundColor: 'white' }}
  					country={'au'}
  					disableCountryCode={true}
  				//autoFormat={true}
  				enableAreaCodes={true}
  					value={this.state.phone}
  					onlyCountries={['au']}
  					masks={{ au: '.... ... ...' }}
  					placeholder='Your Phone Number'
  				onChange={phone => this.setState({ phone })}
  			/>
  			</div>
  		</div>
			
  	);
  }
	
		//Email  - Component 3 
		emailChangeHandler = (event) => {
			this.setState({ ...this.state, email: event.target.value, fullName:this.state.firstName+' '+this.state.lastName });
			//console.log(event.target.value);
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			const isValid = pattern.test(event.target.value);
			if (isValid) { this.setState({ isEmailValid: true }); } else { this.setState({ isEmailValid: false }); } //console.log(this.state.isEmailValid);
		}
		emailRender() {
  	return (
  		<div>
  			<Input  label='Email Address' msg={this.state.isEmailValid ? null :'A valid email is required'} onChange={this.emailChangeHandler} type='email'></Input>
  		</div>
  	);
		}

		//Password  - Component 4
	 	togglePassHandler = () => {
  	this.setState((prevState) => {
  		return { passwordVisible: !prevState.passwordVisible };
  	});
	 	};
	
	passwordRender() {
  	return (
  		<div>
  			<div >
  				<Input id="password" label='Password' msg={this.state.password.length < 6 ? 'Min length is 6' : null} onChange={event => this.inputChangeHandler(event, 'password')} type={this.state.passwordVisible ? 'text' : 'password'}></Input>
  				<span onClick={this.togglePassHandler} style={{ with: '100px', position: 'relative', marginTop: '-45px', marginLeft: '-50px' }} className="right">{this.state.passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}</span>
  			</div>
  			
  		</div>
  	);
	 	}
	
	 	//FORGOT PASSWORD - Component 5

	 	forgotPassRender() {
	 		return (
	 			<Link to='/reqresetpass'><div  style={{textDecoration:'underline', color:'yellow', fontSize:'12px'}}>
				Forgot Password?
	 			</div></Link>
	 		);
	 	}
	
	 	//Submit  - Component 6

	submitHandler = (event) => {
		this.scrollToTop();
  	this.props.onAuth(
  		this.state.fullName,
  		this.state.phone,
  		this.state.email,
  		this.state.password,
  		this.state.isSignup,
  		this.props.history
  	);
  	this.setState({ isLoading: true, fullName:'',phone:'',email:'', password:'' });
	};
	
	submitRender() {
  	return (
  		<div >
  			<Button variant="info" onClick={this.submitHandler}
  				style={{height:'50px', width:'100%', marginTop:'50px' }}
  				disabled={!this.state.isEmailValid || this.state.password.length < 6}
  			>
  				{this.state.isSignup ? 'SIGN UP' : 'LOG IN'}
  			</Button>
  		</div>
  	);
	}	
	
	//Toggle Signin/Signup  - Component 7

	toggleHandler = () => {
  	this.setState((prevState) => {
  		return { isSignup: !prevState.isSignup };
  	});
	};
	
	toggleSignInSignUpRender() {
  	const signIn = (
  		<span style={{color:'white'}}>Don't you have an account yet? 
  			<span style={{textDecoration:'underline', color:'yellow'}}> Sign up now</span>
  		</span>
  	);
  	const signUp = (
  		<span style={{color:'white'}}>Already have an account? 
  			<span style={{textDecoration:'underline', color:'yellow'}}> Log in now</span>
  		</span>
  	);
  	return (
  		<div >
  			<div onClick={this.toggleHandler}
  				style={{height:'50px', width:'100%', marginTop:'50px', marginBottom:'40px',  }}
  			>
  				{this.state.isSignup ? signUp:signIn}
  			</div>
  		</div>
  	);
	}			


	render() {
  	{/*
  				<div style={{ color: 'white', textAlign: 'center', marginTop: '0px' }}>
  					<span> ____________________ </span>
  					<span className={classes.Or}> OR </span>
  					<span style={{ marginLeft: '32px' }}> ____________________ </span>
  				</div>
  				<div className={classes.Face} style={{ marginTop: '25px' }}><FacebookIcon style={{ color: 'white', marginLeft: '-185px', marginTop: '2px', fontSize: 30 }} />
  					<a href="/auth/facebook" style={{ position: 'absolute', marginLeft: '10px', marginTop: '5px', color: 'white' }}>Sign with Facebook
             
  					</a>
  				</div>*/}
  			{/*<div className={classes.Face} style={{ textAlign: 'center', marginTop: '20px', color: 'white' }}>
						<div>
							<span style={{ position: 'absolute', color: 'white', fontSize: '28px', fontWeight: 'bold', marginLeft: '-100px', marginTop: '-5px' }}>
								G
  						</span>
							<a href="/auth/google" style={{ textAlign: 'center', color: 'white', position: 'absolute', marginLeft: '-70px', marginTop: '3px' }}>Sign in with Google</a>
						</div>
					</div>*/}

 

  	let authRedirect = null;
  	if (this.props.authenticated) {
  		authRedirect = <Redirect to={this.props.authRedirectPath} />;
  	}
  	return (
  		<div>
  			<div className="container" style={{ minWidth: '320px', maxWidth: '380px', marginTop:'77px'}}>
  				<div style={{ width: '100%', height: '20px' }}></div>
  				<div className="center">
  				{this.props.msnErr && this.props.msnErr.length > 3 ?
  					<Alert variant="warning " id='msn' onClick={this.hideMsn} style={{ marginBottom: '20px'}}>
  						<Alert.Heading>
									{this.props.msnErr}<p>Click here and try again!</p>
  						</Alert.Heading>
  					</Alert> : null
  				}
  				</div>
  				<Label text={this.state.isSignup ? 'Register' : 'Log in'} />
  				{this.props.loading || this.state.isLoading ?	<div style={{width:'100%'}} className="center"><Spinner /></div>:null}
					{this.state.isSignup ? this.firstNameRender() : null}
					{this.state.isSignup && this.state.firstName ? this.lastNameRender():null}
  				{this.state.isSignup && this.state.firstName.length > 2 && this.state.lastName.length > 2 ? this.phoneRender():null}
  				{!this.state.isSignup || this.state.isSignup && this.state.phone.length > 9 ? this.emailRender():null}
					{!this.state.isSignup || this.state.isSignup && this.state.email ? this.passwordRender() : null}
					{!this.state.isSignup ? this.forgotPassRender() : null}
  				{this.submitRender()}
					{this.toggleSignInSignUpRender()}
					{this.state.phone}
  			</div>
  		</div>
  	);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		authenticated: state.auth.authenticated,
		msnErr: state.auth.msnErr,
		authRedirectPath: state.auth.authRedirectPath
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onAuth: (
			fullName,
			phone,
			email,
			password,
			isSignup,
			history
		) =>
			dispatch(
				actions.auth(
					fullName,
					phone,
					email,
					password,
					isSignup,
					history
				)
			),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)((withRouter)(Auth));
