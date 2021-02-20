import React, { Component } from 'react';
import axios from 'axios';
import * as actions from '../../../store/actions';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Heading from '../../../components/UI/Heading/Heading';
import CardWaitingListReport from '../../../components/CardWaitingListReport/CardWaitingListReport';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class WaitingListReport extends Component {
	state = {
		isLoading: false,
		waitingList: [],
		waitingListId: '',
		modalShow: false,
	};
	componentDidMount() {
		this.WaitingListHandler();
		actions.scrollToTop();
	}

	WaitingListHandler = () => {
		this.setState({ ...this.state, isLoading: true });
		axios
			.get('/api/booking/waitinglist/get')
			.then((res) => {
				this.setState({
					...this.state,
					waitingList: res.data,
					isLoading: false,
				});
				if (res.data.length < 1) {
					this.setState({
						msn: 'Waiting list is empty!',
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
					msn:
						'There was an error, please try again later!',
				});
				setTimeout(() => {
					this.setState({
						msn: '',
					});
				}, 3000);
			});
	};

	WaitingListDeleteHandler = () => {
		this.setState({ isLoading: true });
		const value = { _id: this.state.waitingListId };
		axios
			.post('/api/booking/waitinglist/delete', value)
			.then((res) => {
				this.setState({ msn: res.data });
				setTimeout(() => {
					this.setState({
						msn: '',
					});
				}, 3000);
			})
			.catch((err) => {
				this.setState({
					msn:
						'There was an error, please try again later!',
				});
				setTimeout(() => {
					this.setState({
						msn: '',
					});
				}, 3000);
			});
		this.setState({
			...this.state,
			waitingList: [],
			isLoading: false,
		});
		this.WaitingListHandler();
		this.handleModalClose();
	};
	modalDelWaitinglistRender() {
		return (
			<div>
				<Modal
					show={this.state.modalShow}
					onHide={this.handleModalClose}
				>
					<Modal.Header closeButton>
						<Modal.Title>
							Delete Wainting List Request
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						You're trying to delete this
						Wainting List Request, are you
						sure?!
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
									this
										.WaitingListDeleteHandler
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

	handleModalShow = (waitingListId) => {
		this.setState({ modalShow: true, waitingListId });
	};
	handleModalClose = () => {
		this.setState({
			modalShow: false,
			waitingListId: '',
		});
	};

	render() {
		return (
			<div>
				{this.modalDelWaitinglistRender()}
				{this.state.isLoading ? <Spinner /> : null}
				<div className={classes.container}>
					<div>
						<Heading
							text={
								'User > Waiting List Report'
							}
						/>
					</div>
					<div className={classes.box}>
						<div className={classes.cards}>
							<CardWaitingListReport
								waitingList={
									this.state.waitingList
								}
								onClick_delete={
									this.handleModalShow
								}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default WaitingListReport;
