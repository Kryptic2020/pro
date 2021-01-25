import React from 'react';
import classes from './styles.module.css';
import InputCustom from '../UI/InputCustom/InputCustom';
import ButtonCustom from '../UI/ButtonCustom/ButtonCustom';

const CardProfile = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.subcontainer}>
				<div className={classes.box}>
					<div className={classes.photo}>
						{props.photo}
					</div>
					<div className={classes.upload}>
						<ButtonCustom
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
						onChange={props.onChange}
					/>
				</div>
				<div className={classes.email}>
					<InputCustom
						label={'Email'}
						display_icon={'none'}
						type={'text'}
						onChange={props.onChange}
					/>
				</div>
				<div className={classes.verified}>
					<InputCustom
						label={'Email Verified'}
						display_icon={'none'}
						type={'text'}
						onChange={props.onChange}
					/>
				</div>
				<div className={classes.provider}>
					<InputCustom
						label={'Provider'}
						display_icon={'none'}
						type={'text'}
						onChange={props.onChange}
					/>
				</div>
				<div className={classes.phone}>
					<InputCustom
						label={'Phone'}
						display_icon={'none'}
						type={'text'}
						onChange={props.onChange}
					/>
				</div>
				<div className={classes.message}>
					<InputCustom
						label={'Message'}
						display_icon={'none'}
						type={'text'}
						height={'100px'}
						lineHeight={'160px'}
						onChange={props.onChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default CardProfile;
