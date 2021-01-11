import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Input from '../../components/UI/Input/Input';
import Label from '../../components/UI/Label/Label';
import Spinner from '../../components/UI/Spinner/Spinner';
import Msg from '../../components/UI/Msg/Msg';


class ReqResetPass extends Component {
	state = {
   	email: '',
	  msn: '',
		isEmailValid:false,
	}

	scrollToTop() {
  	window.scrollTo({
  		top: 0,
  		behavior: 'smooth'
  	});
	}  
	
	componentDidMount() {
  	this.scrollToTop();
	};

  hideMsn = () => {
  	this.setState({ ...this.state, msn: '' });
  };

  //Email  - Component 1
		emailChangeHandler = (event) => {
			this.setState({ email: event.target.value });
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
	
	 	//Submit  - Component 6
	submitHandler = (event) => {
		this.setState({ isLoading: true });
		event.preventDefault();
		const dataEmail = { email: this.state.email };
  	axios.post('/api/reqresetpass', dataEmail)
  	.then((res) => {
  		if (res.data) { this.setState({ msn: res.data, isLoading:false }); } 
			}).catch((res) => {
  		this.setState({ msn: res.data, isLoading:false });
  	});
	};
	
	submitRender() {
  	return (
  		<div >
  			<Button variant="outline-info" onClick={this.submitHandler}
  				style={{height:'50px', width:'100%', marginTop:'50px' }}
  				disabled={!this.state.isEmailValid}
  			>
  				Request
  			</Button>
  		</div>
  	);
	}		

	render() {
  	return (
  		<div>
  			<div className="container" style={{ minWidth: '320px', maxWidth: '380px', marginTop:'77px'}}>
  				<div style={{ width: '100%', height: '20px' }}></div>
  				<Msg msn={this.state.msn} clicked={this.hideMsn}/>
					<Label text='Reset Password' />
					<div className="center">{this.state.isLoading ? <Spinner/>:null}</div>
					{this.emailRender()}
					{this.submitRender()}
				</div>
			</div>
  	);
	}
}

export default ReqResetPass;