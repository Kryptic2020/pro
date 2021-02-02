import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import CardProfile from '../../../components/CardProfile/CardProfile';
import Heading from '../../../components/UI/Heading/Heading';
import Switch from '../../../components/Selector/Selector';
import InputCustom from '../../../components/UI/InputCustom/InputCustom';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
const Compress = require('compress.js');

const initialState = {
	phone: '',
	credits: '',
	_id: '',
	fullName: '',
	email: '',
	provider: '',
	photo: '',
	isAdmin: '',
	emailVerified: '',
	isLoading: false,
	msn: '',
	isActive: '',
	daysCalendarView: '',
	info: '',
	selectedFile: [],
	convertedPhoto: '',
	test: '',
};

class Profile extends Component {
	state = initialState;

	scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}
	componentDidMount() {
		console.log(this.props.photo);
		this.fetchProfile();
		this.scrollToTop();
	}
	reset() {
		this.setState(initialState);
	}
	hideMsn = () => {
		this.setState({ ...this.state, msn: '' });
	};

	fetchProfile = () => {
		this.setState({ isLoading: true });
		//this.reset();
		const ID = {
			_id: this.props.location.state._id,
		};
		Axios.post('/api/profile/get', ID)
			.then((res) => {
				//console.log(res.data);
				this.setState({
					...this.state,
					phone: res.data.phone,
					credits: res.data.credits,
					_id: res.data._id,
					fullName: res.data.fullName,
					email: res.data.email,
					provider: res.data.provider,
					photo: res.data.photo,
					isAdmin: res.data.isAdmin,
					emailVerified: res.data.emailVerified,
					isLoading: false,
					text: 'Insert your number here',
					isActive: res.data.isActive,
					info: res.data.info,
					daysCalendarView:
						res.data.daysCalendarView,
				});
				//console.log(res.data.provider);
			})
			.catch((err) => {
				//console.log(err);
			});
	};

	inputChangeHandler = (event, input) => {
		this.setState({ [input]: event.target.value });
	};
	adminNoYesHandler = (e) => {
		this.setState({ isAdmin: e.target.checked });
	};

	activeNoYesHandler = (e) => {
		this.setState({ isActive: e.target.checked });
	};

	saveHandler = () => {
		window.scrollTo(0, 0);
		this.setState({ isLoading: true, initialState });
		const data = {
			fullName: this.state.fullName,
			phone: this.state.phone,
			photo: this.state.photo,
			isAdmin: this.state.isAdmin,
			_id: this.state._id,
			isActive: this.state.isActive,
			info: this.state.info,
			daysCalendarView: this.state.daysCalendarView,
		};

		Axios.post('/api/profile/update', data).then(
			(res) => {
				this.setState({
					msn: res.data,
					isLoading: false,
				});
			}
		);
		this.fetchProfile();
		window.location.reload(false);
	};
	fileSelectHandler = (e) => {
		const compress = new Compress();

		const files = [...e.target.files];
		compress
			.compress(files, {
				size: 1, // the max size in MB, defaults to 2MB
				quality: 1, // the quality of the image, max is 1,
				maxWidth: 250, // the max width of the output image, defaults to 1920px
				maxHeight: 250, // the max height of the output image, defaults to 1920px
				resize: true, // defaults to true, set false if you do not want to resize the image width and height
			})
			.then((data) => {
				// returns an array of compressed images
				this.setState({
					selectedFile: data[0].data,
				});
			});
	};
	fileUploadHandler = () => {
		//console.log(this.state.convertedPhoto);
		const data = { photo: this.state.selectedFile };
		Axios.post('/api/picture', data).then((res) => {
			console.log(res);
		});

		/*axios url, data,onUploadProgress: progressEvent =>{console.log('Upload Progress:' + Math.round(progressEvent.loaded / progressEvent.total * 100)+'%')}*/
	};

	render() {
		const data = this.props.photo;
		const Example = ({ data }) => (
			<img
				style={{ borderRadius: '50%' }}
				src={`data:image/jpeg;base64,${data}`}
				width={250}
				height={250}
			/>
		);

		return (
			<div>
				{this.state.isLoading ? <Spinner /> : null}
				<div className={classes.container}>
					<Heading text={'User > Profile'} />
					<div>
						<CardProfile
							photo={<Example data={data} />}
							fullName={this.state.fullName}
							email={this.state.email}
							verified={
								this.state.emailVerified
							}
							phone={this.state.phone}
							provider={this.state.provider}
							info={this.state.info}
							onChange_file={
								this.fileSelectHandler
							}
							onClick_upload={
								this.fileUploadHandler
							}
							onChange_fullName={(event) =>
								this.inputChangeHandler(
									event,
									'fullName'
								)
							} /*
							onChange_email={(event) =>
								this.inputChangeHandler(
									event,
									'email'
								)
							}
							onChange_verified={(event) =>
								this.inputChangeHandler(
									event,
									'emailVerified'
								)
							}
							onChange_provider={(event) =>
								this.inputChangeHandler(
									event,
									'provider'
								)
							}*/
							onChange_phone={(event) =>
								this.inputChangeHandler(
									event,
									'phone'
								)
							}
							onChange_info={(event) =>
								this.inputChangeHandler(
									event,
									'info'
								)
							}
						/>
						<div
							className={classes.subcontainer}
						>
							<div
								className={
									classes.switch_status
								}
							>
								<Switch
									value={
										this.state.isActive
									}
									onChange={
										this
											.activeNoYesHandler
									}
									checked={
										this.state.isActive
									}
									backgroundColor={
										'#11B9F0'
									}
									off='Deactivated'
									on='Active'
									text='User Status'
								/>
							</div>
							<div className={classes.box}>
								<div
									className={classes.text}
								>
									How many days ahead do
									you want your clients to
									see on your calendar ?
								</div>
								<div
									className={
										classes.input
									}
								>
									<InputCustom
										onChange={(event) =>
											this.inputChangeHandler(
												event,
												'daysCalendarView'
											)
										}
										value={
											this.state
												.daysCalendarView
										}
									/>
								</div>
							</div>
							<div
								className={
									classes.switch_admin
								}
							>
								<Switch
									value={
										this.state.isAdmin
									}
									onChange={
										this
											.adminNoYesHandler
									}
									checked={
										this.state.isAdmin
									}
									backgroundColor={
										'#504F4B'
									}
									off='No'
									on='Yes'
									text='Admin Privileges'
								/>
							</div>
						</div>
						<ContinueButton
							onClick={this.saveHandler}
							text={'SAVE'}
						/>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		isAdmin: state.auth.isAdmin,
		photo: state.auth.photo,
	};
};

export default connect(
	mapStateToProps,
	null
)(withRouter(Profile));
