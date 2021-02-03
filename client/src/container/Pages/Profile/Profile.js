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
import Close from '../../../components/UI/Iconsx/Close';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

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

	src: null,
	crop: {
		unit: 'px',
		width: 250,
		aspect: 16 / 16,
	},
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
		this.setState({ selectedFile: '' });
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
			})
			.catch((err) => {});
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
		console.log([...e.target.files]);
		if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			reader.addEventListener('load', () =>
				this.setState({ src: reader.result })
			);
			reader.readAsDataURL(e.target.files[0]);
		}
	};
	onImageLoaded = (image) => {
		this.imageRef = image;
	};

	onCropComplete = (crop) => {
		this.makeClientCrop(crop);
	};

	onCropChange = (crop, percentCrop) => {
		// You could also use percentCrop:
		// this.setState({ crop: percentCrop });
		this.setState({ crop });
	};

	async makeClientCrop(crop) {
		if (this.imageRef && crop.width && crop.height) {
			const croppedImageUrl = await this.getCroppedImg(
				this.imageRef,
				crop,
				'newFile.jpeg'
			);
			this.setState({ croppedImageUrl });
			//console.log(croppedImageUrl);
		}
	}

	getCroppedImg(image, crop, fileName) {
		const canvas = document.createElement('canvas');
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		canvas.width = crop.width;
		canvas.height = crop.height;
		const ctx = canvas.getContext('2d');

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height
		);

		const base64Image = canvas.toDataURL('image/jpeg');
		this.setState({ selectedFile: base64Image });
	}
	CloseCropHandler = () => {
		this.setState({
			...this.state,
			src: '',
		});
	};

	fileUploadHandler = () => {
		console.log(
			this.state.selectedFile,
			'click upload'
		);
		/*
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
			});*/
		//console.log(this.state.convertedPhoto);
		const data = { photo: this.state.selectedFile };
		Axios.post('/api/picture', data).then((res) => {});
		this.setState({ selectedFile: '' });
		window.location.reload(false);
		/*axios url, data,onUploadProgress: progressEvent =>{console.log('Upload Progress:' + Math.round(progressEvent.loaded / progressEvent.total * 100)+'%')}*/
	};

	render() {
		const { crop, selectedFile, src } = this.state;
		const data = this.props.photo;
		const Example = ({ data }) => (
			<img
				alt='Image Database'
				style={{ borderRadius: '50%' }}
				src={`${data}`}
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
						<div className={classes.crop}>
							<div
								onClick={
									this.CloseCropHandler
								}
								className={
									classes.crop_close
								}
							>
								{this.state.src ? (
									<Close />
								) : null}
							</div>
							{src && (
								<ReactCrop
									src={src}
									crop={crop}
									ruleOfThirds
									onImageLoaded={
										this.onImageLoaded
									}
									onComplete={
										this.onCropComplete
									}
									onChange={
										this.onCropChange
									}
								/>
							)}
						</div>
						<CardProfile
							photo={
								this.state.selectedFile ? (
									selectedFile && (
										<img
											alt='Crop Image'
											style={{
												marginLeft:
													'-2%',
												maxWidth:
													'255px',
												maxHeight:
													'255px',
												borderRadius:
													'50%',
											}}
											src={
												selectedFile
											}
										/>
									)
								) : (
									<Example data={data} />
								)
							}
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
							}
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
						/>{' '}
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
