import React, { Component } from 'react';
import * as actions from '../../../store/actions';
import axios from 'axios';
import classes from './styles.module.css';
import CardProfileManager from '../../../components/CardProfileManager/CardProfileManager';
import Heading from '../../../components/UI/Heading/Heading';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const initialState = {
	contacts: [],
	search: '',
	isLoading: true,
	modalShow: false,
	id: '',
};

class ProfileManager extends Component {
	state = initialState;

	componentDidMount() {
		this.fetchContacts();
		actions.scrollToTop();
	}

	fetchContacts = async () => {
		axios
			.get('/api/contacts')
			.then((res) => {
				console.log(res.data);
				this.setState({
					...this.state,
					contacts: res.data,
					isLoading: false,
				});
			})
			.catch((err) => {
				//console.log(err);
			});
	};

	deleteHandler = async () => {
		this.setState({ isLoading: true });
		const id = { _id: this.state.id };
		await axios
			.post('/api/contacts/delete', id)
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
		actions.scrollToTop();
		this.handleModalClose();
		this.fetchContacts();
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
						Delete Specialty
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					You're trying to delete this specialty,
					are you sure?!
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
		function compare(a, b) {
			if (a.fullName < b.fullName) {
				return -1;
			}
			if (a.fullName > b.fullName) {
				return 1;
			}
			return 0;
		}
		const filteredContacts = this.state.contacts.filter(
			(contact) => {
				let contactLowercase = contact.fullName.toLowerCase();
				let searchTermLowercase = this.state.search.toLowerCase();
				return (
					contactLowercase.indexOf(
						searchTermLowercase
					) > -1
				);
			}
		);
		return (
			<div>
				{this.modalDeleteRender()}
				{this.state.msn ? (
					<div className={classes.msn}>
						{this.state.msn}
					</div>
				) : null}
				<div className={classes.container}>
					<Heading
						text={'Settings > Profile Manager'}
					/>

					<div className={classes.input}>
						<input
							placeholder={'Search'}
							onChange={(e) =>
								this.setState({
									search: e.target.value,
								})
							}
						></input>
					</div>
					<div className={classes.subcontainer}>
						<div className={classes.text}>
							Contacts
						</div>
						<div className={classes.card}>
							{filteredContacts
								.sort(compare)
								.map((d) => (
									<CardProfileManager
										onClick={() =>
											this.handleModalShow(
												d._id
											)
										}
										fullName={
											d.fullName
										}
										_id={d._id}
										buttom_label={
											'SELECT'
										}
										admin={
											d.isAdmin
												? 'Admin-On'
												: 'Admin-Off'
										}
										verified={
											d.emailVerified
												? 'Email Verified'
												: 'Email Not Verified'
										}
										provider={
											d.provider
										}
										name={d.fullName}
										email={d.email}
										phone={
											'0' + d.phone
										}
										active={
											d.isActive
												? 'Active'
												: 'Blocked'
										}
									/>
								))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProfileManager;
