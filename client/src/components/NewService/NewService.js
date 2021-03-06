import React from 'react';
import classes from './styles.module.css';
import InputCustom from '../UI/InputCustom/InputCustom';
import Assigned from '../UI/Iconsx/Assigned';

const NewService = (props) => {
	return (
		<div>
			<div className={classes.service_container}>
				<div className={classes.service_box}>
					<div className={classes.staff}>
						{props.label_staff}
					</div>
					<div className={classes.action}>
						<div
							className={classes.action_icon}
						>
							<Assigned width={30} />
						</div>
						<div
							className={classes.action_text}
						>
							Add New Service
						</div>
					</div>
					<div className={classes.specialty}>
						{props.label_specialty}
					</div>
					<div className={classes.service_name}>
						<InputCustom
							onChange={
								props.onChange_service
							}
							value={props.value_service}
							type='text'
							id='service'
							label={'Service Name'}
							display_icon={'none'}
							//icon={<Specialty_icon />}
						/>
					</div>
					<div className={classes.price}>
						<InputCustom
							onChange={props.onChange_price}
							value={props.value_price}
							type='number'
							id='price'
							display_icon={'none'}
							label={'Price $AUD'}
							//icon={<Specialty_icon />}
						/>
					</div>
					<div
						className={
							classes.service_description
						}
					>
						<InputCustom
							onChange={
								props.onChange_description
							}
							value={props.value_description}
							type='text'
							id='details'
							display_icon={'none'}
							label={'Service Description'}
							//icon={<Specialty_icon />}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewService;
