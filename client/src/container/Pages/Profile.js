import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import TextareaAutosize from 'react-textarea-autosize';


class Profile extends Component {

  state = {
  	phone:'',
  	credits: '',
  	_id: '',
  	fullName: '',
  	email: '',
  	provider: '',
  	photo:'',
  	isAdmin: '',
  	emailVerified:'',
  	isLoading: false,
  	msn: '',
  	isActive: '',
  	daysCalendarView:''
  }

  scrollToTop() {
  	window.scrollTo({
  		top: 0,
  		behavior: 'smooth'
  	});
  }	

  componentDidMount() {
  	this.fetchProfile();
  	this.scrollToTop();
  }
	
	blueThemeHandler = async(data) => {
		await this.setState({ isLoading: true });
		Axios.post('/api/theme-update', data);
		window.location.reload(false);
		this.setState({ isLoading: false });
	}

	fetchProfile = () => {
		this.setState({ isLoading: true });
  	const ID = {
  		_id: this.props.location.state._id
  	};
  	Axios.post('/api/profile/get', ID)
			.then(res => {
				//console.log(res.data);
  			this.setState({
  				...this.state,
  				phone: res.data.phone,
  				credits: res.data.credits,
  				_id: res.data._id,
  				fullName: res.data.fullName,
  				email: res.data.email,
  				provider: res.data.provider,
  				photo: res.data.photo,
  				isAdmin: res.data.isAdmin,
  				emailVerified: res.data.emailVerified,
  				isLoading: false,
					text: 'Insert your number here',
					isActive: res.data.isActive,
					info: res.data.info,
					daysCalendarView:res.data.daysCalendarView
  			});
  			//console.log(res.data.provider);
  		})
			.catch(err => {
				//console.log(err);
			});
	}

  hideMsn = () => {
  	this.setState({ ...this.state, msn: '' });
  }

  inputChangeHandler = (event, input) => {
  	this.setState({ [input]: event.target.value });
  };

	saveHandler = () => {
		window.scrollTo(0, 0);
		this.setState({ isLoading:true });
  	const data = {
  		fullName: this.state.fullName,
  		phone: this.state.phone,
  		photo: this.state.photo,
  		isAdmin: this.state.isAdmin,
			_id: this.state._id,
			isActive: this.state.isActive,
			info: this.state.info,
			daysCalendarView:this.state.daysCalendarView
  	};

  	Axios.post('/api/profile/update', data).then(res => {
  		this.setState({ msn: res.data, isLoading:false });
  	});
		this.fetchProfile();
	};

  adminNoYesHandler = (e) => {
  	this.setState({ isAdmin: e.target.checked });
  }
	
	activeNoYesHandler = (e) => {
  	this.setState({ isActive: e.target.checked });
	}

  daysCalendarViewChangeHandler = (event) => {
  	this.setState({
  		...this.state,
  		daysCalendarView: event.target.value,
  	});
  }
	
