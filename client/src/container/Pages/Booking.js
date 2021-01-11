import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';
import * as actions from '../../store/actions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { withStyles } from '@material-ui/core/styles';
//import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import WorkIcon from '@material-ui/icons/Work';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Spinner from '../../components/UI/Spinner/Spinner';
//import { enGB } from 'date-fns/esm/locale';
import moment from 'moment';
import { parseISO, addDays, subDays } from 'date-fns';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Modal from 'react-bootstrap/Modal';
import CreateIcon from '@material-ui/icons/Create';
//import Select2 from 'react-select2-wrapper';

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
  	staffID: '', //
  	staff:'',
  	selection: [], //
  	msn: '',//
  	dateOfremainingSpots: [],//
  	timeOfremainingSpots: [],//
  	service: '', //
  	serviceName:'',//
  	appointment: '',//
  	specialty: '', //
  	price: '',//
  	isEnglish: true, //
  	isLoading: false,//
  	disabled: false,//
  	textToCopy: '50 Mclachlan st, Fortitude Valley, 4006',//
  	daysCalendarView: '',
  	assignmentID: '',
  	modalShow: false,
  	serviceDetails:'',
  };

  componentDidMount() {
  	this.props.onfetchServicesPrices();
  	this.props.onfetchStaffAssignments();
  	this.scrollToTop();
  	
  };
	
	handleModalShow = () => {
		this.setState({ modalShow: true });
	}

	handleModalClose = () => {
		this.setState({ modalShow: false });
	} 

	hideMsn = () => {
	/*	if (this.state.msn === 'Phone Missing! Click Here To Fix') { this.props.history.push({ pathname:'/profile', state: { _id: this.props.auth._id } });	}*/
  	this.setState({ ...this.state, msn: '' });
	}

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

		const _id = { _id: event.target.value };

		this.setState({ ...this.state, isLoading: true, staffID: event.target.value,assignmentID });

		const e = { staffID: event.target.value, specialty: this.state.specialty, today:moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]') }; 

		Axios.post('/api/booking/remainingspots', e).then((res) => {

			//console.log(res.data);

			this.setState({ ...this.state, timeOfremainingSpots: res.data });
		
			if (res.data.length < 1) { this.setState({ ...this.state, msn: 'This staff is not available, but you can still do a Waiting List Request', isLoading: false }); }

			let n = [];
			let z = [];
  		res.data.map((profile) => {
				n.push(parseISO(profile.date));
			});
			
			Axios.post('/api/auth/daysCalendarView', _id).then(res => {
			  const	days = res.data.days;
				n.map((D) => {
					if (D < (addDays(new Date(), days)) && D > subDays(new Date(), 1) ) { z.push(D);};
  			  this.setState({ ...this.state, dateOfremainingSpots: z, isLoading:false });	
				});
			});
			
		});
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



	//Service  - COMPONENT 3
	serviceHandler = async (event) => {
		const s = event.target.value.split(',');
		const second = event.target.value.split(',');
		second.shift(); 
		
		
  	this.setState({
  		service: s[0], isLoading:true, serviceDetails:second.join(',')
  	}); 
		
  	await this.props.servicesPrices.map((x) => { if (x.name === s[0]) { this.setState({ price: x.price, serviceName: x.name }); } });
  	this.setState({
  		isLoading:false
  	});
  	this.props.staffAssignments.map((m) => {
  		if (m.staffID.includes(this.state.staffID)) { this.setState({ ...this.state, staff: m.staff }); }
  	});
		
	};
  
	serviceRender() {
  	let spec = [];
		this.props.servicesPrices.map((m) => { if (m.assignmentID === this.state.assignmentID) { spec.push([m.name, m.serviceDetails]); } });
		const option = spec.map((y, index) => (<option key={index} value={y}>{y[0]}</option>));
  	return (
  		<div >
				<label style={{ width: '100%', fontSize: '15px', color: 'white' }}>Service {this.state.service ? <HelpOutlineIcon onClick={this.handleModalShow} /> : null}</label>
				<Modal show={this.state.modalShow} onHide={this.handleModalShow}>
					<Modal.Header closeButton>
						<Modal.Title>{this.state.service}</Modal.Title>
					</Modal.Header>
					<Modal.Body>{this.state.serviceDetails}</Modal.Body>
					<Modal.Footer>
						<span className="left">
							<Button  variant="secondary" onClick={this.handleModalClose}>
								Close
							</Button></span>
					</Modal.Footer>
				</Modal>
  			<div>
  				<FormControl  style={{width:'100%'}} variant="outlined">
  					<Select 
  						style={{height:'50px', maxWidth: '70%', fontSize: '18px', color: '#01579b', backgroundColor: 'white' }}
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

	//Datepicker  - COMPONENT 4
	scrollToTop() {
  	window.scrollTo({
  		top: 0,
  		behavior: 'smooth'
  	});
	}

  setDate = (date) => {
  	this.setState({ date });
  };

	datepickerHandler = (date) => {
		
  	this.setState({date});
  	const e = new Date(date)
  			.toLocaleDateString('es-ES', {
  				year: 'numeric',
  				month: 'numeric',
  				day: 'numeric',
  			});
		//console.log(e, new Date());
  	let timeArray = [];
  	if (new Date()
  			.toLocaleDateString('es-ES', {
  				year: 'numeric',
  				month: 'numeric',
  				day: 'numeric',
  			}) === e) {
			this.state.timeOfremainingSpots.sort().map((profile) => {
  		  if (parseISO(profile.date).toLocaleDateString('es-ES', {
  				year: 'numeric',
  				month: 'numeric',
  				day: 'numeric',
  			}) === e) {
  			  if (!profile.isBooked && profile.specialty === this.state.specialty) {
  				  if (profile.time.substring(0, 2) > new Date().getHours()) timeArray.push(profile.time);
  			  }
  		  }
  		}); if(timeArray.length<1) {this.scrollToTop();this.setState({msn:'Ops, I am sorry, Its fully booked for today', appointment: '', staff:'', staffID:'', specialty: '', date: '', selection:[], serviceName:'', price:''});document.getElementById('specialty').value = document.getElementById('specialty').defaultValue;}
  	} else {
  		this.state.timeOfremainingSpots.sort().map((profile) => {
  		if (parseISO(profile.date).toLocaleDateString('es-ES', {
  				year: 'numeric',
  				month: 'numeric',
  				day: 'numeric',
  			}) === e) {
  			if (!profile.isBooked && profile.specialty === this.state.specialty) {
						timeArray.push(profile.time);
						//console.log(profile.time.substring(0, 2), new Date().getHours());
  			}
  		}
  	});
  	};
  	
		

  	//P.time.substring(0, 2) > new Date().getHours()+2
  	this.setState({ selection: timeArray });
	}; 
	
	datepickerRender() {
  	const CustomInput = ({ value, onClick }) => (
  		<button className='left' style={{ width: '100%', height: '50px', fontSize: '18px', color: '#01579b', backgroundColor: 'white', borderRadius: '5px 5px 5px 5px' }} onClick={onClick}>
  			<span style={{ paddingLeft: '8px' }} className='left'>{value}</span>
  		</button>
		);
  	return (
  		<div>
  			<label style={{ width: '120px', fontSize: '15px', color: 'white' }}>Date</label>
  			<div>
  				<DatePicker
  					//style={{ width: '100%', color: '#01579b', fontWeight: "bold", backgroundColor: "white" }}
						selected={this.state.date}
						onChange={(date) => this.datepickerHandler(date)}
						withPortal
						dateFormat="dd/MM/yyyy"
						customInput={<CustomInput />}
						//placeholderText="Select Start Date"
						//openToDate={new Date()}
						//locale={fi}
						//locale={enGB}
						minDate={new Date()}
						//maxDate={addDays(new Date(), this.props.auth.daysCalendarView)}
  					includeDates={this.state.dateOfremainingSpots}
  					highlightDates={this.state.dateOfremainingSpots}
  					//excludeDates={[new Date(), subDays(new Date(), 1)]}
  				/>
  			</div>
  		</div>
      
  	);
	}

	//TIMEPICKER  - COMPONENT 5 
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
  	return (
  		<div>
  			<label style={{ width: '120px', fontSize: '15px', color: 'white' }}>Time</label>
  			<div style={{ width: '220px', backgroundColor: 'white', borderRadius: '5px 5px 5px 5px' }}>
  				<FormControl style={{ width: '100%' }}>
  					<Select
  						style={{ width: '100%', paddingLeft: '15px', height: '50px', color: '#01579b',  fontSize: '18px',backgroundColor: 'white', borderRadius: '10px 10px 10px 10px' }}
  						labelId="demo-controlled-open-select-label"
  						id="demo-controlled-open-select"
  						open={this.state.open}
  						onClose={this.timepickerHandleClose}
  						onOpen={this.timepickerHandleOpen}
  						value={this.state.appointment}
  						onChange={this.timepickerHandler}
  					>
  						{this.state.selection.sort().map((name) => (
  							<MenuItem style={{width: '170px',color: '#01579b',fontSize: '18px', height: '50px'}}
  								key={name}
  								value={name}
  								//style={getStyles(name, personName, theme)}
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

  //Confirm Booking & terms - COMPONENT 6
  toggleHandler = () => {
  	this.setState((prevState) => {
  		return { isEnglish: !prevState.isEnglish };
  	});
  }

  clearBookingHandler = () => {
  	this.setState({ appointment: '', date: '', specialty: '', staffID: '', staff: '', serviceName: '', price: ''});
		
  }

	bookingHandler = async () => {
		this.setState({ ...this.state, isLoading:true });
  	const dataPost = {
  		date: moment(new Date(this.state.date)).format('YYYY-MM-DD[T00:00:00.000Z]')
  		,
  		time: this.state.appointment,
  		specialty: this.state.specialty,
  		service: this.state.serviceName,
			staffID: this.state.staffID,
			staff: this.state.staff,
  		price: this.state.price
  	};
		//console.log(dataPost);
		await Axios.post('/api/booking/new', dataPost)
  		.then((res) => {
  			this.setState({ ...this.state, msn: res.data, isLoading:false });
  		});

		this.setState({ appointment: '', staff: '', staffID: '', specialty: '', date: '', selection: [], serviceName: '', price: '' });
		document.getElementById('specialty').value = document.getElementById('specialty').defaultValue;
	};  

	BookingCardRender() {
  	const PT = (
  		<div>
  			<p><strong>Importante - Leia Tudo:</strong></p>
				<div className="center"><Button 
					variant="secondary"
					
  					style={{width:'200px' , margin:'auto'}}
  					onClick={() => {
  						navigator.clipboard.writeText(this.state.textToCopy);
  					}}
  				>
  					<CreateIcon /> Copy Address
  				</Button></div>
				<p>Address: 50 Mclachlan st, Fortitude Valley, Postal Code 4006.</p><br />
				<p>Atendemos dentro do nosso apartamento e devido a necessidade de organização e problemas ocorridos criei essas regras e dicas para um bom atendimento.</p><br />
				<p>1- Chegue 10 minutos adiantado e avise ao chegar. O atraso Tolerável é de 10 minutos.</p><br />
				<p>2- Aguarde na entrada principal do prédio 50 Mclachlan st.</p><br />
				<p>3- A forma de pagamento aceito é somente em CASH.</p><br />
				<p>4- Em caso de imprevisto e cancelamentos que forem avisados ou feitos com 24h de andecedência, não haverá cobrança. No caso de cancelamento no mesmo dia do horário agendado, falta ou atraso acima da tolerância, será cobrado uma taxa de $10,00 no próximo agendamento pelo horário que ficou vago para compensar e não me prejudicar.
Se você não conseguir cancelar pelo aplicativo me avise via mensagem através dos números:<br /> Thiago: 0410477708<br /> Priscila: 0410645743.<br />5- Se vier de Carro ou moto, temos vaga de visitante no prédio a entrada è pela:
WINN ST, quando chegar avise vila ligação ou mensagem para eu abrir a garagem.
Obrigado e conto com sua presença.</p>
  		</div>
  	);
  	const ENG = (
  		<div>
				<p><strong>Important Read all:</strong></p>
				<div className="center"><Button 
					variant="secondary"
					
  					style={{width:'200px' , margin:'auto'}}
  					onClick={() => {
  						navigator.clipboard.writeText(this.state.textToCopy);
  					}}
  				>
  					<CreateIcon /> Copy Address
  				</Button></div>
				<p>-Address: 50 Mclachlan st, Fortitude Valley, Postal Code 4006.</p><br />
  			<p>We attend our clients inside our apartment and Due to the need for organisation and problems occurred I created these rules and tips for good service.</p><br />
				<p>1- Arrive 10 minutes early and let us know when you arrive. Tolerable delay is 10 minutes.</p><br />
				<p>2- Wait at the main entrance of the 50 Mclachlan st .Building name.</p>
					
				<p>3- The accepted payment method is only CASH .</p><br />
				<p>4- In case of unforeseen and cancellations that were warned or done 24 h before, there will be no charge. In the case of cancellation on the same day of the scheduled time, no show.no came in the day scheduled. or delay above the tolerance will be charged $ 10.00 fee to compensate for the time that was left vacant and not harm me.<br />
If you can not cancel in the app please text me in the numbers:<br />
Thiago: 0410477708<br />
Priscila: 0410645743<br />
to inform.</p><br />
				<p>5- If you come by car or motorcycle, we do have a visitor park and the entry is in WINN ST, when you arrive here let us know via message or call and we will open it to you.
Thank you in advance, I count on your presence.</p>
  		</div >
  	);
  	return (
  		<div>
  			<div
  				style={{ padding: '20px', backgroundColor:'black', fontSize: '15px' }}
         
  				className="card white-text"
  			>
  				<div className="center">
						{/*<img alt="profile" style={{ width: '50px', height: '50px' }} src={this.props.photo} />*/}
  				</div>
  				<div style={{ height: '20px', width: '100%' }}></div>
  				<div >
  					<HowToRegIcon style={{ fontSize: '30px' }} />
  					<span style={{ paddingLeft: '20px', fontSize: '18px' }}>
  						{this.state.staff}
  					</span>
  				</div>
  				<div style={{ height: '10px', width: '100%' }}></div>
  				<div >
  					<WorkIcon style={{ fontSize: '30px' }} />
  					<span style={{ paddingLeft: '20px', fontSize: '18px' }}>
  						{this.state.specialty} / {this.state.serviceName}
  					</span>
  				</div>
  				<div style={{ height: '10px', width: '100%' }}></div>
  				<div >
  					<AttachMoneyIcon style={{ fontSize: '30px' }} />
  					<span style={{ paddingLeft: '20px', fontSize: '18px' }}>
  						{this.state.price}
  					</span>
  				</div>
  				<div style={{ height: '10px', width: '100%' }}></div>
  				<div >
  					<EventAvailableIcon style={{ fontSize: '30px' }} />
  					<span style={{ paddingLeft: '20px', fontSize: '18px' }}>
  						{new Date(this.state.date)
  							.toLocaleDateString('en-GB', {
  								year: 'numeric',
  								month: 'numeric',
  								day: 'numeric',
  							})}
  					</span>
  				</div>
  				<div style={{ height: '10px', width: '100%' }}></div>
  				<div >
  					<AccessTimeIcon style={{ fontSize: '30px' }} />
  					<span style={{ paddingLeft: '20px', fontSize: '18px' }}>
  						{this.state.appointment}
  					</span>
  				</div>
  				<div style={{ height: '20px', width: '100%' }}></div>
  				<div style={{ border: '1px solid gray', borderRadius: '5px' }}>
  					<div style={{ height: '10px', width: '100%' }}></div>
  					<label >
  						<span style={{ width:'70%', marginLeft: '5px' }}>
                Terms&Conditions:
  						</span>
  						<span className="right" style={{width:'25%'}}>
  							<Button onClick={this.toggleHandler} variant='outline-primary' size='sm'>
  								{this.state.isEnglish ? 'Portugues' : 'English'}
  							</Button>
  						</span>
  					</label>
  					<div style={{ overflowY: 'scroll', height: '250px', marginLeft:'5px' }}>
  						{this.state.isEnglish ? ENG : PT}
  					</div>
  				</div>
  				<div style={{ height: '20px', width: '100%' }}></div>
					<div>
						<div className="center">{this.state.isLoading ? <Spinner /> : null}</div>
  					<Button onClick={this.bookingHandler} variant="info" style={{ width: '100%', height:'50px' }}>
              Accept & Book
  					</Button>
  				</div>
  				<div style={{ height: '30px', width: '100%' }}></div>
  				<div>
  					<Button onClick={this.clearBookingHandler} variant="warning" style={{ width: '100%', }}>
              Back
  					</Button>
  				</div>
  			</div>
  		</div>
  	);
	}

 
	render() {
  	const render = (
  		<div>
  			<div>
  				{!this.state.disabled ? this.specialtyRender() : null}
  				<div style={{height:'10px', width:'100%'}}></div>
  				{this.state.specialty && !this.state.disabled ? this.staffRender() : null}
  				<div style={{height:'10px', width:'100%'}}></div>
  				{this.state.staffID ? this.serviceRender() : null}
  				<div style={{ height: '10px', width: '100%' }}></div>
  				{this.state.serviceName ? this.datepickerRender() : null}
  				<div style={{ height: '10px', width: '100%' }}></div>
  				{this.state.date ? this.timepickerRender() : null}
  			</div>
  		</div>
  	);
    
  	return (
  		<div className="container" style={{ marginTop: '77px', minWidth: '320px', maxWidth: '380px' }}>
  			<div style={{ height: '40px', width: '100%' }}></div>
  			<label style={{ color:'white', fontSize:'18px'}}>
					{!this.state.disabled ? 'Let\'s Book your next visit?' : null}
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
				<div className="center">{this.state.isLoading ? <Spinner /> : null}</div>
  			<div>{this.state.appointment ? null : render}</div>
  			<div style={{ height: '20px', width: '100%' }}></div>
  			{this.state.appointment ? this.BookingCardRender() : null}
  			<div style={{ height: '20px', width: '100%' }}></div>
  			<Link to="/booking/mybooking">
  				<button
  					style={{ marginTop: '50px', width: '100%'  }}
  					//disabled={!this.state.appointment || !this.state.date}
  					className="blue white-text btn-flat"
  				>
            got to MY BOOKINGS<i className="material-icons right">arrow_forward</i>
  				</button>
				</Link>
				<div style={{ height: '80px', width: '100%' }}></div>
				{/*<Button className="left" variant="info" onClick={this.props.history.goBack}>Back</Button>*/}
  		</div>
  	);
	}
}

const mapStateToProps = state => {
	return {
		rawData: state.booking.rawData,
		existingDates: state.booking.existingDates,
		openServices: state.booking.openServices,
		services: state.booking.services,
		assignedSpecialties:state.booking.assignedSpecialties,
		servicesPrices: state.booking.servicesPrices,
		staffAssignments: state.booking.staffAssignments,
		photo: state.auth.photo,
		auth:state.auth
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onfetchServicesPrices: () => dispatch(actions.fetchServicesPrices()),
		onfetchStaffAssignments: () => dispatch(actions.fetchStaffAssignments())
	};
};  

export default connect(mapStateToProps,mapDispatchToProps)(
	withStyles(styles, { withTheme: true })(Calendar)
);

