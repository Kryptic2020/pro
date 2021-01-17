import React from 'react';
import classes from './styles.module.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';

const PersonalInfo = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.subcontainer}>
				<div className={classes.header}>
					Personal Information
				</div>
				<label className={classes.msg}>
					{props.msg_firstName}
				</label>
				<div className={classes.input}>
					<input
						id='firstName'
						placeholder='First Name'
						onClick={props.onClick_firstName}
						onChange={props.onChange_firstName}
					/>
				</div>
				<label className={classes.msg}>
					{props.msg_lastName}
				</label>
				<div className={classes.input}>
					<input
						id='lastName'
						placeholder='Last Name'
						onClick={props.onClick_lastName}
						onChange={props.onChange_lastName}
					/>
				</div>
				<label className={classes.msg}>
					{props.msg_phone}
				</label>
				<div className={classes.input}>
					<PhoneInput
						id='phone'
						inputStyle={{
							height: '50px',
						}}
						country={'au'}
						disableCountryCode={true}
						//autoFormat={true}
						enableAreaCodes={true}
						value={props.value}
						onlyCountries={['au']}
						masks={{ au: '.... ... ...' }}
						placeholder='Phone Number'
						onClick={props.onClick_phone}
						onChange={props.onChange_phone}
					/>
				</div>
			</div>
		</div>
	);
};

export default PersonalInfo;