  editRender() {
  	const editAdminPrevileges =
      (
      	<div>
      		<label style={{ color: 'yellow', fontSize: '15px' }}>Admin privileges</label>
      		<div className="switch">
      			<label style={{ color: 'white', fontSize: '15px' }}>
              NO
      				<input
      					value={this.state.isAdmin}
      					onChange={this.adminNoYesHandler}
      					//onClick={this.adminToogleHandler}
      					type="checkbox"
      					checked={this.state.isAdmin}>
      				</input>
      				<span className="lever"></span>
              YES
      			</label>
      		</div>
      	</div>
      );

  	const daysCalendarView = (
  		<div>
  			<label style={{ fontSize: '15px', color: 'white' }}>Max days for Calendar View</label>
  			<input
  					style={{ fontSize: '20px', height: '50px', textAlign: 'center', color: 'black', backgroundColor: 'white', borderRadius: '5px' }}
  				onChange={this.daysCalendarViewChangeHandler}
  				value={this.state.daysCalendarView}
  				className="validate"
  				id='daysCalendarView'
  				type="number"
  			></input>
  		</div>
  	);
		
  	const infoEdit = (
  		<div>
  				<label className="text-white">Info</label>
  				<TextareaAutosize
  					style={{ fontSize: '20px', height: '50px', textAlign: 'center', color: 'black', backgroundColor: 'white', borderRadius: '5px' }}
  					//label="Title"
  					type='text'
  					value={this.state.info}
  					onChange={event => this.inputChangeHandler(event, 'info')}
  				></TextareaAutosize>
  			</div>
  	);

  	const editActiveUser =
      (
      	<div>
      		<label style={{ color: 'yellow', fontSize: '15px' }}>User Status</label>
      		<div className="switch">
      			<label style={{ color: 'white', fontSize: '15px' }}>
              DISABLE
      				<input
      					value={this.state.isActive}
      					onChange={this.activeNoYesHandler}
      					//onClick={this.adminToogleHandler}
      					type="checkbox"
      					checked={this.state.isActive}>
      				</input>
      				<span className="lever"></span>
              ENABLED
      			</label>
      		</div>
      		<div style={{ width: '100%', height: '30px' }}></div>
      	</div>
      );
  	return (
  		<div>
  			<div>
  				<label className="text-white">Full Name</label>
  				<input
  					style={{ fontSize: '18px', height: '50px', textAlign: 'center', color: 'black', backgroundColor: 'white', borderRadius: '5px' }}
  					label="Title"
  					type='text'
  					value={this.state.fullName}
  					onChange={event => this.inputChangeHandler(event, 'fullName')}
  				></input>
  			</div>
  			<div >
  				<label className="text-white">Email</label>
  				<div
  					style={{ fontSize: '18px', width:'100%', paddingTop:'5px', height:'50px', textAlign: 'center', color: 'black', backgroundColor: 'grey', borderRadius: '5px' }}>
  					{this.state.email}
  				</div>
  			</div>
  			<div >
  				<label className="text-white">Email Verified</label>
  				<div
  					style={{ fontSize: '18px', paddingTop: '5px', height: '50px', textAlign: 'center', color: 'black', backgroundColor: 'grey', borderRadius: '5px' }}>
  					{this.state.emailVerified ? 'Verified' : 'Not Verified yet'}
  				</div>
  			</div>
  			<div >
  				<label className="text-white">Phone</label>
  				<input
  					style={{ fontSize: '18px', height: '50px', textAlign: 'center', color: 'black', backgroundColor: 'white', borderRadius: '5px' }}
  					label="Title"
  					type='text'
  					value={this.state.phone }
  					onChange={event => this.inputChangeHandler(event, 'phone')}
  					onClick={()=> {this.setState({phone:''});} }
  				/>
  			</div>
  			<div >
  				<label className="text-white">Provider</label>
  				<div
  					style={{ fontSize: '18px', paddingTop: '5px', height: '50px', textAlign: 'center', color: 'black', backgroundColor: 'grey', borderRadius: '5px' }}>
  					{this.state.provider}
  				</div>
  			</div>
				
  			<div >
  				{/*	<label className="text-white">Photo url</label>
  				<div
  					style={{ fontSize: '12px', height: '50px', textAlign: 'center', color: 'black', backgroundColor: 'grey', borderRadius: '5px' }}>
  					{this.state.photo}
  				</div>*/}
  			</div>
  			<div style={{ width: '100%', height: '20px' }}></div>
  			<div style={{ width: '100%' }}>
  				<span className="center">
  					{this.props.isAdmin ? infoEdit : null}
  				</span>
  			</div>
  			<div style={{ width: '100%', height: '20px' }}></div>
  			<div style={{ width: '100%' }}>
  				<span className="center">
  					{this.props.isAdmin ? daysCalendarView : null}
  				</span>
  			</div>
  			<div style={{ width: '100%', height: '20px' }}></div>
  			<div style={{ width: '100%' }}>
  				<span className="center">
  					{this.props.isAdmin ? editAdminPrevileges : null}
  				</span>
  			</div>
  			<div style={{ width: '100%', height: '20px' }}></div>
  			<div style={{ width: '100%' }}>
  				<span className="center">
  					{this.props.isAdmin ? editActiveUser : null}
  				</span>
  			</div>
  			<span className="right">
  				<Button onClick={this.saveHandler} variant="success">Save</Button>
  			</span>
  			<span className="left">
  				<Button className="left" variant="info" onClick={this.props.history.goBack}>Back</Button>
  			</span>
  			<div style={{ width: '100%', height: '60px' }}></div>
  		</div>
  	);
  };

  

  render() {

  	return (
  		<div className="container" style={{ minWidth: '320px', maxWidth: '380px', marginTop: '77px' }}>
  			<div style={{ width: '100%', height: '20px' }}></div>
  			<div className="center">
  				{this.state.msn ?
  					<Alert variant="warning " id='msn' onClick={this.hideMsn} style={{ marginBottom: '20px' }}>
  						<Alert.Heading>
  							{this.state.msn}
  						</Alert.Heading>
  					</Alert> : null
  				}
  			</div>
  			<div className="center">{this.state.isLoading ? <Spinner /> : null}</div>
  			<div className="center">
  				{/*<img alt="profile" style={{ width: '50px', height: '50px' }} src={this.state.photo} />*/}
  			</div>
  			<div>{this.editRender()}</div>
				
  			<div style={{ width: '100%', height: '20px' }}></div>
  			<Button onClick={() => this.blueThemeHandler({ color: '#032641' })} style={{ backgroundColor: '#032641', border: '1px solid #032641', margin: '2px'  }}>Dark
  			</Button>
  			<Button onClick={() => this.blueThemeHandler({ color: '#01579b' })} style={{ backgroundColor: '#01579b', border: '1px solid #01579b', margin: '2px'  }}>Blue
  			</Button>
  			<Button onClick={() => this.blueThemeHandler({ color: '#23272B' })} style={{ backgroundColor: '#23272B', border: '1px solid #23272B', margin: '2px' }}>Grey
  			</Button>
  			<Button onClick={() => this.blueThemeHandler({ color: '#6f42c1' })} style={{ backgroundColor: '#6f42c1', border: '1px solid #6f42c1', margin: '2px'  }}>purple
  			</Button>
  			<Button onClick={() => this.blueThemeHandler({ color: 'black' })} style={{ backgroundColor: 'black', border: '1px solid black', margin: '2px' }}>black
  			</Button>
  			<Button onClick={() => this.blueThemeHandler({ color: '#FF9653' })} style={{ backgroundColor: '#FF9653', border: '1px solid #FF9653', margin: '2px' }}>orange
  			</Button>
  			<Button onClick={() => this.blueThemeHandler({ color: '#45D4FF' })} style={{ backgroundColor: '#45D4FF', border: '1px solid #45D4FF', margin: '2px' }}>light blue
  			</Button>
  			<Button onClick={() => this.blueThemeHandler({ color: '#ad1457' })} style={{ backgroundColor: '#ad1457', border: '1px solid #ad1457', margin: '2px'  }}>Pink
  			</Button>
  			<div style={{ width: '100%', height: '80px' }}></div>
  		</div>
  	);
  }
}

const mapStateToProps = state => {
	return {
		isAdmin: state.auth.isAdmin
	};
};

export default connect(mapStateToProps, null)((withRouter)(Profile));