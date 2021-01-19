import React, { Component } from 'react';
import classes from './styles.module.css';
import CardStaff from '../../../components/CardStaff/CardStaff';
import Heading from '../../../components/UI/Heading/Heading';
import SelectCustom from '../../../components/UI/SelectCustom/SelectCustom';
import SpecialtyIcon from '../../../components/UI/Iconsx/Specialty';
import StaffIcon from '../../../components/UI/Iconsx/User';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';

class AssignStaff extends Component {
	state = {
		users: [],
	};
	render() {
		return (
			<div>
				<div className={classes.container}>
					<div className={classes.heading}>
						<Heading
							text={'Settings > Assign Staff'}
						/>
					</div>
					<div
						className={classes.assign_staff_box}
					>
						<div className={classes.input_box}>
							<SelectCustom
								users={this.state.users}
								label={'Select Staff'}
								icon={<StaffIcon />}
							/>
						</div>
						<div className={classes.input_box}>
							<SelectCustom
								users={this.state.users}
								label={'Select Specialty'}
								icon={<SpecialtyIcon />}
							/>
						</div>
					</div>
					<div className={classes.continue}>
						<ContinueButton text='Continue' />
					</div>
					<div className={classes.text}>
						Assigned Staff
					</div>
					<div className={classes.card}>
						<CardStaff
							//onClick_service_settings={}
							//onClick_delete={}
							staff={'Alan Powell'}
							specialty={
								'Dentist / Pharmacist'
							}
						/>
						<div className={classes.card}>
							<CardStaff
								//onClick_service_settings={}
								//onClick_delete={}
								staff={'Alan Powell'}
								specialty={
									'Dentist / Pharmacist'
								}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AssignStaff;
