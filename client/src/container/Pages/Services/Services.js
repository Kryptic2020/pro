import React from 'react';
import classes from './styles.module.css';
import CardService from '../../../components/CardService/CardService';
import Heading from '../../../components/UI/Heading/Heading';
import NewService from '../../../components/NewService/NewService';

import ContinueButton from '../../../components/ContinueButton/ContinueButton';

const Services = (props) => {
	return (
		<div>
			<div className={classes.container}>
				<div className={classes.heading}>
					<Heading
						text={
							'Settings > Assign Staff > Services'
						}
					/>
				</div>
				<div className={classes.new_service}>
					<NewService />
				</div>

				<div className={classes.continue}>
					<ContinueButton text='Continue' />
				</div>
				<div className={classes.text}>
					Service List
				</div>
				<div className={classes.card}>
					<CardService
						service={'Dentist'}
						price={'$299'}
						service_description={
							' as ds ad a dsa da ds ad a sfd asfasdf dasg adsfgasdgdasfgasdfsa sdfo sdaif adsiofu idaspfu isdauf  uds ipaudsfp oa odsaf dusf dasfu dad iadsuf asiopf udsifu aidsfou apidasu fasifdu daiposdfapisdfudasiadsif fdf fdu fiduf idu duf iudo saiuf aiu fifdaiu'
						}
					/>
					<CardService
						service={'Pharmacist'}
						price={'$299'}
						service_description={
							' as ds ad a dsa da ds ad a sfd asfasdf dasg adsfgasdgdasfgasdfsa sdfo sdaif adsiofu idaspfu isdauf  uds ipaudsfp oa odsaf dusf dasfu dad iadsuf asiopf udsifu aidsfou apidasu fasifdu daiposdfapisdfudasiadsif fdf fdu fiduf idu duf iudo saiuf aiu fifdaiu'
						}
					/>
					<CardService
						service={'Pharmacist'}
						price={'$299'}
						service_description={
							' as ds ad a dsa da ds ad a sfd asfasdf dasg adsfgasdgdasfgasdfsa sdfo sdaif adsiofu idaspfu isdauf  uds ipaudsfp oa odsaf dusf dasfu dad iadsuf asiopf udsifu aidsfou apidasu fasifdu daiposdfapisdfudasiadsif fdf fdu fiduf idu duf iudo saiuf aiu fifdaiu'
						}
					/>
					<CardService
						service={'Pharmacist'}
						price={'$299'}
						service_description={
							' as ds ad a dsa da ds ad a sfd asfasdf dasg adsfgasdgdasfgasdfsa sdfo sdaif adsiofu idaspfu isdauf  uds ipaudsfp oa odsaf dusf dasfu dad iadsuf asiopf udsifu aidsfou apidasu fasifdu daiposdfapisdfudasiadsif fdf fdu fiduf idu duf iudo saiuf aiu fifdaiu'
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default Services;
