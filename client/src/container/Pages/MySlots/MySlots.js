import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import * as actions from '../../../store/actions';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Heading from '../../../components/UI/Heading/Heading';
import SlotForm from '../../../components/SlotForm/SlotForm';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import CardSlot from '../../../components/CardSlot/CardSlot';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TextareaAutosize from 'react-textarea-autosize';

class MySlots extends Component {
	state = {
		data: [],
		isLoading: false,
		specialty: '',
		staffID: '',
		startDate: new Date(),
		endDate:
			new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
		date: null,
		Tdate: '',
		timeTables: [],
		selected: [],
		isLoading: false,
		todayDate: null, //
		TstartDate: '',
		msn: '',
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
		testeName: '',
	};
	componentDidMount = async () => {
		await this.props.onfetchStaffAssignments();
		actions.scrollToTop();
	};

	executeScroll = () => this.myRef.scrollIntoView();
	specialtyHandler = (e) => {
		this.setState({ specialty: e.target.value });
	};
	staffHandler = (e) => {
		this.setState({ staffID: e.target.value });
	};
	continueHandler = async () => {
		this.setState({ ...this.state, isLoading: true });
		const dataPost = {
			startDate: moment(
				new Date(this.state.startDate)
			).format('YYYY-MM-DD[T00:00:00.000Z]'),
			endDate: moment(
				new Date(this.state.endDate)
			).format('YYYY-MM-DD[T00:00:00.000Z]'),
			specialty: this.state.specialty,
			staffID: this.state.staffID,
		};
		await axios
			.post('/api/calendar/bydates', dataPost)
			.then((res) => {
				actions.scrollToTop();
				this.setState({
					data: res.data,
					isLoading: false,
					msn: 'updated',
				});

				setTimeout(() => {
					this.executeScroll();
					this.setState({
						msn: '',
					});
				}, 2000);

				if (res.data.length < 1) {
					this.setState({
						...this.state,
						msn:
							'Nothing to be displayed for that date!',
					});
					setTimeout(() => {
						this.setState({
							msn: '',
						});
					}, 3000);
				}
			})
			.catch((err) => {
				this.setState({
					...this.state,
					msn:
						'There was an error, please try again later!',
				});
			});
	};
	openCloseViewHandler = (_id, openView) => {
		const viewUpdate = {
			_id,
			openView,
		};
		axios
			.post(
				'/api/calendar/update/opencloseview',
				viewUpdate
			)
			.then((res) => {
				this.continueHandler();
			});
	};

