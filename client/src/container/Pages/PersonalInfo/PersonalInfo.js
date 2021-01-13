import React from 'react';
import classes from './styles.module.css';
import PersonalInfo from '../../../components/PersonalInfo/Personalinfo';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';

const PersonalInfoPage = (props) => {
	return (
		<div>
			<div className={classes.container}>
				<div className={classes.headers}>
					Please complete the sign up step below.
				</div>
				<div className={classes.personalInfo}>
					<PersonalInfo />
				</div>
				<div className={classes.continueButton}>
					<ContinueButton
						text='Continue'
						//onClick={Please complete the last sign up step below.}
					/>
				</div>
			</div>
		</div>
	);
};

export default PersonalInfoPage;
