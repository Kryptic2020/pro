import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from '../../components/UI/Spinner/Spinner';
import { enGB } from 'date-fns/esm/locale';
import moment from 'moment';


const styles = ((theme) => ({
	button: {
		display: 'block',
		marginTop: theme.spacing(2),
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

class Calendar extends Component {
  state = {
  	date: '', //
  	//isLoading: true,
  	open: null,//
  	msn: '',//
  	service: '',//
  	appointment: '',//
  	preferredName: '',//
  	preferredPhone: '',//
  	staff: '',//
  	specialty: '',//
  	message: '',//
		isLoading: false,//
		assignmentID: '',
		staffID:'',
    
  };
	
  scrollToTop() {
  	window.scrollTo({
  		top: 0,
  		behavior: 'smooth'
  	});
  }
	
  componentDidMount() {
  	this.props.onFetchDates();
		this.props.onfetchStaffAssignments();
		this.props.onfetchServicesPrices();
  	this.scrollToTop();
  };

  hideMsn = () => {
  	this.setState({ ...this.state, msn: '' });
  };

	//SPECIALTY - COMPONENT 1

	specialtyHandler = (event) => {
		this.setState({	...this.state, specialty: event.target.value, msn:'', assignmentID:'' });
		Axios.get('/api/is-active-check').then(() => {
  		this.setState({
  		    ...this.state,
  		     disabled:true, msn: 'Your Account has has been suspended, please contact the Admin' 
			});
		});
	};     

	specialtyRender() {
		const option = this.props.assignedSpecialties.map((x, index) => (<option key={index} value={x}>{x}</option>));
  	return (
  		<div>
  			<FormControl style={{ width: '100%' }} variant="outlined" >
  				<label style={{ width: '120px', fontSize: '15px', color: 'white' }}>Specialty</label>
  				<Select
  					style={{ height:'50px', width: '100%', color: '#01579b', fontSize: '18px', backgroundColor: 'white' }}
  					native
  					//value={this.state.specialty}
  					onChange={this.specialtyHandler}
  					inputProps={{
  						name: 'specialties',
  						id: 'specialty',
  					}}
  				>
  					<option value='' />
  					{option}
  				</Select>
  			</FormControl>
  		</div>
  	);
	}	

	// Staff - Component 2
	staffHandleChange = async (event) => {
		let assignmentID = '';
		this.props.staffAssignments.map((m) => {
			if (m.staffID === event.target.value && m.assignedSpecialty === this.state.specialty) { assignmentID= m._id; }
  	});

		this.setState({ ...this.state, staffID: event.target.value,assignmentID });
	};

	staffRender() {
		let spec = []; 
		this.props.staffAssignments.map((m) => { if (m.assignedSpecialty.includes(this.state.specialty)) spec.push(m);});
		const option = spec.map((y) => (<option key={y.staffID} value={y.staffID}>{y.staff}</option>)); 
  	return (
  		<div>
  			<FormControl style={{ width: '100%' }} variant="outlined" >
  				<label style={{ width: '120px', fontSize: '15px', color: 'white' }}>Staff</label>
  				<Select
  					style={{ height:'50px', width: '100%', color: '#01579b', fontSize: '18px', backgroundColor: 'white' }}
						native
  					onChange={(event)=>this.staffHandleChange(event)}
  					inputProps={{
  						name: 'assignstaff',
  						id: 'assignstaff',
  					}}
  				>
						{/*option.length == 1 ? null : <option value="" />*/}
						<option value="" />
  					{option}
  				</Select>
  			</FormControl>
  		</div>  
  	);
	}


    // SERVICE - COMPONENT 3
	serviceHandler = async (event) => {
  	this.setState({
  		service: event.target.value, isLoading:true
  	}); 
		
  	await this.props.servicesPrices.map((x) => { if (x.name === event.target.value) { this.setState({ price: x.price, serviceName: x.name }); } });
  	this.setState({
  		isLoading:false
  	});
  	this.props.staffAssignments.map((m) => {
  		if (m.staffID.includes(this.state.staffID)) { this.setState({ ...this.state, staff: m.staff }); }
  	});
		
	};
	serviceRender() {
  	let spec = [];
		this.props.servicesPrices.map((m) => { if (m.assignmentID === this.state.assignmentID) { spec.push(m.name); } });
  	const option = spec.map((y, index) => (<option key={index} value={y}>{y}</option>));
  	return (
  		<div >
  			<label style={{ width: '100%', fontSize: '15px', color: 'white' }}>Service</label>
  			<div>
  				<FormControl  style={{width:'100%'}} variant="outlined">
  					<Select 
  						style={{height:'50px', width: '70%', fontSize: '18px', color: '#01579b', backgroundColor: 'white' }}
  						native
  						//value={this.state.staff}
  						onChange={this.serviceHandler}
  						inputProps={{name: 'Service',id: 'Service'}}
  					>
  						<option value="" />
  						{option}
  					</Select>
  				</FormControl>
  					<Button className="right" style={{fontSize: '18px', floating:'right', marginTop:'-50px', height:'50px', width:'28%' }} variant="info">
              $ {this.state.price}
  					</Button>
  			</div>
  		</div>
  	);
	}
  
  //DATEPICKER - COMPONENT 4
  setDate = (date) => {
  	this.setState({ date });
  };

  datepickerHandler = (date) => {
  	this.setState({ date });
  	new Date(date).toLocaleDateString('es-ES', {
  		year: 'numeric',
  		month: 'numeric',
  		day: 'numeric',
  	});
  };

  datepickerRender() {
  	const CustomInput = ({ value, onClick }) => (
  		<button className='left' style={{ width: '100%', height: '50px', fontSize: '18px',  color: '#01579b', backgroundColor: 'white', borderRadius: '5px 5px 5px 5px' }} onClick={onClick}>
  			<span style={{ paddingLeft: '8px' }} className='left'>{value}</span>
  		</button>
  	);
  	return (
  		<div>
  			<label style={{ width: '120px', fontSize: '15px', color: 'white' }}>Date</label>
  			<DatePicker
  				style={{ width: '100%', color: '#01579b',fontSize: '18px' , backgroundColor: 'white' }}
  				selected={this.state.date}
  				onChange={(date) => this.datepickerHandler(date)}
  				withPortal
  				locale={enGB}
  				dateFormat="dd/MM/yyyy"
  				customInput={<CustomInput />}
  				minDate={new Date()}
  			/>
  		</div>
  	);
  }  
  // TIMEPICKER - COMPONENT 5
  timepickerHandler = (event) => {
  	this.setState({ appointment: event.target.value });
  };

  timepickerHandleClose = () => {
  	this.setState({ open: false });
  };

  timepickerHandleOpen = () => {
  	this.setState({ open: true });
  };

  timepickerRender() {
  	const time = ['Morning', 'Afternoon', 'Night'];
  	return (
  		<div>
  			<label style={{ fontSize: '15px', color: 'white' }}>Best Time</label>
  			<div style={{ width: '100%', backgroundColor: 'white', borderRadius: '5px 5px 5px 5px' }}>
  				<FormControl style={{ width: '100%' }}>
  					<Select
  						style={{ width: '100%', paddingLeft: '15px', height: '50px', color: '#01579b',  fontSize: '18px', backgroundColor: 'white', borderRadius: '10px 10px 10px 10px' }}
  						//labelId="Time"
  						id="Time"
  						open={this.state.open}
  						onClose={this.timepickerHandleClose}
  						onOpen={this.timepickerHandleOpen}
  						//value={this.state.appointment}
  						onChange={this.timepickerHandler}
  					>
  						{time.map((name) => (
  							<MenuItem
  								key={name}
  								value={name}
  								style={{ fontSize: '18px', color: '#01579b',  textAlign: 'center' }}
  							>
  								{name}
  							</MenuItem>
  						))}
  					</Select>
  				</FormControl>
  			</div>
  		</div>
  	);
  }  

  //MESSAGE - COMPONENT 8
  inputMessageChangeHandler = (event) => {
  	this.setState({
  		...this.state,
  		message: event.target.value,
  	});
  }
  messageRender() {
  	return (
  		<div>
  			<label style={{ fontSize: '15px', color: 'white' }}>Special Ocasion/Comments (max 120 letters)</label>
  			<textarea
  				style={{ width: '96%', paddingLeft: '15px', height: '60px', color: '#01579b',  fontSize: '18px', backgroundColor: 'white', borderRadius: '5px 5px 5px 5px' }}
  				onChange={this.inputMessageChangeHandler}
  				className="validate"
  				maxlength="120"
  				id='Comments'
  				type="text"
  			></textarea>
  		</div>
  	);
  } 	

  //SUBMIT BUTTON - COMPONENT 9  
	waitingListButtonHandler = async () => {
		this.setState({ ...this.state, isLoading:true });
  	const dataPost = {
  		date: moment(new Date(this.state.date)).format('YYYY-MM-DD[T00:00:00.000Z]')
  		,
  		time: this.state.appointment,
  		specialty: this.state.specialty,
  		service: this.state.service,
  		staff:this.state.staff,
  		requestedAt: new Date(), 
  		message:this.state.message
  	};
  	await Axios.post('/api/booking/waitinglist', dataPost)
  		.then((res) => {
  			this.setState({ ...this.state, msn: res.data, isLoading:false });
  		});
  	this.setState({ ...this.state, appointment: '', specialty: '', date: '', service: '',  staff:'' });
	};
  
	buttonRender() {
  	return (
  		<div>
  			<Button variant="info"
  				style={{ width: '100%', height: '50px', fontSize: '18px'}}
  				disabled={ !this.state.service || !this.state.specialty || !this.state.appointment || !this.state.date}
  				onClick={this.waitingListButtonHandler}
  			>
          Request<i className="material-icons right"></i>
  			</Button>
  		</div>
  	);
	}  

	render() {
  	return (
  		<div className="container" style={{ marginTop:'77px',minWidth: '320px', maxWidth: '380px' }}>
  			<div style={{ width: '100%', height:'10px'  }}></div>
  			<label style={{ color: 'white', fontSize:'18px' }}>
  				<p>Let's try an alternative schedule for you!</p>
  			</label>
  			<div className="center">
  				{this.state.msn ?
  					<Alert variant="warning " id='msn' onClick={this.hideMsn} style={{ marginBottom: '20px', fontSize: '18px' }}>
  						<Alert.Heading>
  							{this.state.msn}
  						</Alert.Heading>
  					</Alert> : null
  				}
				</div>
  			{this.specialtyRender()}
  			<div style={{ height: '10px', width: '100%' }}></div>
  			{this.state.specialty ? this.staffRender() : null}
  			<div style={{ height: '20px', width: '100%' }}></div>
  			{this.state.staffID ? this.serviceRender() : null}
  			<div style={{ height: '20px', width: '100%' }}></div>
  			{this.state.service ? this.datepickerRender() : null}
  			<div style={{ height: '20px', width: '100%' }}></div>
  			{this.state.date ? this.timepickerRender() : null}
  			<div style={{ height: '20px', width: '100%' }}></div>
 				{this.state.appointment ? this.messageRender() : null}
  			<div style={{ height: '50px', width: '100%' }}></div>
				<div className="center">{this.state.isLoading ? <Spinner /> : null}</div>
  			{this.state.appointment ? this.buttonRender() : null}
  			<div style={{ height: '20px', width: '100%' }}></div>
  			<Link to="/booking/mybooking">
  				<button
  					style={{  width: '100%' }}
  					//disabled={!this.state.appointment || !this.state.date}
  					className="blue white-text btn-flat"
  				>
            go to MY BOOKINGS<i className="material-icons right">arrow_forward</i>
  				</button>
  				<div style={{ height: '20px', width: '100%' }}></div>
				</Link>
				<div style={{ height: '20px', width: '100%' }}></div>
				<Button className="left" variant="info" onClick={this.props.history.goBack}>Back</Button>
				<div style={{ height: '20px', width: '100%' }}></div>
  		</div>
  	);
	}
}

const mapStateToProps = state => {
	return {
		rawData: state.booking.rawData,
		assignedSpecialties: state.booking.assignedSpecialties,
		staffAssignments: state.booking.staffAssignments,
		servicesPrices: state.booking.servicesPrices,
		services: state.booking.services
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchDates: () => dispatch(actions.fetchDates()),
		onfetchStaffAssignments: () => dispatch(actions.fetchStaffAssignments()),
		onfetchServicesPrices: () => dispatch(actions.fetchServicesPrices()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(
	withStyles(styles, { withTheme: true })(Calendar)
);
