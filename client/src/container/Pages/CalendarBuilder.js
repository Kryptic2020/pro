import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Link } from 'react-router-dom';
import moment from 'moment';
import TimeTable from '../../components/Calendar/TimeTable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { enGB } from 'date-fns/esm/locale';
//import Modal from '../../components/UI/Modal/Modal';
//import Backdrop from '../../components/UI/Backdrop/Backdrop';

class Booking extends Component {
  state = {
  	date: null,//
  	//Tdate: '',
  	timeTables: [],//
  	selected: '',//
  	isLoading: false,//
  	startDate: null,//
  	endDate: null,//
  	//TendDate: '',
  	//TstartDate: '',
  	msn: '',//
  	calendarBySpecialty: [], //
  	Mon: 'Empty',
  	Tue: 'Empty',
  	Wed: 'Empty',
  	Thu: 'Empty',
  	Fri: 'Empty',
  	Sat: 'Empty',
  	Sun: 'Empty',
  	openView: false,//
  	specialty: '',//
  	staffID: '',//
  	show: true,//
  	modalShow: false,//
  };

  componentDidMount() {
  	this.scrollToTop();
  	this.fetchTimeTable();//
  	this.props.onFetchDates();//
  	this.props.onfetchStaffAssignments();//
  };

	handleModalShow = () => {
		this.setState({ modalShow: true });
	}

	handleModalClose = () => {
		this.setState({ modalShow: false });
	}

	hideMsn = () => {
		this.setState({ ...this.state, msn: '' });
	}; 

	//SPECIALTY - COMPONENT 1
	specialtyChangeHandler = async (event) => {
		//console.log(moment(new Date()).format('DD-MM-YYYY[T00:00:00.000Z]'));
  	this.setState({
  		...this.state,
  		specialty: event.target.value,
  	});
  	const data = { specialty: event.target.value };
  	await axios.post('/api/calendar/byspecialty', data).then(res => {
  		let dates = [];
  		res.data.map((e) => { dates.push(new Date(e.date.split('/').reverse().join('/'))); });
  		this.setState({
  			...this.state,
  			calendarBySpecialty: dates
  		});
  	});
	}; 
  
	specialtyRender() {
		const option = this.props.assignedSpecialties.map((x, index) => (<option key={index} value={x}>{x}</option>));
  	return (
  		<div>
  			<div className="white-text">
  				<FormControl style={{ width: '100%' }} variant="outlined" >
  					<label style={{ width: '120px', fontSize: '15px', color: 'white' }}>Specialty</label>
  					<Select style={{ fontSize: '18px', height:'50px', color: '#01579b', fontWeight: 'bold', backgroundColor: 'white' }}
  						native
  						//value={this.state.specialty}
  						onChange={this.specialtyChangeHandler}
  						inputProps={{
  							name: 'age',
  							id: 'specialty',
  						}}
  					>
  						<option aria-label="None" value="" />
  						{option}
  					</Select>
  				</FormControl>
  			</div>
  		</div>
  	);
	}; 

	//STAFF  - COMPONENT 2
	staffHandleChange = (event) => {
		this.setState({
			...this.state,
			staffID: event.target.value,
			msn: '',
		});
		this.props.staffAssignments.map((m) => {
			if (m.staffID.includes(event.target.value)) return this.setState({ staff: m.staff });
		});
	}

	staffRender() {
  	const option = this.props.staffAssignments.map((m) => (m.assignedSpecialty.includes(this.state.specialty) ? <option key={m._id} value={m.staffID}>{m.staff}</option> : null
  	));
  	return (
  		<div>
  			<FormControl style={{ width: '100%' }} variant="outlined" >
  				<label style={{ width: '120px', fontSize: '15px', color: 'white' }}>Assign Staff</label>
  				<Select
  					style={{ height:'50px', fontSize: '18px',color: '#01579b', fontWeight: 'bold', backgroundColor: 'white' }}
  					native
  					//value={this.state.staff}
  					onChange={this.staffHandleChange}
  					inputProps={{
  						name: 'age',
  						id: 'assignstaff',
  					}}
  				>
  					<option aria-label="None" value="" />
  					{option}
  				</Select>
  			</FormControl>
  		</div>  
  	);
	}
  
