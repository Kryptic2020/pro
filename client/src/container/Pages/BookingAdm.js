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
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
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
  	staff: '',//
  	staffID:'',//
  	selection: [], //
  	open: null,//
  	msn: '',//
  	dateOfremainingSpots: [],//
  	timeOfremainingSpots: [],//
  	service: '',
  	specialty: '',
  	id: null,
  	fullName:null,
  	appointment: '',
  	appointmentHour: '',
  	appointmentMinute:'',
  	price: '',//
  	service: '', //
		serviceName: '',//
		assignmentID:'',
  	hour: ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','00'],
  	minute:[
  		'00',
  		'05',
  		'10',
  		'15',
  		'20',
  		'25',
  		'30',
  		'35',
  		'40',
  		'45',
  		'50',
  		'55'
  	]
    
  };
  scrollToTop() {
  	window.scrollTo({
  		top: 0,
  		behavior: 'smooth'
  	});
  }	
  componentDidMount(props) {
  	this.props.onFetchDates();
  	this.props.onfetchServicesPrices();
  	this.props.onfetchStaffAssignments();
  	this.setState({
  		id: this.props.location.id, fullName: this.props.location.fullName
  	});
 	this.scrollToTop();	
  };

  hideMsn = () => {
  	this.setState({ ...this.state, msn: '' });
  }

  //SPECIALTY - COMPONENT 1

	specialtyHandler = (event) => {
		this.setState({	...this.state, specialty: event.target.value,assignmentID:''  });
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
  						id: 'specialties',
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
		this.setState({ ...this.state, isLoading: true, staffID: event.target.value,assignmentID});
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
  					//value={this.state.staff}
  					onChange={(event)=>this.staffHandleChange(event)}
  					inputProps={{
  						name: 'assignstaff',
  						id: 'assignstaff',
  					}}
  				>
  					<option value="" />
  					{option}
  				</Select>
  			</FormControl>
  		</div>  
  	);
	}


  //Service  - COMPONENT 3
  serviceHandler = async(event) => {
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

  //DATAPICKER - COMPONENT 4
  datepickerHandler = (date) => {
  	this.setState({ date });
  };
  datepickerRender() {
  	const CustomInput = ({ value, onClick }) => (
  		<button className='left' style={{ width: '100%', height: '50px', fontSize: '15px', fontWeight: 'bold', color: '#01579b', backgroundColor: 'white', borderRadius: '5px 5px 5px 5px' }} onClick={onClick}>
  			<span style={{ paddingLeft: '8px' }} className='left'>{value}</span>
  		</button>
  	);
  	return (
  		<div>
  			<label style={{ width: '120px', fontSize: '15px', color: 'white' }}>Date</label>
  			<div>
  				<DatePicker
  					selected={this.state.date}
  					onChange={(date) => this.datepickerHandler(date)}
  					withPortal
  					dateFormat="dd/MM/yyyy"
  					customInput={<CustomInput />}
  					minDate={new Date()}
  				/>
  			</div>
  		</div>
  	);
  }

  //TIMEPICKER  - COMPONENT 5

  timepickerHourHandler = (event) => {
  	this.setState({ appointmentHour: event.target.value });
  };

  timepickerMinuteHandler = (event) => {
  	this.setState({ appointmentMinute: event.target.value });
  };

  timepickerHandleClose = () => {
  	this.setState({ open: false });
  };

  timepickerHandleOpen = () => {
  	this.setState({ open: true });
  };
  timepickerRender() {
  	return (
  		<div>
  			<div style={{ height:'30px'}}>
  					<label className="left" style={{ width:'45%',  fontSize: '15px', color: 'white' }}>Hour
  				</label>
  				<label className="right" style={{ width:'45%', fontSize: '15px', color: 'white' }}>Minute
  				</label>
  			</div>
  			<div>
  				<span className="left" style={{ width: '45%', backgroundColor: 'white', borderRadius: '5px 5px 5px 5px' }}>
					
  					<FormControl style={{ width: '100%' }} variant="outlined" >
  						<Select
  							style={{ textAlign: 'center', width: '100%', paddingLeft: '15px', height: '50px', color: '#01579b', fontWeight: 'bold', fontSize: '15px', backgroundColor: 'white', borderRadius: '10px 10px 10px 10px' }}
  							open={this.state.open}
  							onClose={this.timepickerHandleClose}
  							onOpen={this.timepickerHandleOpen}
  							value={this.state.appointmentHour}
  							onChange={this.timepickerHourHandler}
  						>
  							{this.state.hour.sort().map((name) => (
  								<MenuItem style={{}}
  									key={name}
  									value={name}
  								>
  									{name}
  								</MenuItem>
  							))}
  						</Select>
  					</FormControl>
  				</span>
  				<span className="right" style={{ width: '45%', backgroundColor: 'white', borderRadius: '5px 5px 5px 5px' }}>
  					<FormControl style={{ width: '100%' }} variant="outlined">
  						<Select
  							style={{ textAlign: 'center', width: '100%', paddingLeft: '15px', height: '50px', color: '#01579b', fontWeight: 'bold', fontSize: '15px', backgroundColor: 'white', borderRadius: '10px 10px 10px 10px' }}
  							open={this.state.open}
  							onClose={this.timepickerHandleClose}
  							onOpen={this.timepickerHandleOpen}
  							value={this.state.appointmentMinute}
  							onChange={this.timepickerMinuteHandler}
  						>
  							{this.state.minute.sort().map((name) => (
  								<MenuItem style={{}}
  									key={name}
  									value={name}
  								>
  									{name}
  								</MenuItem>
  							))}
  						</Select>
  					</FormControl>
  				</span>
  			</div>
  		</div>
  	);
  } 
  
  //SUBMIT - COMPONENT 6

  bookingHandler = async () => {
  	const time = this.state.appointmentHour.concat(':').concat(this.state.appointmentMinute);
  	const dataPost = {
  		date: moment(new Date(this.state.date)).format('YYYY-MM-DD[T00:00:00.000Z]')
  		,
  		specialty: this.state.specialty,
  		service: this.state.serviceName,
  		time: time,
  		_id: this.state.id,
  		fullName: this.state.fullName,
  		price: this.state.price,
			staffID: this.state.staffID,
			staff: this.state.staff,
		};
		console.log(dataPost);
  	await Axios.post('/api/booking/admnew', dataPost)
  		.then((res) => {
  			this.setState({ ...this.state, msn: res.data });
  		});
  	this.setState({ ...this.state, staff: '', appointment: '', specialty: '', date: '',  serviceName: '' });
  };

  bookingButtonRender() {
  	return (
  		<Button variant="info"
  			style={{ width: '100%', height:'50px' }}
  			disabled={!this.state.serviceName || !this.state.id || !this.state.specialty || !this.state.appointmentHour || !this.state.appointmentMinute || !this.state.date}
  			onClick={this.bookingHandler}
  		>
        Confirm Booking
  		</Button>
  	);
  };  



  render() {
  	return (
  		<div className="container" style={{ marginTop: '77px',minWidth: '320px', maxWidth: '380px'}}>
  			<div style={{ height: '40px', width: '100%' }}></div>
  			<label style={{ color:'white', fontSize:'18px'}}>
          Let's Create a Booking?
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
  			{this.state.id ? this.specialtyRender() : null}
  			<div style={{height:'10px', width:'100%'}}></div>
  			{this.state.specialty ? this.staffRender() : null}
  			<div style={{height:'10px', width:'100%'}}></div>
  			{this.state.staffID ? this.serviceRender() : null}
  			<div style={{ height: '10px', width: '100%' }}></div>
  			{this.state.serviceName ? this.datepickerRender() : null}
  			<div style={{ height: '10px', width: '100%' }}></div>
  			{this.state.date ? this.timepickerRender(): null}
  			<div style={{ height: '80px', width: '100%' }}></div>
  			{this.state.appointmentMinute && this.state.appointmentHour? this.bookingButtonRender() : null}
  			<Link to="/calendar">
  				<button
  					style={{ marginTop: '50px', width: '100%' }}
  					//disabled={!this.state.appointment || !this.state.date}
  					className="blue white-text btn-flat"
  				>
            got to Calendar<i className="material-icons right">arrow_forward</i>
  				</button>
  			</Link>
  		</div>
  	);
  }
}

const mapStateToProps = state => {
	return {
		rawData: state.booking.rawData,
		existingDates: state.booking.existingDates,
		services: state.booking.services,
		assignedSpecialties: state.booking.assignedSpecialties,
		servicesPrices: state.booking.servicesPrices,
		staffAssignments:state.booking.staffAssignments
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchDates: () => dispatch(actions.fetchDates()),
		onfetchServicesPrices: () => dispatch(actions.fetchServicesPrices()),
		onfetchStaffAssignments: () => dispatch(actions.fetchStaffAssignments())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(
	withStyles(styles, { withTheme: true })(Calendar)
);
