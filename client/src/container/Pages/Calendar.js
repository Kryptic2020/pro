import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import CreateIcon from '@material-ui/icons/Create';
import TextareaAutosize from 'react-textarea-autosize';

class Calendar extends Component {
  state = {
  	date: null,
  	Tdate: '',
  	timeTables: [],
  	selected: [],
  	isLoading: false,
  	startDate: null, //
  	todayDate: null, //
  	endDate: null,
  	TstartDate: '',
  	msn: '',
  	data: [],
  	specialty: '', //
  	waitingList: [],
  	staffID: '', //
  	show: true, //
  	modalShow: false, //
  	show2: true, //
  	modal2Show: false, //
  	show3: true, //
  	modal3Show: false, //
  	comments: '', //
  	cardID: '', //
  	showConfirmDelButton: false,
  	cancelBooking: '',
  	waitingListId: '',
  	testeName:'',
  };

  scrollToTop() {
  	window.scrollTo({
  		top: 0,
  		behavior: 'smooth',
  	});
  }

  showConfirmDelButtonHandler = () => {
  	this.setState({ showConfirmDelButton: true });
  };


  handleModal3Show = (_id, comments) => {
  	this.setState({ modal3Show: true, cardID: _id, comments });
  };

  handleModal3Close = () => {
  	this.setState({
  		modal3Show: false,
  		showConfirmDelButton: false,
  		cardID: '',
  	});
  };
  componentDidMount() {
  	this.props.onFetchDates();
  	this.props.onfetchStaffAssignments();
  	this.auto1SelectHandler();
  	this.scrollToTop();
  }

  // SPECIALTY - COMPONENT 1
  specialtyChangeHandler = (event) => {
  	this.setState({
  		...this.state,
  		specialty: event.target.value,
  	});
  };