  //DATEPICKER - COMPONENT 3
  setStartDate = (date) => {
  	this.setState({ startDate: date });
  };

  setEndDate = (date) => {
  	this.setState({ endDate: date });
  };
  
  RangeDatepickerRender() {
  	const CustomInput1 = ({ value, onClick }) => (
  		<button className='left' style={{ width: '100%', height: '50px', fontSize: '18px', fontWeight: 'bold', color: '#01579b', backgroundColor: 'white', borderRadius: '5px 5px 5px 5px' }} onClick={onClick}>
  			<span style={{ paddingLeft: '8px' }} className='left'>{value}</span>
  		</button>
  	);
  	const CustomInput2 = ({ value, onClick }) => (
  		<button className='left' style={{ width: '100%', height: '50px', fontSize: '18px', fontWeight: 'bold', color: '#01579b', backgroundColor: 'white', borderRadius: '5px 5px 5px 5px' }} onClick={onClick}>
  			<span style={{ paddingLeft: '8px' }} className='left'>{value}</span>
  		</button>
  	);
  	return (
  		<div>
  			<label style={{ width: '120px', fontSize: '15px', color: 'white' }}>Select Start Date</label>
  			<div>
  				<DatePicker
  					selected={this.state.startDate}
  					onChange={(date) => this.setStartDate(date)}
  					highlightDates={this.state.calendarBySpecialty}
  					withPortal
  					minDate={new Date()}
  					dateFormat="dd/MM/yyyy"
  					locale={enGB}
  					customInput={<CustomInput1 {...this.props} />}
  				/>
  				<div style={{ height: '20px', width: '100%' }}></div>
  				<div >
  					<label style={{ width: '120px', fontSize: '15px', color: 'white' }}>Select End Date</label>
  					<DatePicker
  						selected={this.state.endDate}
  						onChange={(date) => this.setEndDate(date)}
  						highlightDates={this.state.calendarBySpecialty}
  						withPortal
  						dateFormat="dd/MM/yyyy"
  						locale={enGB}
  						customInput={<CustomInput2/>}
  						openToDate={this.state.startDate}
  						minDate={this.state.startDate}
  					/>
  				</div>
          
          
  			</div>
  		</div>
      
  	);
  }
	
  //DELETE CALENDAR - COMPONENT 4 

	show = () => {
  	this.setState((prevState) => {
  		return { show: !prevState.show };
  	});
	}
	
	deleteCalendarHandler = () => {
		this.setState({ ...this.state, isLoading:true });
  	let currentDate = moment(this.state.startDate);
  	let endDate = moment(this.state.endDate);
  	let newArray = [];
  	while (currentDate <= endDate) {
  		if (currentDate.toString().includes(this.state.Mon) === false &&
        currentDate.toString().includes(this.state.Tue) === false &&
        currentDate.toString().includes(this.state.Wed) === false &&
        currentDate.toString().includes(this.state.Thu) === false &&
        currentDate.toString().includes(this.state.Fri) === false &&
        currentDate.toString().includes(this.state.Sat) === false &&
        currentDate.toString().includes(this.state.Sun) === false) {
  			newArray.push(new Date(currentDate));
  		};
  		currentDate = moment(currentDate).add(1, 'days');
  	};
  	let toLocaleArray = [];
  	newArray.forEach(el => {
  		toLocaleArray.push(moment(new Date(el)).format('YYYY-MM-DD[T00:00:00.000Z]'));
  	});
   
  	const dataPost = {
  		toLocaleArray,
  		times: this.state.selected,
  		specialty: this.state.specialty,
  		staffID:this.state.staffID
  	}; 
  	axios.post('/api/calendar/delete', dataPost)
  		.then(res => {
  			this.setState({ ...this.state, msn: res.data, isLoading:false });
  		})
  		.catch(err => {
  			this.setState({ ...this.state, msn: 'There was an error, please try again later!'});
  		});
  	this.setState({ ...this.state, startDate: '', staff:'', endDate: '', specialty:'', modalShow:false });
  	this.scrollToTop();
  	document.getElementById('specialty').value = document.getElementById('specialty').defaultValue;
	};

