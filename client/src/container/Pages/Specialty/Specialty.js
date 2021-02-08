import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import CardSpecialty from '../../../components/CardSpecialty/CardSpecialty';
import Heading from '../../../components/UI/Heading/Heading';
import InputCustom from '../../../components/UI/InputCustom/InputCustom';
import SpecialtyIcon from '../../../components/UI/Iconsx/Specialty';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class Specialty extends Component {
	state = {
		msn: '',
		specialty: '',
		show: true, //
		modalShow: false, //
		id: '',
		isLoading: false,
	};

	componentDidMount() {
		this.props.onfetchSpecialties();
		actions.scrollToTop();
	}

	hideMsn = () => {
		this.setState({ ...this.state, msn: '' });
	};

	//SPECIALTY - COMPONENT 1
	reset = () => {
		document.getElementById(
			'specialty'
		).value = document.getElementById(
			'specialty'
		).defaultValue;
	};
	specialtyChangeHandler = (event) => {
		this.setState({
			...this.state,
			specialty: event.target.value,
		});
	};
	specialtyAddHandler = async () => {
		this.reset();
		this.setState({ isLoading: true });
		const sp = {
			specialty: this.state.specialty,
		};
		await Axios.post('/api/specialty/post', sp)
			.then((res) => {
				this.setState({ msn: res.data });
				setTimeout(() => {
					this.setState({
						msn: '',
					});
				}, 2000);
			})
			.catch((err) => {
				//console.log(err);
			});
		this.props.onfetchSpecialties();
		this.setState({
			isLoading: true,
		});
	};
	specialtyDelHandler = async () => {
		this.setState({ isLoading: true });
		const id = { _id: this.state.id };
		await Axios.post('/api/specialty/delete', id)
			.then((res) => {
				this.setState({
					msn: res.data,
					isLoading: false,
				});
				setTimeout(() => {
					this.setState({
						msn: '',
					});
				}, 2000);
			})
			.catch((err) => {
				//console.log(err);
			});
		actions.scrollToTop();
		this.props.onfetchSpecialties();
		this.handleModalClose();
	};

	// MODAL DELETE - COMPONENT
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
							onClick={
								this.specialtyDelHandler
							}
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
				{this.state.isLoading ? <Spinner /> : null}
				{this.state.id
					? this.modalDeleteRender()
					: null}
				{this.state.msn ? (
					<div className={classes.msn}>
						{this.state.msn}
					</div>
				) : null}
				<div className={classes.container}>
					<div className={classes.heading}>
						<Heading
							text={'Settings > Specialty'}
						/>
					</div>
					<div className={classes.specialty_box}>
						<div className={classes.input_box}>
							<InputCustom
								type='text'
								id='specialty'
								onChange={
									this
										.specialtyChangeHandler
								}
								label={'Add Specialty'}
								icon={<SpecialtyIcon />}
							/>
						</div>
					</div>
					<div className={classes.continue}>
						<ContinueButton
							text='Continue'
							onClick={
								this.specialtyAddHandler
							}
						/>
					</div>
					{this.props.specialties.length > 0 ? (
						<div className={classes.text}>
							Specialty List
						</div>
					) : null}
					<div className={classes.card}>
						{this.props.specialties.map((m) => (
							<CardSpecialty
								key={m.name}
								text={m.name}
								onClick={() =>
									this.handleModalShow(
										m._id
									)
								}
							/>
						))}
					</div>
				</div>
			</>
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
		onfetchSpecialties: () =>
			dispatch(actions.fetchSpecialties()),
		onfetchServicesPrices: () =>
			dispatch(actions.fetchServicesPrices()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Specialty);
