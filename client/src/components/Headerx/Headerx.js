import React from 'react';
import useStyles from './styles';
import CompanyIcone from '../UI/Iconsx/CompanyIcone';
import KeyboardLeftIcone from '../UI/Iconsx/KeyboardLeft';

const Headerx = (props) => {
	const classes = useStyles();
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
