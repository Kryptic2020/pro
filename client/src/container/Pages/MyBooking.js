import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from 'react-bootstrap/esm/Button';
import Alert from 'react-bootstrap/Alert';
import { parseISO } from 'date-fns';
import Modal from 'react-bootstrap/Modal';

class MyBooking extends Component {
  state = {
  	myBookings: [],
  	isLoading: true,
  	msn: '',
  	show: true, //
  	modalShow: false, //
  	cancelBooking: '',
  };

  scrollToTop() {
  	window.scrollTo({
  		top: 0,
  		behavior: 'smooth',
  	});
  }

  componentDidMount() {
  	this.props.onFetchDates();
  	this.fetchMyBookings();
  	this.scrollToTop();
  }   
  handleModalShow = (_id, specialty, date, time, service, bookedByName) => {
  	const cancelBooking = { _id, specialty, date, time, service, bookedByName };
  	this.setState({ ...this.state, modalShow: true, cancelBooking });
  };

  handleModalClose = () => {
  	this.setState({ modalShow: false, cancelBooking: '' });
  };
  fetchMyBookings = async () => {
  	this.setState({ isLoading: true });
  	await Axios.get('/api/booking/mybooking')
			.then((res) => {
				console.log(res.data);
  			const order = res.data.sort().reverse();
  			this.setState({
  				...this.state,
  				myBookings: order,
  				isLoading: false,
  			});
  			if (res.data.length < 1) {
  				this.setState({
  					msn: 'Empty!',
  				});
  			}
  		})
  		.catch();
  };

	cancelBookingHandler = async () => {
  	this.setState({ isLoading: true });
		const data = this.state.cancelBooking;
		console.log(data);
  	await Axios.post('/api/booking/cancel', data)
  		.then((res) => {
  			this.fetchMyBookings();
  			this.setState({ isLoading: false });
  		})
  		.catch((err) => {
  			//console.log(err);
  		});
  	this.handleModalClose();
  };

  cancelBookingModalRender() {
  	return (
  		<div>
  			<Modal show={this.state.modalShow} onHide={this.handleModalClose}>
  				<Modal.Header closeButton>
  					<Modal.Title>Cancel Booking</Modal.Title>
  				</Modal.Header>
  				<Modal.Body> <p>Hi,{' '} {this.state.cancelBooking.bookedByName} !</p>
            You're trying to Cancel this Booking, are you sure?!
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
  							onClick={this.cancelBookingHandler}
  						>
                Cancel Booking
  						</Button>
  					</span>
  				</Modal.Footer>
  			</Modal>
  		</div>
  	);
  }

  render() {
  	let form = <Spinner />;
  	const raw = this.state.myBookings;
  	if (!this.state.isLoading) {
  		form = raw.map((P, index) => (
  			<div
  				className="card white-text container"
  				style={{ padding: '12px', backgroundColor: '#032641' }}
  				key={index}
  			>
  				<div>
  					<div>
  						<span className="left" style={{ fontSize: '15px' }}>
  							{P.staff} - {P.specialty} - {P.service}
  						</span>
  						<span>
  							<Button className="right" variant="outline-info">
                  ${P.price}
  							</Button>
  						</span>
  					</div>
  					<div style={{ width: '100%', height: '30px' }}></div>
  					<div>
  						<div className="left">
  							<i style={{}} className="material-icons small">
                  assignment_ind
  							</i>
  						</div>
  						<div
  							style={{
  								fontSize: '18px',
  								textAlign: 'left',
  								marginLeft: '90px',
  							}}
  						>
  							{parseISO(P.date).toLocaleDateString('es-ES', {
  								year: 'numeric',
  								month: 'numeric',
  								day: 'numeric',
  							})}
  						</div>
  					</div>
  					<div style={{ width: '100%', height: '10px' }}></div>
  					<div>
  						<div className="left">
  							<i style={{}} className="material-icons small">
                  schedule
  							</i>
  						</div>
  						<div
  							style={{
  								fontSize: '18px',
  								textAlign: 'left',
  								marginLeft: '110px',
  							}}
  						>
  							{P.time}
  							{parseISO(P.date) > new Date() && !P.isCancelled ? (
  								<button
  									onClick={() =>
  										this.handleModalShow(
  											P.bookingID,
  											P.specialty,
  											P.date,
  											P.time,
												P.service,
												P.bookedByName
  										)
  									}
  									className="#ec407a pink lighten-1 white-text right btn-flat"
  								>
                    cancel
  								</button>
  							) : null}
  							{parseISO(P.date).toLocaleDateString('es-ES', {
  								year: 'numeric',
  								month: 'numeric',
  								day: 'numeric',
  							}) ===
                  new Date().toLocaleDateString('es-ES', {
                  	year: 'numeric',
                  	month: 'numeric',
                  	day: 'numeric',
                  }) &&
                !P.isCancelled &&
                P.time.substring(0, 2) > new Date().getHours() + 2 ? (
  									<div>
  										<button 
  											onClick={() =>
  												this.handleModalShow(
  													P.bookingID,
  													P.specialty,
  													P.date,
  													P.time,
														P.service,
														P.bookedByName
  												)
  											}
  											className="#ec407a pink lighten-1 white-text right btn-flat"
  										>
                      cancel
  										</button>
  									</div>
  								) : null}
  							{P.isCancelled ? (
  								<button className="#ec407a black lighten-1 white-text right btn-flat">
                    cancelled
  								</button>
  							) : null}
  						</div>
  					</div>
  				</div>
  			</div>
  		));
  	}

  	return (
  		<div
  			className="container"
  			style={{
  				marginTop: '77px',
  				minWidth: '320px',
  				maxWidth: '380px',
  				textAlign: 'center',
  			}}
  		>
  			<div style={{ width: '100%', height: '20px' }}></div>
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
  			<div className="center" style={{ width: '100%' }}>
  				<label className="center" style={{ color: 'white', width: '100%' }}>
  					<h6>Booking History</h6>
  				</label>
  			</div>
  			<div>
  				{this.state.cancelBooking ? this.cancelBookingModalRender() : null}
  			</div>
  			<div style={{ width: '100%', height: '0px' }}></div>
  			<div style={{ overflowY: 'scroll', maxHeight: '500px' }}>
  				{!this.state.cancelBooking ? form : null}
  			</div>
  			<div style={{ width: '100%', height: '50px' }}></div>
  		</div>
  	);
  }
}

const mapStateToProps = (state) => {
	return {
		rawData: state.booking.rawData,
		booking: state.booking.existingDates,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchDates: () => dispatch(actions.fetchDates()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBooking);
