import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import AddIcon from '@material-ui/icons/Add';
import Modal from 'react-bootstrap/Modal';

class SpecialtyAndServices extends Component {
  state = {
  	msn: '',
  	specialty: '',
  	specialties: [],
  	service: '',
  	price: '',
  	selectedService: '',
  	updatePrice: '',
  	servicePriceID: '',
  	startForm: false,
  	show: true, //
  	modalShow: false, //
  	id: '',
  	isLoading: false,
  };

  scrollToTop() {
  	window.scrollTo({
  		top: 0,
  		behavior: 'smooth',
  	});
  }

  componentDidMount() {
  	this.props.onfetchSpecialties();
  	this.setState({ ...this.state, speciaties: this.props.specialties });
  	this.props.onfetchServicesPrices();
  	this.scrollToTop();
  }

  hideMsn = () => {
  	this.setState({ ...this.state, msn: '' });
  };

  //SPECIALTY - COMPONENT 1
  reset = () => {
  	document.getElementById('specialty').value = document.getElementById(
  		'specialty'
  	).defaultValue;
  };
  specialtyChangeHandler = (event) => {
  	this.setState({ ...this.state, specialty: event.target.value });
  };
  specialtyAddHandler = async () => {
  	this.reset();
  	this.setState({ isLoading: true });
  	const spArray = {
  		specialty: this.state.specialty,
  	};
  	await Axios.post('/api/specialty/post', spArray)
  		.then((res) => {
  			//console.log(res.data);
  		})
  		.catch((err) => {
  			//console.log(err);
  		});
  	this.props.onfetchSpecialties();

  	this.setState({ isLoading: false, startForm: false });
  };
  specialtyDelHandler = async () => {
  	this.setState({ isLoading: true });
  	const id = { _id: this.state.id };
  	await Axios.post('/api/specialty/delete', id)
  		.then((res) => {
  			//console.log(res.data);
  		})
  		.catch((err) => {
  			//console.log(err);
  		});
  	this.props.onfetchSpecialties();
  	this.handleModalClose();
  	this.setState({ isLoading: false });
  };
  startFormHandle = () => {
  	this.setState({ startForm: true });
  };

  specialtyRender() {
  	const addIcon = (
  		<div onClick={this.startFormHandle}>
  			<span className="left">
  				<AddIcon style={{ color: 'white', fontSize: '30px' }} />
  			</span>{' '}
  			<span style={{ color: 'white', fontSize: '20px', paddingLeft: '10px' }}>
          Add new specialty
  			</span>
  		</div>
  	);

  	const formSpecialty = (
  		<div style={{ marginTop: '20px' }}>
  			<label style={{ width: '120px', fontSize: '15px', color: 'white' }}>
          New Specialty
  			</label>
  			<input
  				style={{
  					borderRadius: '5px',
  					width: '100%',
  					color: '#01579b',
  					fontSize: '20px',
  					backgroundColor: 'white',
  				}}
  				id="specialty"
  				onChange={this.specialtyChangeHandler}
  			></input>
  			<Button
  				style={{ width: '100%', marginTop: '20px' }}
  				variant="info"
  				disabled={!this.state.specialty}
  				onClick={this.specialtyAddHandler}
  			>
          Save
  			</Button>
  		</div>
  	);
  	return (
  		<div>
  			<div style={{}}>{!this.state.startForm ? addIcon : null}</div>
  			<div>
  				{this.state.startForm ? formSpecialty : null}
  				<div style={{ marginTop: '30px' }}>
  					{this.props.specialties.length > 0 ? (
  						<label
  							style={{ width: '120px', fontSize: '15px', color: 'white' }}
  						>
                All Specialties
  						</label>
  					) : null}
  					{this.props.specialties.map((m) => (
  						<div
  							className="black white-text"
  							style={{
  								marginTop: '5px',
  								border: '1px solid grey',
  								padding: '10px',
  								borderRadius: '5px',
  								marginRight: '5px',
  							}}
  							key={m.name}
  						>
  							{m.name}
  							<span style={{ marginTop: '-7px' }} className="right">
  								<Button
  									style={{
  										height: '25px',
  										fontSize: '10px',
  										marginTop: '5px',
  									}}
  									variant="danger"
  									onClick={() => this.handleModalShow(m._id)}
  								>
                    Delete
  								</Button>
  							</span>
  						</div>
  					))}
  				</div>
  			</div>
  		</div>
  	);
  }

  // MODAL DELETE - COMPONENT
  handleModalShow = (id) => {
  	this.setState({ modalShow: true, id });
  };

  handleModalClose = () => {
  	this.setState({ modalShow: false, id: '' });
  };
  modalDeleteRender() {
  	return (
  		<div>
  			<Modal show={this.state.modalShow} onHide={this.handleModalClose}>
  				<Modal.Header closeButton>
  					<Modal.Title>Delete Specialty</Modal.Title>
  				</Modal.Header>
  				<Modal.Body>
            You're trying to delete this specialty, are you sure?!
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
  							onClick={this.specialtyDelHandler}
  						>
                delete
  						</Button>
  					</span>
  				</Modal.Footer>
  			</Modal>
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
  			<div>{!this.state.id ? this.specialtyRender() : null}</div>
  			<div>{this.state.id ? this.modalDeleteRender() : null}</div>
  			<div style={{ width: '100%', height: '80px' }}></div>
  		</div>
  	);
  }
}

const mapStateToProps = (state) => {
	return {
		users: state.auth.users,
		specialties: state.booking.specialties,
		servicesPrices: state.booking.servicesPrices,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onfetchSpecialties: () => dispatch(actions.fetchSpecialties()),
		onfetchServicesPrices: () => dispatch(actions.fetchServicesPrices()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SpecialtyAndServices);
