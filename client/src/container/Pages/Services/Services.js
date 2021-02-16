import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions';
import classes from './styles.module.css';
import CardService from '../../../components/CardService/CardService';
import Heading from '../../../components/UI/Heading/Heading';
import NewService from '../../../components/NewService/NewService';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';

const initialState = {
	assignmentID: '',
	_id: '',
	staff: '',
	specialty: '',
	price: '',
	service: '',
	serviceDetails: '',
	msn: '',
	servicesPricesSelection: [],
	isLoading: false,
	modalShow: false, //
};
class Services extends Component {
	state = initialState;

	componentDidMount() {
		actions.scrollToTop();
		if (!this.props.location._id) {
			this.props.history.push('/assign-staff');
		} else {
			this.props.onfetchServicesPrices();
			this.props.onfetchStaffAssignments();
			this.setState({
				assignmentID: this.props.location._id,
				staff: this.props.location.staff,
				specialty: this.props.location.specialty,
			});
		}
	}
	reset = () => {
		document.getElementById(
			'service'
		).value = document.getElementById(
			'service'
		).defaultValue;
		document.getElementById(
			'price'
		).value = document.getElementById(
			'price'
		).defaultValue;
		document.getElementById(
			'details'
		).value = document.getElementById(
			'details'
		).defaultValue;
	};

	inputChangeHandler = (event, input) => {
		this.setState({ [input]: event.target.value });
	};

	//SUBMIT BUTTON

	submitHandler = () => {
		this.setState({ isLoading: true });
		const sc = {
			name: this.state.service,
			price: this.state.price,
			assignmentID: this.state.assignmentID,
			serviceDetails: this.state.serviceDetails,
		};
		Axios.post('/api/serviceprice/post', sc)
			.then((res) => {
				actions.scrollToTop();
				this.setState({ msn: res.data });
				setTimeout(() => {
					this.setState({
						msn: '',
					});
				}, 3000);
			})
			.catch((err) => {
				//console.log(err);
			});
		this.props.onfetchServicesPrices();
		this.reset();
		this.setState({
			...this.state,
			service: '',
			price: '',
			serviceDetails: '',
			isLoading: false,
		});
	};

	serviceDelHandler = () => {
		this.handleModalClose();
		this.setState({ isLoading: true });
		const id = { _id: this.state.priceId };
		Axios.post('/api/serviceprice/delete', id)
			.then((res) => {
				actions.scrollToTop();
				this.setState({ msn: res.data });
				setTimeout(() => {
					this.setState({
						msn: '',
					});
				}, 3000);
			})
			.catch((err) => {
				//console.log(err);
			});
		this.props.onfetchServicesPrices();
		this.setState({ isLoading: false });
	};

	handleModalShow = (priceId) => {
		this.setState({
			...this.state,
			modalShow: true,
			priceId,
		});
	};

	handleModalClose = () => {
		this.setState({ modalShow: false, priceId: '' });
	};

	modalSeviceDelRender() {
		return (
			<div>
				<Modal
					show={this.state.modalShow}
					onHide={this.handleModalClose}
				>
					<Modal.Header closeButton>
						<Modal.Title>
							Delete Service
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						You're trying to delete this
						Service, are you sure?!
					</Modal.Body>
					<Modal.Footer>
						<span className='left'>
							<Button
								variant='secondary'
								onClick={
									this.handleModalClose
								}
							>
								Close
							</Button>
						</span>
						<span>
							<Button
								className='right'
								variant='danger'
								onClick={
									this.serviceDelHandler
								}
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
			<div>
				{this.state.isLoading ? <Spinner /> : null}
				{this.modalSeviceDelRender()}
				{this.state.msn ? (
					<div className={classes.msn}>
						{this.state.msn}
					</div>
				) : null}
				<div className={classes.container}>
					<div className={classes.heading}>
						<Heading
							text={
								'Settings > Assign Staff > Services'
							}
						/>
					</div>
					<div className={classes.new_service}>
						<NewService
							label_specialty={
								this.state.specialty
							}
							label_staff={this.state.staff}
							onChange_price={(event) =>
								this.inputChangeHandler(
									event,
									'price'
								)
							}
							onChange_service={(event) =>
								this.inputChangeHandler(
									event,
									'service'
								)
							}
							onChange_description={(event) =>
								this.inputChangeHandler(
									event,
									'serviceDetails'
								)
							}
						/>
					</div>

					<div className={classes.continue}>
						<ContinueButton
							text='Continue'
							onClick={this.submitHandler}
						/>
					</div>
					<div className={classes.text}>
						Service List
					</div>
					<div className={classes.card}>
						{this.props.servicesPrices.map(
							(z, index) =>
								z.assignmentID ===
								this.state.assignmentID ? (
									<CardService
										onClick={() =>
											this.handleModalShow(
												z._id
											)
										}
										key={z.name + index}
										service={z.name}
										price={z.price}
										service_description={
											z.serviceDetails
										}
									/>
								) : null
						)}
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		users: state.auth.users,
		staffAssignments: state.booking.staffAssignments,
		servicesPrices: state.booking.servicesPrices,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onfetchStaffAssignments: () =>
			dispatch(actions.fetchStaffAssignments()),
		onfetchServicesPrices: () =>
			dispatch(actions.fetchServicesPrices()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Services);
