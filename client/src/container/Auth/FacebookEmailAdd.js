import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const initialState = {
	email: '',
	emailErr: '',
	success: '',
	msn:''

};

class FacebookEmailAdd extends Component {
	state = initialState;
	
	  hideMsn = () => {
  	this.setState({ ...this.state, msn: '' });
	  }

  validate = () => {
  	let emailErr = '';
  	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  	if (!re.test(this.state.email)) {
  		emailErr = 'Invalid email';
  	}
  	if (!this.state.email) {
  		emailErr = 'Email cannot be blank';
  	}
  	if (emailErr) {
  		this.setState({ emailErr });
  		return false;
  	}

  	return true;

  }


  handleFormSubmit(event) {
  	event.preventDefault();
  	const isValid = this.validate();
  	if (isValid) {
  		// let dataEmail = [];
  		const dataEmail = { email: this.state.email };
  		//console.log(dataEmail);
  		axios
  			.post('/api/email/register/facebook', dataEmail)
  			.then((res) => {
  				//console.log(res.data);
  				if (res.data) {
  					this.setState({ msn: res.data });
  				}; 
  				if (res.data === 'registered') { this.props.history.push('/verifyEmail'); };
  			})
  			.catch((res) => {
  				//console.log(res.data);
  			});
  		//console.log(this.state);
  		this.setState(initialState);
  	}

  };
  render() {
  	let form = (<div
  		className="container white-text"
  		style={{ maxWidth: '380px' }}
  	>
  		<div className="center">
  				{this.state.msn ?
  					<Alert variant="warning " id='msn' onClick={this.hideMsn} style={{ marginBottom: '20px', fontSize: '18px' }}>
  						<Alert.Heading>
  							{this.state.msn}
  						</Alert.Heading>
  					</Alert> : null
  				}
  		</div>
  		<div style={{ fontSize: '18px', paddingBottom: '10px' }}>
        Please inform your email address
  		</div>
  		<label style={{ color: 'white' }}>Your email address</label>
  		<form>
  			<span style={{ fontSize: '15px', color:'red' }}>
  				{this.state.emailErr}
  			</span>
  			<input
  				style={{ fontSize:'18px',color: '#032641',backgroundColor: 'white', borderRadius:'5px 5px 5px 5px' }}
  				type="email"
  				id="email"
  				name="email"
  				value={this.state.email}
  				onChange={(e) => this.setState({ email: e.target.value })}
  			/>
  			<Button variant="dark"
          
  				onClick={(e) => this.handleFormSubmit(e)}
  				disabled={!this.state.email}
  			>
          Submit<i className="material-icons right">check</i>
  			</Button>
  		</form>
  	</div>);

  	return (
  		<div style={{ backgroundColor: '#01579b', height: '100vh', width: '100vw', marginTop: '21px' }}>
  			<div style={{ height: '100px', width: '100%' }}></div>
  			<div>{form}</div>
  		</div>
  	);
  }
}

export default FacebookEmailAdd;