	handleModal2Show = (
		_id,
		specialty,
		date,
		time,
		service,
		price,
		bookedByName
	) => {
		const cancelBooking = {
			_id,
			specialty,
			date,
			time,
			service,
			price,
			bookedByName,
		};
		this.setState({
			...this.state,
			modal2Show: true,
			cancelBooking,
			testeName: bookedByName,
		});
	};
	handleModal2Close = () => {
		this.setState({
			...this.state,
			modal2Show: false,
			cancelBooking: '',
		});
	};
	cancelBookingHandler = async () => {
		const data = this.state.cancelBooking;
		await axios
			.post('/api/booking/cancel', data)
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
				<Modal
					show={this.state.modal2Show}
					onHide={this.handleModal2Close}
				>
					<Modal.Header closeButton>
						<Modal.Title>
							Cancel Boooking
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						You're trying to Cancel{' '}
						{
							this.state.cancelBooking
								.bookedByName
						}
						's Booking, are you sure?
						<p>
							{
								this.state.cancelBooking
									.bookedByName
							}
						</p>
						<p>
							{'Booking ID: ' +
								this.state.cancelBooking
									._id}
						</p>
						<p>
							{
								this.state.cancelBooking
									.specialty
							}
						</p>
						<p>
							{new Date(
								this.state.cancelBooking.date
							).toLocaleDateString('en-GB', {
								year: 'numeric',
								month: 'numeric',
								day: 'numeric',
							})}
						</p>
						<p>
							{this.state.cancelBooking.time}
						</p>
						<p>
							{
								this.state.cancelBooking
									.service
							}
						</p>
						<p>
							{'$' +
								this.state.cancelBooking
									.price}
						</p>
					</Modal.Body>
					<Modal.Footer>
						<span className='left'>
							<Button
								variant='secondary'
								onClick={
									this.handleModal2Close
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
									this
										.cancelBookingHandler
								}
							>
								Confirm Cancellation
							</Button>
						</span>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
	handleModal3Show = (_id, comments) => {
		console.log(_id, comments);
		this.setState({
			modal3Show: true,
			cardID: _id,
			comments,
		});
	};

	handleModal3Close = () => {
		this.setState({
			modal3Show: false,
			showConfirmDelButton: false,
			cardID: '',
		});
	};
	inputChangeHandler = (event) => {
		this.setState({
			...this.state,
			comments: event.target.value,
		});
	};

	showConfirmDelButtonHandler = () => {
		this.setState({ showConfirmDelButton: true });
	};
	commentsSaveHandler = async () => {
		const id = {
			_id: this.state.cardID,
			comments: this.state.comments,
		};
		this.setState({ isLoading: true });
		await axios.post(
			'api/calendar/comments/update',
			id
		);
		this.handleModal3Close();
		this.continueHandler();
		this.setState({ isLoading: false });
	};
	commentsDelHandler = async () => {
		this.setState({ isLoading: true });
		const id = { _id: this.state.cardID };
		this.handleModal3Close();
		await axios.post(
			'api/calendar/comments/delete',
			id
		);
		this.handleModal3Close();
		this.continueHandler();
		this.setState({ isLoading: false });
	};
	modalCommentsRender() {
		return (
			<div>
				<Modal
					show={this.state.modal3Show}
					onHide={this.handleModal3Close}
				>
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
									backgroundColor:
										'white',
									border: 'none',
								}}
								//label="Title"
								type='text'
								value={this.state.comments}
								onChange={
									this.inputChangeHandler
								}
							></TextareaAutosize>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<span className='left'>
							<Button
								variant='secondary'
								onClick={
									this.handleModal3Close
								}
							>
								Close
							</Button>
						</span>
						<span className='left'>
							{!this.state
								.showConfirmDelButton ? (
								<Button
									variant='info'
									onClick={
										this
											.commentsSaveHandler
									}
								>
									Save
								</Button>
							) : null}
						</span>
						<span>
							{!this.state
								.showConfirmDelButton ? (
								<Button
									className='right'
									variant='danger'
									onClick={
										this
											.showConfirmDelButtonHandler
									}
								>
									delete
								</Button>
							) : null}
							{this.state
								.showConfirmDelButton ? (
								<Button
									className='right'
									variant='danger'
									onClick={
										this
											.commentsDelHandler
									}
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

	render() {
		return (
			<div>
				{this.modalCommentsRender()}
				{this.cancelBookingModalRender()}
				{this.state.msn ? (
					<div className={classes.msn}>
						{this.state.msn}
					</div>
				) : null}
				{this.state.isLoading ? <Spinner /> : null}
				<div className={classes.container}>
					<Heading
						text={'Dashboard > My Slots'}
					/>
					<div className={classes.box}>
						<SlotForm
							staffAssignments={
								this.props.staffAssignments
							}
							onChange_specialty={
								this.specialtyHandler
							}
							onChange_staff={
								this.staffHandler
							}
							specialty={this.state.specialty}
							selected_start={
								this.state.startDate
							}
							onChange_start={(date) => {
								this.setState({
									startDate: date,
									endDate:
										date.getTime() +
										1000 *
											60 *
											60 *
											24 *
											7,
								});
							}}
							selected_end={
								this.state.endDate
							}
							onChange_end={(date) => {
								this.setState({
									endDate: date,
								});
								console.log(
									date,
									new Date()
								);
							}}
							minDate_end={
								this.state.startDate
							}
						/>
						<ContinueButton
							disabled={
								!this.state.startDate ||
								!this.state.endDate ||
								!this.state.specialty ||
								!this.state.staffID
							}
							onClick={this.continueHandler}
							text={'SHOW'}
						/>
					</div>
					<div ref={(ref) => (this.myRef = ref)}>
						<Heading
							text={
								this.state.specialty
									? 'Dashboard > ' +
									  this.state.specialty
									: null +
									  ' ' +
									  ' > ' +
									  this.state.staff
									? this.state.staff
									: null
							}
						/>
					</div>
					<div className={classes.cards}>
						<CardSlot
							data={this.state.data}
							onClick_swap={
								this.openCloseViewHandler
							}
							onClick_cancel={
								this.handleModal2Show
							}
							onClick_pencil={
								this.handleModal3Show
							}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		staffAssignments: state.booking.staffAssignments,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onfetchStaffAssignments: () =>
			dispatch(actions.fetchStaffAssignments()),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MySlots);
