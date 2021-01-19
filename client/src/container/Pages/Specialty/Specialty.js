import React from 'react';
import classes from './styles.module.css';
import CardSpecialty from '../../../components/CardSpecialty/CardSpecialty';
import Heading from '../../../components/UI/Heading/Heading';
import InputCustom from '../../../components/UI/InputCustom/InputCustom';
import SpecialtyIcon from '../../../components/UI/Iconsx/Specialty';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';

const Specialty = (props) => {
	return (
		<div>
			<div className={classes.container}>
				<div className={classes.heading}>
					<Heading
						text={'Settings > Specialty'}
					/>
				</div>
				<div className={classes.specialty_box}>
					<div className={classes.input_box}>
						<InputCustom
							label={'Add Specialty'}
							icon={<SpecialtyIcon />}
						/>
					</div>
				</div>
				<div className={classes.continue}>
					<ContinueButton text='Continue' />
				</div>
				<div className={classes.text}>
					Specialty List
				</div>
				<div className={classes.card}>
					<CardSpecialty text={'Dentist'} />
					<CardSpecialty text={'Dentist'} />
					<CardSpecialty text={'Dentist'} />
					<CardSpecialty text={'Dentist'} />
					<CardSpecialty text={'Dentist'} />
					<CardSpecialty text={'Dentist'} />
					<CardSpecialty text={'Dentist'} />
					<CardSpecialty text={'Dentist'} />
				</div>
			</div>
		</div>
	);
};

export default Specialty;
