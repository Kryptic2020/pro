import React, { Component } from 'react';
import Axios from 'axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions';
import classes from './styles.module.css';
import CardTimeTables from '../../../components/CardTimeTables/CardTimeTables';
import Heading from '../../../components/UI/Heading/Heading';
import NewTimeTable from '../../../components/NewTimeTable/NewTimeTable';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const initialState = {
	isLoading: false,
	cicle: '',
	age: '0',
	name: 'hai',
	timeT: '',
	cicle: '',
	name: '',
	selection: '',
	msn: '',
	isLoading: false,
	timeTables: [], //
	selected: '', //
	selectedTimes: [],
	id: '',
	modalShow: false,
};
class TimeTables extends Component {
	state = initialState;
	componentDidMount() {
		actions.scrollToTop();
		this.fetchTimeTable();
	}
	//TABLES - COMPONENT 6
	fetchTimeTable = () => {
		Axios.get('/api/timeTable/get')
			.then((res) => {
				this.setState({
					isLoading: false,
					timeTables: res.data,
				});
				if (this.state.timeTables.length < 1) {
					actions.scrollToTop();
					this.setState({
						msn:
							'There is no time table to be displayed',
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
					isLoading: false,
					timeTables: [],
				});
				//console.log(err);
			});
	};

	deleteTableHandler = () => {
		this.setState({ isLoading: true });
		const tableId = this.state.id;
		Axios.delete('/api/timeTable/' + tableId)
			.then((res) => {
				actions.scrollToTop();
				this.fetchTimeTable();
				this.setState({ msn: res.data });
				setTimeout(() => {
					this.setState({
						msn: '',
					});
				}, 3000);
			})
			.catch(() => {
				this.fetchTimeTable();
			});
		this.handleModalClose();
		this.setState({ isLoading: false });
	};

	modalDeleteRender() {
		return (
			<div>
				<Modal
					show={this.state.modalShow}
					onHide={this.handleModalClose}
				>
					<Modal.Header closeButton>
						<Modal.Title>
							Delete Time Table
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						You're trying to delete this Time
						Table, are you sure?!
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
									this.deleteTableHandler
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

	reset = () => {
		document.getElementById(
			'name'
		).value = document.getElementById(
			'name'
		).defaultValue;
		document.getElementById(
			'times'
		).value = document.getElementById(
			'times'
		).defaultValue;
		document.getElementById(
			'period'
		).value = document.getElementById(
			'period'
		).defaultValue;
	};
	handleModalShow = (id) => {
		this.setState({ modalShow: true, id });
	};

	handleModalClose = () => {
		this.setState({ modalShow: false, id: '' });
	};
	handleChange = (event) => {
		this.setState({
			...this.state,
			selection: event.target.value,
			selectedTimes: event.target.value,
			msn: '',
		});
	};

	inputChangeHandler = (event) => {
		this.setState({
			...this.state,
			name: event.target.value,
		});
	};

	handlePeriodChange = (event) => {
		//console.log(event.target.value);
		const name = event.target.name;
		this.setState({
			...this.state,
			[name]: event.target.value,
			cicle: event.target.value,
			msn: '',
		});
	};

	// SUBMIT - COMPONENT
	submitHandle = async () => {
		this.setState({ ...this.state, isLoading: true });
		const tableData = {
			tableName: this.state.name,
			tableTimes: this.state.selection
				.toString()
				.split(','),
		};
		console.log(tableData);
		await Axios.post('/api/createTimeTable', tableData)
			.then((res) => {
				actions.scrollToTop();
				this.setState({ msn: res.data });
				setTimeout(() => {
					this.setState({
						msn: '',
					});
				}, 3000);
			})
			.catch((err) => {});
		this.reset();
		this.setState({
			...this.state,
			cicle: '',
			selectedTimes: [],
			name: '',
			selection: '',
			isLoading: false,
		});
		this.fetchTimeTable();
	};

	render() {
		return (
			<div>
				{this.modalDeleteRender()}
				{this.state.isLoading ? <Spinner /> : null}
				{this.state.msn ? (
					<div className={classes.msn}>
						{this.state.msn}
					</div>
				) : null}
				<div className={classes.container}>
					<div className={classes.heading}>
						<Heading
							text={'Settings > Time Tables'}
						/>
					</div>
					<div className={classes.new_service}>
						<NewTimeTable
							onChange={
								this.inputChangeHandler
							}
							onChange_slots={
								this.handleChange
							}
							value_name={this.state.name}
							value={this.state.selectedTimes}
							cicle={this.state.cicle}
							onChange_period={
								this.handlePeriodChange
							}
						/>
					</div>

					<div className={classes.continue}>
						<ContinueButton
							disabled={
								!this.state.selection ||
								!this.state.cicle ||
								!this.state.name
							}
							text='Continue'
							onClick={this.submitHandle}
						/>
					</div>
					<div className={classes.text}>
						Time Tables List
					</div>
					<div className={classes.card}>
						{this.state.timeTables
							.sort()
							.map((p, index) => (
								<CardTimeTables
									key={p._id + index}
									onClick={() =>
										this.handleModalShow(
											p._id
										)
									}
									table_name={
										p.timeTableName
									}
									times={p.times}
								/>
							))}
					</div>
				</div>
			</div>
		);
	}
}

export default TimeTables;