	deleteCalendarRender() {
		return (
			<div>
				<Button style={{ width: '100%' }} variant='danger' onClick={this.handleModalShow}>DELETE CALENDAR</Button>
				<Modal show={this.state.modalShow} onHide={this.handleModalClose}>
					<Modal.Header closeButton>
						<Modal.Title>Delete Calendar</Modal.Title>
					</Modal.Header>
					<Modal.Body>You're trying to delete this calendar, are you sure?!</Modal.Body>
					<Modal.Footer>
						<span className="left">
							<Button  variant="secondary" onClick={this.handleModalClose}>
								Close
							</Button></span>
						<span >
							<Button className="right" variant="danger" onClick={this.deleteCalendarHandler}>
            delete
							</Button></span>
					</Modal.Footer>
				</Modal>
				<Button style={{width:'100%', marginTop:'30px'}} variant='warning' onClick={this.show }>back</Button>
			</div>
		);
	}

  //WEEKDAYS & OPEN/CLOSE VIEW - COMPONENT 5
  Mon = () => {
  	if (this.state.Mon === 'Empty') {
  		this.setState({ Mon: 'Mon' });
  	} else {
  		this.setState({ Mon: 'Empty' });
  	}
  }

  Tue = () => {
  	if (this.state.Tue === 'Empty') {
  		this.setState({ Tue: 'Tue' });
  	} else {
  		this.setState({ Tue: 'Empty' });
  	}
  }

  Wed = () => {
  	if (this.state.Wed === 'Empty') {
  		this.setState({ Wed: 'Wed' });
  	} else {
  		this.setState({ Wed: 'Empty' });
  	}
  }

  Thu = () => {
  	if (this.state.Thu === 'Empty') {
  		this.setState({ Thu: 'Thu' });
  	} else {
  		this.setState({ Thu: 'Empty' });
  	}
  }

  Fri = () => {
  	if (this.state.Fri === 'Empty') {
  		this.setState({ Fri: 'Fri' });
  	} else {
  		this.setState({ Fri: 'Empty' });
  	}
  }

  Sat = () => {
  	if (this.state.Sat === 'Empty') {
  		this.setState({ Sat: 'Sat' });
  	} else {
  		this.setState({ Sat: 'Empty' });
  	}
  }

  Sun = () => {
  	if (this.state.Sun === 'Empty') {
  		this.setState({ Sun: 'Sun' });
  	} else {
  		this.setState({ Sun: 'Empty' });
  	}
  } 

  OpenCloseViewHandler = (e) => {
  	this.setState({ openView: e.target.checked }); 
  }  
  
  renderWeekdays() {
  	return (
  		<div>
  			<label style={{
  				color: 'white'
  			}}>
  				<h6>Want to exclude some weekdays?</h6>
  			</label>
  			<div>
  				<Button size="sm" style={{ marginLeft: '1px', width: '44px', height: '35px', fontSize: '11px'}} onClick={this.Mon}  variant={this.state.Mon === 'Empty' ? 'outline-primary':'outline-danger' }>Mon</Button>
  				<Button size="sm" style={{ marginLeft: '1px', width: '44px', height: '35px', fontSize: '11px'}}  onClick={this.Tue} variant={this.state.Tue === 'Empty' ? 'outline-primary':'outline-danger' }>Tue</Button>
  				<Button size="sm" style={{ marginLeft: '1px', width: '44px', height: '35px', fontSize: '11px'}}  onClick={this.Wed} variant={this.state.Wed === 'Empty' ? 'outline-primary':'outline-danger' }>Wed</Button>
  				<Button size="sm" style={{ marginLeft: '1px', width: '44px', height: '35px', fontSize: '11px'}}  onClick={this.Thu} variant={this.state.Thu === 'Empty' ? 'outline-primary':'outline-danger' }>Thu</Button>
  				<Button size="sm" style={{ marginLeft: '1px', width: '44px', height: '35px', fontSize: '11px'}}  onClick={this.Fri} variant={this.state.Fri === 'Empty' ? 'outline-primary':'outline-danger' }>Fri</Button>
  				<Button size="sm" style={{ marginLeft: '1px', width: '44px', height: '35px', fontSize: '11px'}}  onClick={this.Sat} variant={this.state.Sat === 'Empty' ? 'outline-primary':'outline-danger' }>Sat</Button>
  				<Button size="sm" style={{ marginLeft: '1px', width: '44px', height: '35px', fontSize: '11px'}}  onClick={this.Sun} variant={this.state.Sun === 'Empty' ? 'outline-primary':'outline-danger' }>Sun</Button>
  				<div style={{ height: '20px', width: '100%' }}></div>
  				<div style={{ backgroundColor: 'white', borderRadius: '5px', padding: '5px'}}>
  					<label style={{ color: '#01579b' }}><h6>Select "OpenView" if you want it to be seem by everyone</h6></label>
  					<div className=" center switch">
  						<label style={{ color: '#01579b', fontSize:'13px' }}>
                closed View
  							<input onChange = {this.OpenCloseViewHandler} type="checkbox"></input>
  							<span className="lever"></span>
                Open view
  						</label>
  					</div>
  				</div>
  			</div>
  		</div>
  	);
  }  

