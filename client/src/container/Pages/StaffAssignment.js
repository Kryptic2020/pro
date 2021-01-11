import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
//import Chip from '@material-ui/core/Chip';
//import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import TextareaAutosize from 'react-textarea-autosize';
import Modal from 'react-bootstrap/Modal';

class StaffAssignment extends Component {
  state = {
  	staff: '',
  	staffID: '',
  	msn: '',
  	servicesPricesSelection: [],
  	isLoading: false,
  	specialty: '',
  	startForm: false,
  	assignmentID: '',
  	serviceDetails: '',
  	modalShow: false, //
  	id: '',
  	priceId: '',
  	modal2Show: false, //
  };

  componentDidMount() {
  	this.props.onfetchSpecialties();
  	this.props.onfetchServicesPrices();
  	this.props.onfetchStaffAssignments();
  	this.scrollToTop();
  }

  startFormHandle = () => {
  	this.setState({ startForm: true });
  };

  hideMsn = () => {
  	this.setState({ ...this.state, msn: '' });
  };

  reset = () => {
  	document.getElementById('category').value = document.getElementById(
  		'category'
  	).defaultValue;
  };

  // Staff - Component 1
  staffHandleChange = (event) => {
  	const x = event.target.value;
  	const z = x.split(',');
  	this.setState({
  		...this.state,
  		staff: z[1],
  		staffID: z[0],
  		msn: '',
  	});
  };