  // STAFF - COMPONENT 2
  staffHandleChange = async (event) => {
  	this.setState({ ...this.state, staffID: event.target.value });
  };
  staffRender() {
  	let spec = [];
  	this.props.staffAssignments.map((m) => {
  		if (m.assignedSpecialty.includes(this.state.specialty)) spec.push(m);
  	});
  	const option = spec.map((y) => (
  		<option key={y.staffID} value={y.staffID}>
  			{y.staff}
  		</option>
  	));
  	return (
  		<div>
  			<FormControl style={{ width: '100%' }} variant="outlined">
  				<label style={{ width: '120px', fontSize: '15px', color: 'white' }}>
            Staff
  				</label>
  				<Select
  					style={{
  						height: '50px',
  						width: '100%',
  						color: '#01579b',
  						fontSize: '18px',
  						backgroundColor: 'white',
  					}}
  					native
  					//value={this.state.staff}
  					onChange={(event) => this.staffHandleChange(event)}
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

  viewHandler = async () => {
  	this.setState({ ...this.state, isLoading: true });
  	const dataPost = {
  		startDate: moment(new Date(this.state.startDate)).format(
  			'YYYY-MM-DD[T00:00:00.000Z]'
  		),
  		endDate: moment(new Date(this.state.endDate)).format(
  			'YYYY-MM-DD[T00:00:00.000Z]'
  		),
  		specialty: this.state.specialty,
  		staffID: this.state.staffID,
  	};
  	await Axios.post('/api/calendar/bydates', dataPost)
  		.then((res) => {
  			this.setState({ ...this.state, data: res.data, isLoading: false });
  			if (res.data.length < 1) {
  				this.setState({
  					...this.state,
  					msn: 'Nothing to be displayed for that date!',
  				});
  			}
  		})
  		.catch((err) => {
  			this.setState({
  				...this.state,
  				msn: 'There was an error, please try again later!',
  			});
  		});
  };

  WaitingListHandler = async () => {
  	this.setState({ ...this.state, isLoading: true });
  	await Axios.get('/api/booking/waitinglist/get')
  		.then((res) => {
  			this.setState({
  				...this.state,
  				waitingList: res.data,
  				isLoading: false,
  			});
  			if (res.data.length < 1) {
  				this.setState({ ...this.state, msn: 'Waiting list is empty!' });
  			}
  		})
  		.catch((err) => {
  			this.setState({
  				...this.state,
  				msn: 'There was an error, please try again later!',
  			});
  		});
  };

  hideMsn = () => {
  	this.setState({ ...this.state, msn: '' });
  };

  renderFilter() {
  	const option = this.props.assignedSpecialties.map((x, index) => (
  		<option key={index} value={x}>
  			{x}
  		</option>
  	));
  	const service = (
  		<div>
  			<label style={{ width: '120px', fontSize: '15px', color: 'white' }}>
          Specialty
  			</label>
  			<FormControl style={{ width: '100%' }} variant="outlined">
  				<Select
  					style={{
  						height: '50px',
  						fontSize: '18px',
  						fontWeight: 'bold',
  						color: '#01579b',
  						backgroundColor: 'white',
  					}}
  					native
  					//value={this.state.specialty}
  					onChange={this.specialtyChangeHandler}
  					inputProps={{
  						name: 'Specialty',
  						id: 'Specialty',
  					}}
  				>
  					<option aria-label="None" value="" />
  					{option}
  				</Select>
  			</FormControl>
  		</div>
  	);
  	const viewButton = (
  		<Button
  			variant="info"
  			style={{ width: '100%', height: '40px', fontSize: '18px' }}
  			disabled={!this.state.specialty || !this.state.startDate}
  			onClick={this.viewHandler}
  		>
        View
  			<i style={{ paddingLeft: '5px' }} className="material-icons">
          check
  			</i>
  		</Button>
  	);

  	const WaitingListButton = (
  		<button
  			style={{ width: '100%', height: '40px', fontSize: '18px' }}
  			className="blue white-text btn-flat"
  			onClick={this.WaitingListHandler}
  		>
        Waiting List Check
  			<i style={{ paddingLeft: '5px' }} className="material-icons"></i>
  		</button>
  	);
  	const F = (
  		<div>
  			<h5 className="center">
  				{this.state.msn ? (
  					<Alert
  						variant="warning "
  						id="msn"
  						onClick={this.hideMsn}
  						style={{ marginBottom: '20px', fontSize: '18px' }}
  					>
  						<Alert.Heading>{this.state.msn}</Alert.Heading>
  					</Alert>
  				) : null}
  			</h5>
  			<label style={{ color: 'white' }}>
  				<h6>Lets check the Calendar&Bookings status?</h6>
  			</label>
  			<div>{service}</div>
  			<div style={{ height: '20px', width: '100%' }}></div>
  			<div>{this.state.specialty ? this.staffRender() : null}</div>
  			<div style={{ height: '20px', width: '100%' }}></div>
  			<div>{this.state.specialty ? this.RangeDatepickerRender() : null}</div>
  			<div style={{ height: '80px', width: '100%' }}></div>
  			{viewButton}
  			<div style={{ height: '30px', width: '100%' }}></div>
  			{WaitingListButton}
  			<div style={{ height: '20px', width: '100%' }}></div>
  		</div>
  	);
  	return <div>{F}</div>;
  }

  //  Calendar View handler  - Today
  auto1SelectHandler = async () => {
  	this.setState({ ...this.state, isLoading: true });
  	const dataToday = {
  		date: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
  	};
  	await Axios.post('/api/calendar/from-today', dataToday)
  		.then((res) => {
  			this.setState({ ...this.state, data: res.data, isLoading: false });
  			if (res.data.length < 1) {
  				this.setState({ ...this.state, msn: 'Auto view not available' });
  			}
  		})
  		.catch((err) => {
  			this.setState({
  				...this.state,
  				msn: 'There was an error, please try again later!',
  			});
  		});
  };

  setStartDate = (date) => {
  	this.setState({ startDate: date });
  };

  setEndDate = (date) => {
  	this.setState({ endDate: date });
  };

  //RangeDatepicker Object
  RangeDatepickerRender() {
  	const CustomInput1 = ({ value, onClick }) => (
  		<span>
  			<button
  				style={{
  					width: '100%',
  					height: '50px',
  					fontSize: '15px',
  					fontWeight: 'bold',
  					color: '#01579b',
  					backgroundColor: 'white',
  					borderRadius: '5px 5px 5px 5px',
  				}}
  				onClick={onClick}
  			>
  				<span style={{ paddingLeft: '8px' }}>{value}</span>
  			</button>
  		</span>
  	);
  	return (
  		<div>
  			<label style={{ width: '100%', fontSize: '15px', color: 'white' }}>
  				<span style={{ width: '45%' }} className="left">
            Start Date
  				</span>
  				<span className="right" style={{ width: '45%' }}>
            End Date
  				</span>
  			</label>
  			<div style={{ width: '100%' }}>
  				<span className="left" style={{ width: '45%' }}>
  					<DatePicker
  						style={{ width: '30%' }}
  						selected={this.state.startDate}
  						//selected={new Date()}
  						onChange={(date) => this.setStartDate(date)}
  						preventDefault={this.props.withPortal}
  						withPortal
  						dateFormat="dd/MM/yyyy"
  						customInput={<CustomInput1 />}
  					/>
  				</span>
  				<span className="right" style={{ width: '45%' }}>
  					<DatePicker
  						selected={this.state.endDate}
  						onChange={(date) => this.setEndDate(date)}
  						preventDefault={this.props.withPortal}
  						withPortal
  						dateFormat="dd/MM/yyyy"
  						customInput={<CustomInput1 />}
  					/>
  				</span>
  			</div>
  		</div>
  	);
  }

  // BOOKING STATUS RENDER - COMPONENT 2
  openCloseViewHandler = (id, openView) => {
  	const viewUpdate = {
  		_id: id,
  		openView: openView,
  	};
  	Axios.post('/api/calendar/update/opencloseview', viewUpdate).then((res) => {
  		this.viewHandler();
  	});
  };

  clearDataHandler = () => {
  	this.setState({ ...this.state, data: [] });
  	this.setState({
  		...this.state,
  		data: '',
  		startDate: '',
  		endDate: '',
  		selectedService: '',
  	});
  };

  inputChangeHandler = (event) => {
  	this.setState({ ...this.state, comments: event.target.value });
  };
  commentsSaveHandler = async () => {
  	const id = { _id: this.state.cardID, comments: this.state.comments };
  	this.setState({ isLoading: true });
  	await Axios.post('api/calendar/comments/update', id);
  	this.viewHandler();
  	this.handleModal3Close();
  	this.setState({ isLoading: false });
  };

  commentsDelHandler = async () => {
  	this.setState({ isLoading: true });
  	const id = { _id: this.state.cardID };
  	this.handleModal3Close();
  	await Axios.post('api/calendar/comments/delete', id);
  	this.viewHandler();
  	this.handleModal3Close();
  	this.setState({ isLoading: false });
  };

  // CANCEL BOOKING -  COMPONENT
  handleModal2Show = (_id, specialty, date, time, service, bookedByName) => {
  	const cancelBooking = { _id, specialty, date, time, service,bookedByName };
  	this.setState({ ...this.state, modal2Show: true, cancelBooking, testeName:bookedByName });
  	console.log(cancelBooking);
  };

  handleModal2Close = () => {
  	this.setState({ ...this.state, modal2Show: false, cancelBooking: '' });
  };

  cancelBookingHandler = async () => {
  	const data = this.state.cancelBooking;
  	await Axios.post('/api/booking/cancel', data)
  		.then((res) => {
  			//console.log(res.data);
  			this.viewHandler();
  		})
  		.catch((err) => {
  			//console.log(err);
  		});
  	this.handleModal2Close();
  };

  cancelBookingModalRender() {
  	return (
  		<div>
  			<Modal show={this.state.modal2Show} onHide={this.handleModal2Close}>
  				<Modal.Header closeButton>
  					<Modal.Title>Cancel Boooking</Modal.Title>
  				</Modal.Header>
  				<Modal.Body>
						You're trying to Cancel {this.state.cancelBooking.bookedByName}'s Booking, are you sure?
  					<p>{this.state.cancelBooking.bookedByName}</p>
  					<p>{this.state.cancelBooking._id}</p>
  					<p>{this.state.cancelBooking.specialty}</p>
  					<p>{this.state.cancelBooking.date}</p>
  					<p>{this.state.cancelBooking.time}</p>
  					<p>{this.state.cancelBooking.service}</p>
						
  				</Modal.Body>
  				<Modal.Footer>
  					<span className="left">
  						<Button variant="secondary" onClick={this.handleModal2Close}>
                Close
  						</Button>
  					</span>
  					<span>
  						<Button
  							className="right"
  							variant="danger"
  							onClick={this.cancelBookingHandler}
  						>
                confirm cancellation
  						</Button>
  					</span>
  				</Modal.Footer>
  			</Modal>
  		</div>
  	);
  }

  renderBookingStatus() {
  	function compareDate(a, b) {
  		if (a.date < b.date) {
  			return -1;
  		}
  		if (a.date > b.date) {
  			return 1;
  		}
  		return 0;
  	}
  	function compareTime(a, b) {
  		if (a.time < b.time) {
  			return -1;
  		}
  		if (a.time > b.time) {
  			return 1;
  		}
  		return 0;
  	}
  	const u = this.state.data.sort(compareTime);
  	const s = u.sort(compareDate);

  	const T = s.map((d) => (
  		<div key={d._id}>
  			<div
  				style={{ marginBottom: '0px' }}
  				className={
  					d.isBooked
  						? 'card green white-text container'
  						: null || (d.openView && !d.isBooked)
  							? 'card white black-text container'
  							: 'card #757575 grey darken-1 white-text container'
  					//!d.isBooked && d.openView ? 'card #757575 grey darken-1 white-text container' : null
  				}
  			>
  				<div style={{ fontSize: '12px' }}>
  					<div>
  						{new Date(d.date).toLocaleDateString('en-GB', {
  							year: 'numeric',
  							month: 'numeric',
  							day: 'numeric',
  						})}{' '}
              - {d.time} {!d.isBooked && d.openView ? '- Available' : null}
  						{!d.isBooked && this.state.specialty ? (
  							<button
  								style={{
  									width: '70px',
  									marginTop: '2px',
  									height: '20px',
  									paddingBottom: '6px',
  									fontSize: '10px',
  									textAlign: 'center',
  								}}
  								className={
  									' #0288d1 light-blue darken-2 white-text small right btn-flat'
  								}
  								onClick={() => this.openCloseViewHandler(d._id, d.openView)}
  							>
  								<span
  									style={{
  										position: 'absolute',
  										marginLeft: '-30px',
  										marginTop: '-15px',
  									}}
  								>
                    Open/Close
  								</span>
  							</button>
  						) : null}
  						{d.isBooked && this.state.specialty ? (
  							<div>
  								<button
  									style={{
  										width: '70px',
  										marginTop: '-15px',
  										height: '20px',
  										paddingBottom: '6px',
  										fontSize: '10px',
  										textAlign: 'center',
  									}}
  									className={
  										' #0288d1 light-blue darken-2 white-text small right btn-flat'
  									}
  									onClick={() =>
  										this.handleModal2Show(d._id,d.specialty, d.date, d.time, d.service,d.bookedByName)
  									}
  								>
  									<span
  										style={{
  											position: 'absolute',
  											marginLeft: '-20px',
  											marginTop: '-15px',
  										}}
  									>
                      Cancel
  									</span>
  								</button>
  							</div>
  						) : null}
  					</div>
  					<div style={{ fontSize: '12px' }}>
  						{d.specialty} - {d.staff}{' '}
  						{!d.openView ? (
  							<span
  								style={{
  									paddingLeft: '10px',
  									color: 'white',
  									textAlign: 'center',
  									fontStyle: 'italic',
  								}}
  							>
  								{' '}
                  " Not Visible to Clients "
  							</span>
  						) : null}{' '}
  						{d.service}
  					</div>
  					<div style={{ fontSize: '11px' }}>
  						<span style={{ color: 'yellow', fontSize: '12px' }}>
  							{d.isBooked
  								? d.bookedByName + ' - ' + '0' + d.contactNumber
  								: null}
  						</span>
  					</div>
  					<div>
  						{this.state.specialty ? (
  							<CreateIcon
  								onClick={() => this.handleModal3Show(d._id, d.comments)}
  							/>
  						) : null}
  						<span style={{ paddingLeft: '10px', fontStyle: 'italic' }}>
  							{d.comments}
  						</span>
  					</div>
  				</div>
  			</div>
  		</div>
  	));
  	return (
  		<div>
  			<Button
  				variant="warning"
  				style={{ width: '100%', height: '40px' }}
  				onClick={this.clearDataHandler}
  			>
          back
  			</Button>
  			<div>
  				<div style={{ width: '100%', height: '10px' }}></div>
  				<label style={{ color: 'white', fontSize: '18px' }}>
  					<p>Calendar List</p>
  				</label>
  			</div>
  			<div
  				style={{
  					overflowY: 'scroll',
  					padding: '10px',
  					minHeight: '200px',
  					maxHeight: '500px',
  					border: '1px solid grey',
  					borderRadius: '5px',
  					backgroundColor: 'white',
  				}}
  			>
  				{T}
  			</div>
  		</div>
  	);
  }

  // MODAL COMMENTS - COMPONENT

  modalCommentsRender() {
  	return (
  		<div>
  			<Modal show={this.state.modal3Show} onHide={this.handleModal3Close}>
  				<Modal.Header>
  					<Modal.Title>Comments</Modal.Title>
  				</Modal.Header>
  				<Modal.Body>
  					<div>
  						<TextareaAutosize
  							autoFocus
  							style={{
  								fontSize: '20px',
  								height: '50px',
  								textAlign: 'center',
  								color: 'black',
  								backgroundColor: 'white',
  								border: 'none',
  							}}
  							//label="Title"
  							type="text"
  							value={this.state.comments}
  							onChange={this.inputChangeHandler}
  						></TextareaAutosize>
  					</div>
  				</Modal.Body>
  				<Modal.Footer>
  					<span className="left">
  						<Button variant="secondary" onClick={this.handleModal3Close}>
                Close
  						</Button>
  					</span>
  					<span className="left">
  						{!this.state.showConfirmDelButton ? (
  							<Button variant="info" onClick={this.commentsSaveHandler}>
                  Save
  							</Button>
  						) : null}
  					</span>
  					<span>
  						{!this.state.showConfirmDelButton ? (
  							<Button
  								className="right"
  								variant="danger"
  								onClick={this.showConfirmDelButtonHandler}
  							>
                  delete
  							</Button>
  						) : null}
  						{this.state.showConfirmDelButton ? (
  							<Button
  								className="right"
  								variant="danger"
  								onClick={this.commentsDelHandler}
  							>
                  Confirm delete
  							</Button>
  						) : null}
  					</span>
  				</Modal.Footer>
  			</Modal>
  		</div>
  	);
  }

  // WAITING - COMPONENT 3
	WaitingListDeleteHandler = () => {
		this.setState({ isLoading: true });
  	const value = { _id:this.state.waitingListId };
  	Axios.post('/api/booking/waitinglist/delete', value)
  		.then((res) => {})
  		.catch((err) => {
  			this.setState({
  				...this.state,
  				msn: 'There was an error, please try again later!',
  			});
  		});
  	this.setState({ ...this.state, waitingList: [], isLoading:false });
  	this.WaitingListHandler();
  	this.handleModalClose();
	};

  clearWaitingListDataHandler = () => {
  	this.setState({ ...this.state, waitingList: [] });
  };
  
	//MODAL DELETE WAITINGLIST - COMPONENT
	handleModalShow = (waitingListId) => {
  	this.setState({ modalShow: true, waitingListId });
	};

  handleModalClose = () => {
  	this.setState({ modalShow: false,waitingListId:'' });
  };

  modalDelWaitinglistRender() {
  	return (
  		<div>
				  						<Modal show={this.state.modalShow} onHide={this.handleModalClose}>
  							<Modal.Header closeButton>
  								<Modal.Title>Delete Wainting List Request</Modal.Title>
  							</Modal.Header>
  							<Modal.Body>
                  You're trying to delete this Wainting List Request, are you
                  sure?!
  							</Modal.Body>
  							<Modal.Footer>
  								<span className="left">
  									<Button variant="secondary" onClick={this.handleModalClose}>
                      Close
  									</Button>
  								</span>
  								<span>
  									<Button
  										className="right"
  										variant="danger"
  										onClick={this.WaitingListDeleteHandler}
  									>
                      delete
  									</Button>
  								</span>
  							</Modal.Footer>
  						</Modal>
  		</div>
  	);
  }

  renderWaitingList() {
  	const G = (
  		<div>
  			<div style={{ width: '100%', height: '10px' }}></div>
  			<label style={{ color: 'white', fontSize: '18px' }}>
  				<p>Waiting List</p>
  			</label>
  		</div>
  	);

  	const T = this.state.waitingList.map((w) => (
  		<div key={w._id}>
  			<div
  				style={{ backgroundColor: '#032641' }}
  				className="card white-text container"
  			>
  				<div
  					style={{
  						padding: '5px 5px 15px 5px',
  						marginLeft: '10px',
  						fontSize: '18px',
  					}}
  				>
  					<div>
  						<span style={{ width: '250px' }}>
  							{new Date(w.date).toLocaleDateString('en-GB', {
  								year: 'numeric',
  								month: 'numeric',
  								day: 'numeric',
  							})}
  						</span>
  						<span className="right">{w.time}</span>
  					</div>
  					<div style={{ fontSize: '15px' }}>
  						<span style={{ width: '250px' }}>
  							{w.staff} / {w.specialty} / {w.service}
  						</span>
  					</div>
  					<div style={{ fontSize: '15px' }}>
  						<span style={{ width: '250px' }}>{w.fullName}</span>
  						<span style={{ marginLeft: '100px' }}>0{w.phone}</span>
  						<div>{w.message}</div>
  					</div>
  					<div style={{ width: '100%', height: '10px' }}></div>
  					<div>
  						<Link
  							to={{
  								pathname: '/bookingAdm',
  								id: w.userID,
  								fullName: w.fullName,
  							}}
  						>
  							<Button variant="info" className=" right">
                  Book
  							</Button>
  							<Link
  								style={{ marginLeft: '15px' }}
  								to={{ pathname: '/profile', state: { _id: w.userID } }}
  							>
  								<Button variant="secondary">Profile</Button>
  							</Link>
  						</Link>
  						<Button
  							variant="danger"
  							onClick={()=>this.handleModalShow(w._id)}
  							className="left"
  						>
                Delete
  						</Button>

  					</div>
  				</div>
  			</div>
  		</div>
  	));
  	return (
  		<div>
  			<div>
  				{this.state.waitingList.length > 0 ? (
  					<Button
  						variant="warning"
  						style={{ width: '100%', height: '40px' }}
  						onClick={this.clearWaitingListDataHandler}
  					>
              back
  					</Button>
  				) : null}
  			</div>
  			<div>{this.state.waitingList.length > 0 ? G : null}</div>
  			<div style={{ overflowY: 'scroll', maxHeight: '500px' }}>{T}</div>
  		</div>
  	);
  }

  render() {
  	return (
  		<div
  			className="container"
  			style={{ minWidth: '320px', maxWidth: '380px', marginTop: '77px' }}
  		>
  			<div style={{ width: '100%', height: '20px' }}></div>
  			<div className="center">
  				{this.state.isLoading ? <Spinner /> : null}
  			</div>
  			<div>
  				{this.state.data.length < 1 && this.state.waitingList < 1
  					? this.renderFilter()
  					: null}
  			</div>
  			<div>
  				{this.state.cancelBooking ? this.cancelBookingModalRender() : null}
  			</div>
  			<div>
  				{this.state.data.length > 0 &&
          !this.state.cardID &&
          !this.state.cancelBooking
  					? this.renderBookingStatus()
  					: null}
  			</div>
  			<div>{this.state.cardID ? this.modalCommentsRender() : null}</div>
  			<div>{ this.state.waitingListId ? this.modalDelWaitinglistRender():null}</div>
  			<div>{!this.state.waitingListId ? this.renderWaitingList() : null}</div>
  			<div style={{ width: '100%', height: '60px' }}></div>
  		</div>
  	);
  }
}

const mapStateToProps = (state) => {
	return {
		existingDates: state.booking.existingDates,
		assignedSpecialties: state.booking.assignedSpecialties,
		staffAssignments: state.booking.staffAssignments,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onFetchDates: () => dispatch(actions.fetchDates()),
		onfetchStaffAssignments: () => dispatch(actions.fetchStaffAssignments()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