  //TABLES - COMPONENT 6
  fetchTimeTable = () => {
  	axios
  		.get('/api/timeTable/get')
  		.then((res) => {
  			this.setState({ isLoading: false, timeTables: res.data });
  			if(this.state.timeTables.length <1) {this.setState({msn:'Warning: Time table missing'});}
  		})
  		.catch((err) => {
  			this.setState({ isLoading: false, timeTables: [] });
  		});
  };  

  unSelectHandler = () => {
  	this.setState({ ...this.state, selected: '' });
  };

  selectTableHandler = (props) => {
  	this.setState({ selected: props });
  };

  selectedTablesRender() {
  	return (
  		<div>
  			<label className='white-text'>
  				<h6>This is your selected Time Table</h6>
  			</label>
  			<label className='white-text'>Click "UNSELECT" to return or Click "POST" to complete</label>
  			<div className="card #01579b light-blue darken-6 white-text container">
  				<div style={{ padding: '5px', marginLeft: '10px', fontSize: '18px' }}>
  					{this.state.selected.name}
  				</div>
  				<div>
  					<div className="center">
  						<i className="material-icons small">
                schedule
  						</i>
  					</div>
  					<div style={{
  						border: '2px solid white',
  						borderRadius: '5px 5px 5px 5px',
  						fontSize: '18px',
  						textAlign: 'center',
  						padding:'5px',
  						width: '100%',
  						color: '#01579b',
  						backgroundColor: 'white',
  						fontWeight:'bold'
              
  					}}>
  						{this.state.selected.times.join(', ')}
  					</div>
  					<div style={{ height: '10px', width: '100%' }}></div>  
  				</div>
  				<button
  					style={{ fontWeight: 'bold' }}
  					className=" #1565c0 blue darken-3 white-text left btn-flat"
  					onClick={this.unSelectHandler}
  				>
            unselect
  				</button>
  				<div style={{ height: '10px', width: '100%' }}></div>
  			</div>
  		</div>
  	);
  }

  timeTablesRender() {
  	// Tables render
  	let tables = <Spinner />;
  	if (!this.state.isLoading) {
  		tables = (
  			<div>
  				<label className='white-text'>
  					<h6>My TimeTables</h6>
  					<Link to="/timetables/create">
  						<h6 style={{ color: 'yellow' }}>Want to create more time tables?</h6>
  					</Link>
  				</label>
  				<div style={{ height: '20px', width: '100%' }}></div>
  				<label className='white-text'>Select Time Table</label>
  				<TimeTable
  					timeTables={this.state.timeTables}
  					onSelectTable={this.selectTableHandler}
  				/>
  			</div>
  		);
  	}
  	return (
  		<div>
  			<div>{this.state.selected ? this.selectedTablesRender() : null}</div>
  			<div style={{ height: '20px', width: '100%' }}></div>
  			<div>{!this.state.selected ? tables : null}</div>
  		</div>
  	);
  };  

  //SUBMIT - COMPONENT 7
  scrollToTop() {
  	window.scrollTo({
  		top: 0,
  		behavior: 'smooth'
  	});
  }