  staffRender() {
  	const option = this.props.users.map((m) =>
  		m.isAdmin ? (
  			<option key={m.fullName} value={[m._id, m.fullName]}>
  				{m.fullName}
  			</option>
  		) : null
  	);
  	return (
  		<div>
  			<FormControl
  				style={{ width: '100%', marginBottom: '40px' }}
  				variant="outlined"
  			>
  				<label style={{ width: '120px', fontSize: '15px', color: 'white' }}>
            Assign Staff
  				</label>
  				<Select
  					style={{
  						minHeight: '50px',
  						borderRadius: '4px',
  						color: '#01579b',
  						fontSize: '18px',
  						backgroundColor: 'white',
  					}}
  					native
  					//value={this.state.staff}
  					onChange={this.staffHandleChange}
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

  // SPECIALTY -  COMPONENT 2
  specialtyHandleChange = (event) => {
  	this.setState({
  		...this.state,
  		specialty: event.target.value,
  	});
  };

  specialtyRender() {
  	const option = this.props.specialties.map((m) => (
  		<option key={m.name} value={m.name}>
  			{m.name}
  		</option>
  	));
  	return (
  		<div>
  			<FormControl
  				style={{ width: '100%', marginBottom: '50px' }}
  				variant="outlined"
  			>
  				<label style={{ width: '120px', fontSize: '15px', color: 'white' }}>
            Assign Specialties
  				</label>
  				<Select
  					style={{
  						minHeight: '50px',
  						borderRadius: '4px',
  						color: '#01579b',
  						fontSize: '18px',
  						backgroundColor: 'white',
  					}}
  					native
  					onChange={this.specialtyHandleChange}
  					inputProps={{
  						name: 'assign',
  						id: 'assign',
  					}}
  				>
  					<option value="" />
  					{option}
  				</Select>
  			</FormControl>
  		</div>
  	);
  }

  //SERVICES & PRICES - COMPONENT 3
  reset2 = () => {
  	document.getElementById('service').value = document.getElementById(
  		'service'
  	).defaultValue;
  	document.getElementById('price').value = document.getElementById(
  		'price'
  	).defaultValue;
  	document.getElementById('details').value = document.getElementById(
  		'details'
  	).defaultValue;
  };
	serviceDelHandler = () => {
		this.handleModal2Close();
		this.setState({ isLoading:true });	
  	const id = { _id: this.state.priceId };
  	Axios.post('/api/serviceprice/delete', id)
  		.then((res) => {
  			//console.log(res.data);
  		})
  		.catch((err) => {
  			//console.log(err);
  		});
		this.props.onfetchServicesPrices();
		this.setState({ isLoading:false });
	};

	serviceAddHandler = async () => {
		this.setState({ isLoading:true });
  	const scArray = {
  		name: this.state.service,
  		price: this.state.price,
  		assignmentID: this.state.assignmentID,
  		serviceDetails: this.state.serviceDetails,
  	};
  	await Axios.post('/api/serviceprice/post', scArray)
  		.then((res) => {
  			//console.log(res.data);
  		})
  		.catch((err) => {
  			//console.log(err);
  		});
  	this.props.onfetchServicesPrices();
  	this.reset2();
  	this.setState({ ...this.state, service: '', price:'', serviceDetails:'',isLoading:false });
  };

  serviceChangeHandler = (event) => {
  	this.setState({ ...this.state, service: event.target.value });
  };

  priceChangeHandler = (event) => {
  	this.setState({ ...this.state, price: event.target.value });
  };
  editPriceHandler = (id, name, price) => {
  	this.setState({
  		...this.state,
  		updatePrice: price,
  		selectedService: name,
  		servicePriceID: id,
  	});
  };

  detailsChangeHandler = (event) => {
  	this.setState({ ...this.state, serviceDetails: event.target.value });
  };

  //MODAL ASSIGNMENT DELETE - COMPONENT
  handleModalShow = (id) => {
  	this.setState({ modalShow: true, id });
  };

  handleModalClose = () => {
  	this.setState({ modalShow: false, id:'' });
  };		
  modalAssignmentDelRender() {
  	return (
  		<div>
  			<Modal
  									show={this.state.modalShow}
  									onHide={this.handleModalClose}
  								>
  									<Modal.Header closeButton>
  										<Modal.Title>Delete Assignment</Modal.Title>
  									</Modal.Header>
  									<Modal.Body>
                      You're trying to delete this Assignment, are you sure?!
  									</Modal.Body>
  									<Modal.Footer>
  										<span className="left">
  											<Button
  												variant="secondary"
  												onClick={this.handleModalClose}
  											>
                          Close
  											</Button>
  										</span>
  										<span>
  											<Button
  												className="right"
  												variant="danger"
  												onClick={this.staffAssignmentsDeleteHandler}
  											>
                          delete Assignment
  											</Button>
  										</span>
  									</Modal.Footer>
  								</Modal>
  		</div>
  	);
  }
	

	//MODAL SERVICE DELETE - COMPONENT
	handleModal2Show = (priceId) => {
		console.log(priceId);
  	this.setState({ ...this.state, modal2Show: true, priceId });
	};

  handleModal2Close = () => {
  	this.setState({ modal2Show: false, priceId:'' });
  };			

  modalSeviceDelRender() {
  	return (
  		<div>
  			<Modal
  									show={this.state.modal2Show}
  									onHide={this.handleModal2Close}
  								>
  									<Modal.Header closeButton>
  										<Modal.Title>Delete Service</Modal.Title>
  									</Modal.Header>
  									<Modal.Body>
                      You're trying to delete this Service, are you sure?!
  									</Modal.Body>
  									<Modal.Footer>
  										<span className="left">
  											<Button
  												variant="secondary"
  												onClick={this.handleModal2Close}
  											>
                          Close
  											</Button>
  										</span>
  										<span>
  											<Button
  												className="right"
  												variant="danger"
  												onClick={this.serviceDelHandler}
  											>
                          delete
  											</Button>
  										</span>
  									</Modal.Footer>
  								</Modal>
  		</div>
  	);
  }

  servicesPricesRender() {
  	return (
  		<div style={{}}>
  			<div style={{}}></div>
  			<label style={{ width: '120px', fontSize: '15px', color: 'white' }}>
          Add Service
  			</label>
  			<label className="right">
  				<span>
  					<Button
  						variant="info"
  						
  						disabled={
  							!this.state.service ||
                !this.state.price ||
                !this.state.serviceDetails
  						}
  						onClick={this.serviceAddHandler}
  						className="left"
  					>
              Save
  					</Button>
  				</span>
  			</label>
  			<div style={{ width: '100%', height: '20px' }}></div>
  			<div>
  				<input
  					placeholder="Service Name"
  					className="left"
  					style={{
  						borderRadius: '5px',
  						minWidth: '200px',
  						maxWidth: '220px',
  						color: '#01579b',
  						fontSize: '20px',
  						backgroundColor: 'white',
  					}}
  					id="service"
  					onChange={this.serviceChangeHandler}
  				></input>
  				<input
  					className="right"
  					placeholder="$"
  					style={{
  						borderRadius: '5px',
  						width: '70px',
  						color: '#01579b',
  						fontSize: '20px',
  						backgroundColor: 'white',
  					}}
  					id="price"
  					onChange={this.priceChangeHandler}
  				></input>
  				<div>
  					<TextareaAutosize
  						placeholder="Details"
  						style={{
  							fontSize: '20px',
  							marginTop: '10px',
  							height: '50px',
  							textAlign: 'center',
  							color: '#01579b',
  							backgroundColor: 'white',
  							borderRadius: '5px',
  						}}
  						//label="Title"
  						type="text"
  						id="details"
  						value={this.state.info}
  						onChange={this.detailsChangeHandler}
  					></TextareaAutosize>
  				</div>

  				<div style={{ width: '100%', height: '10px' }}></div>
  				<div
  					style={{ width: '100%', overflowY: 'scroll', maxHeight: '250px' }}
  				>
  					{this.props.servicesPrices.map((x) =>
  						x.assignmentID === this.state.assignmentID ? (
  							<div
  								className="black white-text"
  								style={{
  									minHeight: '80px',
  									marginTop: '5px',
  									border: '1px solid grey',
  									borderRadius: '5px',
  								}}
  								key={x.name}
  							>
  								<div
  									style={{ width: '100%', padding: '5px', color: 'yellow' }}
  								>
  									{x.name}
  									<span
  										style={{ paddingRight: '5px', color: 'yellow' }}
  										className="right"
  									>
                      ${x.price}
  									</span>
  								</div>

  								<div>
  									<span style={{ marginRight: '7px' }} className="right">
  										<Button
  											style={{ height: '25px', fontSize: '10px' }}
  											variant="danger"
  											size="sm"
  											onClick={()=>this.handleModal2Show(x._id)}
  										>
												Delete
  										</Button>
											
  									</span>
  									<span style={{ marginLeft: '7px' }} className="left">
  										{/*<Button variant="info" onClick={() => this.editPriceHandler(x._id, x.name, x.price)} size="sm" style={{}}>
											Price ${x.price}
										</Button>*/}
  									</span>
  									<div
  										style={{
  											width: '100%',
  											padding: '5px',
  											fontSize: '12px',
  										}}
  									>
  										{x.serviceDetails}
  									</div>
  								</div>
  							</div>
  						) : null
  					)}
  				</div>
  				<Button
  					style={{ width: '100%', marginTop: '20px' }}
  					variant="secondary"
  					onClick={this.backButtonHandler}
  				>
            BACK
  				</Button>
  			</div>
  		</div>
  	);
  }
  //EDIT PRICE -  COMPONENT 4
  newPriceHandler = () => {
  	const data = {
  		_id: this.state.servicePriceID,
  		price: this.state.updatePrice,
  	};
  	Axios.post('/api/serviceprice/update', data).then((res) => {
  		this.setState({
  			...this.state,
  			msn: res.data,
  			updatePrice: '',
  			selectedService: '',
  			servicePriceID: '',
  		});
  	});
  	this.props.onfetchServicesPrices();
  };
  updateFieldPriceHandler = (event) => {
  	this.setState({ ...this.state, updatePrice: event.target.value });
  };
  clearStateHandler = () => {
  	this.setState({
  		...this.state,
  		updatePrice: '',
  		selectedService: '',
  		servicePriceID: '',
  	});
  };

  editPriceRender() {
  	return (
  		<div style={{}}>
  			<div style={{}}></div>
  			<label className="right">
  				<span></span>
  			</label>
  			<div style={{ width: '100%', height: '20px' }}></div>
  			<div>
  				<input
  					className="left"
  					value={this.state.selectedService}
  					style={{
  						borderRadius: '5px',
  						width: '230px',
  						color: '#01579b',
  						fontSize: '20px',
  						backgroundColor: 'grey',
  					}}
  				></input>
  				<input
  					className="right"
  					value={this.state.updatePrice}
  					placeholder="$"
  					style={{
  						borderRadius: '5px',
  						width: '100px',
  						color: '#01579b',
  						fontSize: '20px',
  						backgroundColor: 'white',
  					}}
  					id="price"
  					onChange={this.updateFieldPriceHandler}
  				></input>
  				<div>
  					<Button
  						className="left"
  						variant="warning"
  						onClick={this.clearStateHandler}
  					>
              Back
  					</Button>
  					<Button
  						className="right"
  						variant="info"
  						onClick={this.newPriceHandler}
  					>
              Update Price
  					</Button>
  				</div>
  				<div style={{ width: '100%', height: '50px' }}></div>
  			</div>
  		</div>
  	);
  }

  //SUBMIT BUTTON - COMPONENT 5
  scrollToTop() {
  	window.scrollTo({
  		top: 0,
  		behavior: 'smooth',
  	});
  }
  submitHandler = async () => {
  	this.setState({ ...this.state, isLoading: true });
  	const data = {
  		staff: this.state.staff,
  		staffID: this.state.staffID,
  		assignedSpecialty: this.state.specialty,
  		assignedServices: this.state.servicesPricesSelection,
  	};
  	await Axios.post('/api/staffassignments/post', data)
  		.then((res) => {
  			this.setState({ ...this.state, msn: res.data, isLoading: false });
  		})
  		.catch((e) => {
  			//console.log(e);
  		});
  	this.setState({
  		...this.state,
  		servicesPricesSelection: [],
  		specialty: '',
  		staff: '',
  		staffID: '',
  	});
  	document.getElementById('assignstaff').value = document.getElementById(
  		'assignstaff'
  	).defaultValue;
  	this.props.onfetchStaffAssignments();
  	this.scrollToTop();
  };
  submitRender() {
  	return (
  		<div>
  			<Button
  				variant="info"
  				onClick={this.submitHandler}
  				style={{
  					width: '100%',
  					height: '50px',
  					fontSize: '18px',
  					marginBottom: '40px',
  				}}
  				disabled={!this.state.staff || !this.state.specialty}
  			>
          create
  			</Button>
  		</div>
  	);
  }

  //RENDER CARDS - COMPONENT 6
  staffAssignmentsDeleteHandler = () => {
  	this.setState({ ...this.state, isLoading: true });
  	const data = { _id:this.state.id };
  
  	Axios.post('/api/staffassignments/delete', data)
  		.then((res) => {
  			this.setState({ ...this.state, msn: res.data, isLoading: false });
  		})
  		.catch((err) => {
  			//console.log(err);
  		});
  	this.props.onfetchStaffAssignments();
  	this.handleModalClose();
  };
  serviceUpdateHandler = (_id) => {
  	console.log(_id);
  	this.setState({ ...this.state, assignmentID: _id });
  };

  backButtonHandler = (_id) => {
  	this.setState({ assignmentID: '' });
  };

  staffAssignmentsCardRender() {
  	return (
  		<div>
  			{this.state.startForm ? null : (
  				<label className="white-text">
  					<div onClick={this.startFormHandle}>
  						<span className="left">
  							<AddIcon style={{ color: 'white', fontSize: '30px' }} />
  						</span>{' '}
  						<span style={{ fontSize: '20px', paddingLeft: '10px' }}>
                Assign new staff
  						</span>
  					</div>
  				</label>
  			)}

  			<div style={{ width: '100%', height: '20px' }}></div>
  			<div style={{ overflowY: 'scroll', maxHeight: '500px' }}>
  				{this.props.staffAssignments.map((p) => (
  					<div
  						style={{
  							padding: '15px',
  							fontSize: '18px',
  							width: '100%',
  							backgroundColor: '#032641',
  						}}
  						className="card white-text container"
  						key={p.staff}
  					>
  						<div>
                Staff :{' '}
  							<span
  								style={{
  									fontSize: '15px',
  									marginLeft: '5px',
  									color: 'yellow',
  								}}
  							>
  								{' '}
  								{p.staff}
  							</span>
  							<span className="right">
  								<Button
  									style={{ height: '25px', width: '80px', fontSize: '10px' }}
  									onClick={() => this.serviceUpdateHandler(p._id)}
  									size="sm"
  									variant="info"
  								>
                    update
  								</Button>
  							</span>
  						</div>
  						<div>
                Specialty :
  							<span
  								style={{
  									fontSize: '15px',
  									marginLeft: '5px',
  									color: 'yellow',
  								}}
  							>
  								{' '}
  								{p.assignedSpecialty}
  							</span>
  						</div>
  						<div style={{ width: '100%', height: '20px' }}></div>
  						<div>
  							{this.props.servicesPrices.map((z) =>
  								p._id === z.assignmentID ? (
  									<div
  										key={z.assignmentID}
  										style={{
  											fontSize: '15px',
  											borderRadius: '3px',
  											backgroundColor: 'black',
  											padding: '5px',
  											marginBottom: '2px',
  											marginLeft: '0px',
  											color: 'yellow',
  										}}
  									>
  										<div
  											style={{
  												fontSize: '15px',
  												borderRadius: '3px',
  												backgroundColor: 'black',
  												padding: '3px',
  												marginBottom: '2px',
  												marginLeft: '5px',
  												color: 'yellow',
  											}}
  										>
  											{z.name} <span className="right">${z.price}</span>
  										</div>
  										<div
  											style={{
  												fontSize: '10px',
  												borderRadius: '3px',
  												backgroundColor: 'black',
  												padding: '3px',
  												marginBottom: '2px',
  												marginLeft: '5px',
  												color: 'white',
  											}}
  										>
  											{z.serviceDetails}
  										</div>
  									</div>
  								) : null
  							)}
  						</div>
  						<Button
  							variant="danger"
  							style={{ marginTop: '10px', fontSize: '18px' }}
  							onClick={()=>this.handleModalShow(p._id)}
  						>
								delete
  						</Button>
  						
  					</div>
  				))}
  			</div>
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
  			{/*<label className="white-text">
    				<h6>Assign Staff to a Specialty and Services</h6>
					</label>*/}

  			<div className="center">
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
  			</div>
  			<div className="center">
  				{this.state.isLoading ? <Spinner /> : null}
  			</div>
  			<div className="center">
  				{this.props.specialties.length < 1 ? <span style={{color:'white'}}><Spinner />There is no specialties registered yet, please go to Specialty section and add Specialty</span> : null}
  			</div>
  			<div>
  				{(this.props.specialties && this.state.startForm) ||
          this.props.staffAssignments.length < 1
  					? this.staffRender()
  					: null}
  			</div>
  			<div>{ this.state.priceId ? this.modalSeviceDelRender():null}</div>
  			<div>
  				{this.state.assignmentID && !this.state.priceId ? this.servicesPricesRender() : null}
  			</div>
  			<div>{this.state.staff ? this.specialtyRender() : null}</div>

  			<div>{this.state.specialty ? this.submitRender() : null}</div>
  			<div style={{ width: '100%', height: '20px' }}></div>
  			<div>{ this.state.id ? this.modalAssignmentDelRender(): null}</div>
  			<div>
  				{this.props.staffAssignments.length > 0 && !this.state.assignmentID && !this.state.id ? this.staffAssignmentsCardRender()
  					: null}
  			</div>
  			<div style={{ width: '100%', height: '120px' }}></div>
  		</div>
  	);
  }
}

const mapStateToProps = (state) => {
	return {
		users: state.auth.users,
		specialties: state.booking.specialties,
		servicesPrices: state.booking.servicesPrices,
		staffAssignments: state.booking.staffAssignments,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onfetchSpecialties: () => dispatch(actions.fetchSpecialties()),
		onfetchServicesPrices: () => dispatch(actions.fetchServicesPrices()),
		onfetchStaffAssignments: () => dispatch(actions.fetchStaffAssignments()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffAssignment);
