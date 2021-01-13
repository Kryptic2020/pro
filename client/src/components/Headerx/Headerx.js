import React from 'react';
import classes from './styles.module.css';
import CompanyIcone from '../UI/Iconsx/CompanyIcone';
import KeyboardLeftIcone from '../UI/Iconsx/KeyboardLeft';

const Headerx = (props) => {
	return (
		<div className={classes.appHeader}>
			<div className={classes.container}>
				<KeyboardLeftIcone
					width={18}
					fill={'white'}
				/>
				<div className={classes.companyIcon}>
					<CompanyIcone
						width={25}
						fill={'white'}
					/>
				</div>

				<div className={classes.span}>Company</div>
			</div>
		</div>
	);
};

export default Headerx;