	postHandler = () => {
		this.setState({ ...this.state, isLoading:true });
  	let currentDate = moment(this.state.startDate);
  	let endDate = moment(this.state.endDate);
  	let newArray = [];
  	while (currentDate <= endDate) {
  		if (currentDate.toString().includes(this.state.Mon) === false &&
        currentDate.toString().includes(this.state.Tue) === false &&
        currentDate.toString().includes(this.state.Wed) === false &&
        currentDate.toString().includes(this.state.Thu) === false &&
        currentDate.toString().includes(this.state.Fri) === false &&
        currentDate.toString().includes(this.state.Sat) === false &&
        currentDate.toString().includes(this.state.Sun) === false) {
  			newArray.push(new Date(currentDate));
  		};
  		currentDate = moment(currentDate).add(1, 'days');
  	};
  	let toLocaleArray = [];
  	newArray.forEach(el => {
  		toLocaleArray.push(moment(new Date(el)).format('YYYY-MM-DD[T00:00:00.000Z]'));
  	});
   
  	const dataPost = {
  		toLocaleArray,
  		times: this.state.selected,
  		specialty: this.state.specialty,
  		openView: this.state.openView,
			staffID: this.state.staffID,
			staff:this.state.staff
  	}; 
  	axios.post('/api/calendar/post', dataPost)
  		.then(res => {
  			this.setState({ ...this.state, msn: res.data, isLoading:false });
  		})
  		.catch(err => {
  			this.setState({ ...this.state, msn: 'There was an error, please try again later!'});
  		});
  	this.setState({ ...this.state, startDate: '', staff:'', endDate: '', specialty:'' });
  	this.scrollToTop();
  	document.getElementById('specialty').value = document.getElementById('specialty').defaultValue;
	};

	submitButtonRender() {
  	return (
			<div>
				<div className="center">{this.state.isLoading ? <Spinner /> : null}</div>
  			<Button variant="info" style={{ width: '100%', height: '50px', fontSize: '18px' }}
  				disabled={
  					!this.state.specialty ||
            !this.state.selected ||
            !this.state.startDate ||
            !this.state.staffID ||
            !this.state.endDate ||
            this.state.endDate < this.state.startDate
  				}
  				onClick={this.postHandler}
  			>
          POST<i style={{ paddingLeft: '5px' }} className="material-icons">check</i>
  			</Button>
  		</div>
  	);
	}

	callDeleteRender() {
		return (
			<div>
				<div style={{color:'white', textDecoration:'underline', fontSize:'18px'}} onClick={this.show}>Do you want to delete calendar for this range date?</div> 
			</div>
		);
	}



	render() {
  	return (
  		<div
  			className="container"
  			style={{ marginTop: '77px',  minWidth: '320px', maxWidth: '380px', minHeight:'900px'}}
  		><div
  				style={{ width: '100%', height:'20px' }}
  			></div>
  			<div className="center">
  				{this.state.msn ?
  					<Alert variant="warning " id='msn' onClick={this.hideMsn} style={{ marginBottom: '20px', fontSize: '18px' }}>
  						<Alert.Heading>
  							{this.state.msn}
  						</Alert.Heading>
  					</Alert> : null
  				}
				</div>

  			<label style={{color:'white'}}>
  				<h6>Lets Build your working dates&times Calendar?</h6>
				</label>
  			<div>{this.specialtyRender()}</div>
  			<div style={{ height: '20px', width: '100%' }}></div>
  			<div>{this.state.specialty ? this.staffRender() : null}</div>
  			<div style={{ height: '20px', width: '100%' }}></div>
  			<div>{this.state.staffID ? this.RangeDatepickerRender():null}</div>
				<div style={{ height: '20px', width: '100%' }}></div>
  			<div>{this.state.endDate ? this.renderWeekdays() : null}</div>
  			<div style={{ height: '20px', width: '100%' }}></div>
  			{this.state.endDate ? this.timeTablesRender() : null}
  			<div style={{ height: '5px', width: '100%' }}></div>
  			{this.state.selected && this.state.show? this.submitButtonRender() : null}
				<div style={{ height: '30px', width: '100%' }}></div>
				{this.state.show && this.state.selected ? this.callDeleteRender()
					: null}
				{!this.state.show ? this.deleteCalendarRender() : null}
  			<div style={{ height: '100px', width: '100%' }}></div>
  		</div>
  	);
	}
}

const mapStateToProps = state => {
	return {
		existingDates: state.booking.existingDates,
		assignedSpecialties:state.booking.assignedSpecialties,
		staffAssignments:state.booking.staffAssignments
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onFetchDates: () => dispatch(actions.fetchDates()),
		onfetchStaffAssignments: () => dispatch(actions.fetchStaffAssignments()),
	};
};  

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
