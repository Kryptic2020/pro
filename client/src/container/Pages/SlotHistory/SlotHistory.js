import React, { Component } from 'react';
import axios from 'axios';
import * as actions from '../../../store/actions';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import CardSlotHistory from '../../../components/CardSlotHistory/CardSlotHistory';
import Headings from '../../../components/UI/Heading/Heading';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class CalendarHistory extends Component {
	state = {
		isLoading: false,
		msn: '',
		data: [],
		id: '',
		show: true, //
		modalShow: false, //
	};
	componentDidMount() {
		actions.scrollToTop();
		this.fetchCalendarHistory(); //
	}

	fetchCalendarHistory = () => {
		axios
			.get('/api/calendar-history/get')
			.then((res) => {
				this.setState({
					data: res.data,
				});
			})
			.catch((err) => {});
		this.setState({
			isLoading: false,
		});
	};

	deleteHandler = () => {
		actions.scrollToTop();
		this.setState({ isLoading: true });
		const data = { _id: this.state.id };
		axios
			.post('/api/calendar-history/delete', data)
			.then((res) => {
				this.setState({
					msn: res.data,
					isLoading: false,
				});
				setTimeout(() => {
					this.setState({
						msn: '',
					});
				}, 3000);
			})
			.catch((err) => {
				//console.log(err);
			});
		this.setState({ isLoading: false });
		this.fetchCalendarHistory();
		this.handleModalClose();
	};

	handleModalShow = (id) => {
		this.setState({ modalShow: true, id });
	};

	handleModalClose = () => {
		this.setState({ modalShow: false, id: '' });
	};

	modalDeleteRender() {
		return (
			<Modal
				show={this.state.modalShow}
				onHide={this.handleModalClose}
			>
				<Modal.Header closeButton>
					<Modal.Title>
						Delete Card History
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					You're trying to delete this card record
					only, are you sure?! if you want to
					delete the slots in your calendar you
					should navigate to Settings {'>'}{' '}
					Calendar Manager {'>'} Delete Slots.
				</Modal.Body>
				<Modal.Footer>
					<span className='left'>
						<Button
							variant='secondary'
							onClick={this.handleModalClose}
						>
							Close
						</Button>
					</span>
					<span>
						<Button
							className='right'
							variant='danger'
							onClick={this.deleteHandler}
						>
							delete
						</Button>
					</span>
				</Modal.Footer>
			</Modal>
		);
	}

	render() {
		return (
			<>
				{this.modalDeleteRender()}
				{this.state.msn ? (
					<div className={classes.msn}>
						{this.state.msn}
					</div>
				) : null}
				{this.state.isLoading ? <Spinner /> : null}
				<div className={classes.container}>
					<div className={classes.headings}>
						<Headings
							text={
								'Settings > Calendar History'
							}
						/>
					</div>
					{this.state.isLoading ? (
						<Spinner />
					) : null}

					<div className={classes.subcontainer}>
						<div className={classes.box}>
							<div className={classes.card}>
								{this.state.data.map(
									(x, index) => (
										<CardSlotHistory
											key={
												x._id +
												index
											}
											processedBy={
												x.processedBy
											}
											processedDate={new Date(
												x.processedDate
											).toLocaleDateString(
												'es-ES',
												{
													year:
														'numeric',
													month:
														'numeric',
													day:
														'numeric',
												}
											)}
											specialty={
												x.specialty
											}
											staff={x.staff}
											startDate={new Date(
												x.startDate
											).toLocaleDateString(
												'es-ES',
												{
													year:
														'numeric',
													month:
														'numeric',
													day:
														'numeric',
												}
											)}
											endDate={new Date(
												x.endDate
											).toLocaleDateString(
												'es-ES',
												{
													year:
														'numeric',
													month:
														'numeric',
													day:
														'numeric',
												}
											)}
											excludedDays={x.excludedDays.join(
												', '
											)}
											type={x.type}
											isVisible={
												x.isVisible
													? 'YES'
													: 'NO'
											}
											tableName={
												x.tableName
											}
											slots={x.slots}
											onClick={() =>
												this.handleModalShow(
													x._id
												)
											}
										/>
									)
								)}
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default CalendarHistory;
