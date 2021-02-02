import React from 'react';
import classes from './styles.module.css';
import InputCustom from '../UI/InputCustom/InputCustom';
import ButtonCustom from '../UI/ButtonCustom/ButtonCustom';
import TextareaAutosize from 'react-textarea-autosize';

const CardProfile = (props) => {
	const fileInput = React.useRef(null);
	return (
		<div className={classes.container}>
			<div className={classes.subcontainer}>
				<div className={classes.box}>
					<div className={classes.photo}>
						{props.photo}
					</div>
					<div className={classes.upload}>
						<input
							style={{ display: 'none' }}
							id='upload'
							type='file'
							name='photo'
							class='filepond'
							onChange={props.onChange_file}
							ref={fileInput}
						/>
						{
							<button
								onClick={() =>
									fileInput.current.click()
								}
							>
								Pick File
							</button>
						}
						<ButtonCustom
							onClick={props.onClick_upload}
							backgroundColor={'#11B9F0'}
							color={'#ffffff'}
							text={'UPLOAD IMAGE'}
						/>
					</div>
				</div>
				<div className={classes.name}>
					<InputCustom
						label={'Full Name'}
						display_icon={'none'}
						type={'text'}
						value={props.fullName}
						onChange={props.onChange_fullName}
					/>
				</div>
				<div className={classes.email}>
					<InputCustom
						readonly
						label={'Email'}
						display_icon={'none'}
						type={'text'}
						value={props.email}
						onChange={props.onChange_email}
					/>
				</div>
				<div className={classes.verified}>
					<InputCustom
						readonly
						label={'Email Verified'}
						display_icon={'none'}
						type={'text'}
						value={props.verified}
						onChange={props.onChange_verified}
					/>
				</div>
				<div className={classes.provider}>
					<InputCustom
						readonly
						label={'Provider'}
						display_icon={'none'}
						type={'text'}
						value={props.provider}
						onChange={props.onChange_provider}
					/>
				</div>
				<div className={classes.phone}>
					<InputCustom
						label={'Phone'}
						display_icon={'none'}
						type={'number'}
						value={props.phone}
						onChange={props.onChange_phone}
					/>
				</div>
				<div className={classes.info}>
					<label className={classes.label}>
						Message
					</label>
					<TextareaAutosize
						minRows={4}
						maxRows={4}
						style={{
							fontSize: '16px',
							textAlign: 'center',
							color: '#504f4b',
							backgroundColor: 'white',
							borderRadius: '5px',
							border: 'none',
						}}
						value={props.info}
						onChange={props.onChange_info}
					/>
				</div>
			</div>
		</div>
	);
};

export default CardProfile;
