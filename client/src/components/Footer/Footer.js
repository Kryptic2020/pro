import React from 'react';
import classes from './styles.module.css';
import CompanyIcon from '../UI/Iconsx/CompanyIcone';
import Location from '../UI/Iconsx/Location';
import Instagram from '../UI/Iconsx/Instagram';
import Twiiter from '../UI/Iconsx/Twiiter';
import F from '../UI/Iconsx/F';

const Footer = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.company}>
				<div className={classes.company_icon_small}>
					<CompanyIcon width={18} />
				</div>
				<div className={classes.company_icon_large}>
					<CompanyIcon width={32} />
				</div>

				<div className={classes.company_name}>
					&copy; CompanyName
				</div>
			</div>

			<div className={classes.email}>
				sample@gmail.com
			</div>

			<div className={classes.contact}>
				CONTACT US
			</div>
			<div className={classes.phone}>
				0444 444 444
			</div>

			<div className={classes.icons_small}>
				<div>
					<Location width={16} />
				</div>
				<div>
					<Instagram width={19} />
				</div>
				<div>
					<Twiiter width={22} />
				</div>
				<div>
					<F width={20} />
				</div>
			</div>
			<div className={classes.icons_large}>
				<div>
					<Location width={28} />
				</div>
				<div>
					<Instagram width={32} />
				</div>
				<div>
					<Twiiter width={36} />
				</div>
				<div>
					<F width={36} />
				</div>
			</div>

			<div className={classes.powered}>
				Powered by
			</div>
			<div className={classes.aquenzitech}>
				Aquenzitech{' '}
			</div>
		</div>
	);
};

export default Footer;
