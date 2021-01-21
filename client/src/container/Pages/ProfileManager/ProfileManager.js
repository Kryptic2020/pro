import React from 'react';
import classes from './styles.module.css';
import CardProfileManager from '../../../components/CardProfileManager/CardProfileManager';
import Heading from '../../../components/UI/Heading/Heading';

const ProfileManager = (props) => {
	return (
		<div>
			<div className={classes.container}>
				<Heading
					text={'Settings > Profile Manager'}
				/>

				<div className={classes.input}>
					<input
						placeholder={'Search'}
						disableUnderline={true}
					/>
				</div>
				<div className={classes.subcontainer}>
					<div className={classes.text}>
						Contacts
					</div>
					<div className={classes.card}>
						<CardProfileManager />
						<CardProfileManager />
						<CardProfileManager />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileManager;
