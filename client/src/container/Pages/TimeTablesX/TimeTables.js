import React from 'react';
import classes from './styles.module.css';
import CardTimeTables from '../../../components/CardTimeTables/CardTimeTables';
import Heading from '../../../components/UI/Heading/Heading';
import NewTimeTable from '../../../components/NewTimeTable/NewTimeTable';

import ContinueButton from '../../../components/ContinueButton/ContinueButton';

const TimeTables = (props) => {
	return (
		<div>
			<div className={classes.container}>
				<div className={classes.heading}>
					<Heading
						text={'Settings > Time Tables'}
					/>
				</div>
				<div className={classes.new_service}>
					<NewTimeTable />
				</div>

				<div className={classes.continue}>
					<ContinueButton text='Continue' />
				</div>
				<div className={classes.text}>
					Time Tables List
				</div>
				<div className={classes.card}>
					<CardTimeTables
						table_name={'Monday'}
						time_slots={
							' as ds ad a dsa da ds ad a sfd asfasdf dasg adsfgasdgdasfgasdfsa sdfo sdaif adsiofu idaspfu isdauf  uds ipaudsfp oa odsaf dusf dasfu dad iadsuf asiopf udsifu aidsfou apidasu fasifdu'
						}
					/>
					<CardTimeTables
						table_name={'Monday'}
						time_slots={
							' as ds ad a dsa da ds ad a sfd asfasdf dasg adsfgasdgdasfgasdfsa sdfo sdaif adsiofu idaspfu isdauf  uds ipaudsfp oa odsaf dusf dasfu dad iadsuf asiopf udsifu aidsfou apidasu fasifdu'
						}
					/>
					<CardTimeTables
						table_name={'Monday'}
						time_slots={
							' as ds ad a dsa da ds ad a sfd asfasdf dasg adsfgasdgdasfgasdfsa sdfo sdaif adsiofu idaspfu isdauf  uds ipaudsfp oa odsaf dusf dasfu dad iadsuf asiopf udsifu aidsfou apidasu fasifdu'
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default TimeTables;
