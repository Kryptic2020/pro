import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions';
import classes from './styles.module.css';
import CardStaff from '../../../components/CardStaff/CardStaff';
import Heading from '../../../components/UI/Heading/Heading';
import SelectCustom from '../../../components/UI/SelectCustom/SelectCustom';
import SpecialtyIcon from '../../../components/UI/Iconsx/Specialty';
import StaffIcon from '../../../components/UI/Iconsx/User';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';

class AssignStaff extends Component {
	state = {
		staff: '',
		staffID: '',
		msn: '',
		isLoading: false,
		specialty: '',
		assignmentID: '',
		modalShow: false, //
		id: '',
	};

	componentDidMount() {
		this.props.onfetchSpecialties();
		this.props.onfetchServicesPrices();
		this.props.onfetchStaffAssignments();
		actions.scrollToTop();
	}

	// Staff
	//ok
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

	// SPECIALTY -  COMPONENT 2
	specialtyHandleChange = (event) => {
		this.setState({
			...this.state,
			specialty: event.target.value,
		});
	};

	//MODAL ASSIGNMENT DELETE
	//ok
	handleModalShow = (id) => {
		this.setState({ modalShow: true, id });
	};
	//ok
	handleModalClose = () => {
		this.setState({ modalShow: false, id: '' });
	};

	//ok
	modalAssignmentDelRender() {
		return (
			<div>
				<Modal
					show={this.state.modalShow}
					onHide={this.handleModalClose}
				>
					<Modal.Header closeButton>
						<Modal.Title>
							Delete Assignment
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						You're trying to delete this
						Assignment, are you sure?!
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
										.staffAssignmentsDeleteHandler
								}
							>
								delete Assignment
							</Button>
						</span>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}

	//SUBMIT
	//ok
	submitHandler = async () => {
		this.setState({ ...this.state, isLoading: true });
		const data = {
			staff: this.state.staff,
			staffID: this.state.staffID,
			assignedSpecialty: this.state.specialty,
		};
		await Axios.post('/api/staffassignments/post', data)
			.then((res) => {
				this.setState({ msn: res.data });
				setTimeout(() => {
					this.setState({
						msn: '',
					});
				}, 3000);
			})
			.catch((e) => {
				//console.log(e);
			});
		this.setState({
			...this.state,
			specialty: '',
			staff: '',
			staffID: '',
			isLoading: false,
		});
		document.getElementById(
			'assignstaff'
		).value = document.getElementById(
			'assignstaff'
		).defaultValue;
		document.getElementById(
			'assignspecialty'
		).value = document.getElementById(
			'assignspecialty'
		).defaultValue;
		this.props.onfetchStaffAssignments();
		actions.scrollToTop();
	};

	//ok
	staffAssignmentsDeleteHandler = () => {
		this.setState({ ...this.state, isLoading: true });
		const data = { _id: this.state.id };

		Axios.post('/api/staffassignments/delete', data)
			.then((res) => {
				actions.scrollToTop();
				this.setState({
					...this.state,
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
		this.props.onfetchStaffAssignments();
		this.handleModalClose();
	};

	//ok
	serviceSettingsHandler = (_id) => {
		this.setState({ ...this.state, assignmentID: _id });
	};

	backButtonHandler = (_id) => {
		this.setState({ assignmentID: '' });
	};

	render() {
		const optionStaff = this.props.users.map((m) =>
			m.isAdmin ? (
				<option
					key={m.fullName}
					value={[m._id, m.fullName]}
				>
					{m.fullName}
				</option>
			) : null
		);
		const optionService = this.props.specialties.map(
			(m) => (
				<option key={m.name} value={m.name}>
					{m.name}
				</option>
			)
		);
		return (
			<div>
				{this.state.isLoading ? <Spinner /> : null}
				{this.modalAssignmentDelRender()}
				{this.state.msn ? (
					<div className={classes.msn}>
						{this.state.msn}
					</div>
				) : null}
				<div className={classes.container}>
					<div className={classes.heading}>
						<Heading
							text={'Settings > Assign Staff'}
						/>
					</div>
					<div
						className={classes.assign_staff_box}
					>
						<div className={classes.input_box}>
							<SelectCustom
								id='assignstaff'
								options={optionStaff}
								//value={this.state.staff}
								label={'Select Staff'}
								icon={<StaffIcon />}
								onChange={
									this.staffHandleChange
								}
							/>
						</div>
						<div className={classes.input_box}>
							<SelectCustom
								id='assignspecialty'
								options={optionService}
								//value={this.state.specialty}
								label={'Select Specialty'}
								icon={<SpecialtyIcon />}
								onChange={
									this
										.specialtyHandleChange
								}
							/>
						</div>
					</div>
					<div className={classes.continue}>
						<ContinueButton
							onClick={this.submitHandler}
							text='Continue'
							disabled={
								!this.state.staff ||
								!this.state.specialty
							}
						/>
					</div>
					<div className={classes.text}>
						Assigned Staff
					</div>
					<div className={classes.card}>
						{' '}
						{this.props.staffAssignments.map(
							(p) => (
								<CardStaff
									key={
										p.staff +
										p.assignedSpecialty
									}
									_id={p._id}
									staff={p.staff}
									specialty={p.specialty}
									onClick_delete={() =>
										this.handleModalShow(
											p._id
										)
									}
									_id={p._id}
									specialty={
										p.assignedSpecialty
									}
								/>
							)
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
		specialties: state.booking.specialties,
		servicesPrices: state.booking.servicesPrices,
		staffAssignments: state.booking.staffAssignments,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onfetchSpecialties: () =>
			dispatch(actions.fetchSpecialties()),
		onfetchServicesPrices: () =>
			dispatch(actions.fetchServicesPrices()),
		onfetchStaffAssignments: () =>
			dispatch(actions.fetchStaffAssignments()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AssignStaff);
