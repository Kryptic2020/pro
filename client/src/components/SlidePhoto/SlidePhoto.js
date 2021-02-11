import React from 'react';
import ButtonSelect from '../UI/ButtonSelect/ButtonSelect';
import classes from './styles.module.css';

const SlideSpecialty = (props) => {
	return (
		<div className={classes.container}>
			<img
				className={classes.photo}
				alt='Database'
				style={{ borderRadius: '50%' }}
				src={props.photo}
				//width={250}
				//height={250}
			/>

			<div className={classes.text}>
				{props.staff}
			</div>
			<div className={classes.button}>
				<ButtonSelect
					buttonName={'SELECT'}
					onClick={() => props.onClick(props)}
					display={props.display}
					staffID={props.staffID}
				/>
			</div>
		</div>
	);
};
/*
		const data = this.props.photo;
		const Example = ({ data }) => (
			<img
				alt='Image Database'
				style={{ borderRadius: '50%' }}
				src={`${data}`}
				width={250}
				height={250}
			/>
		);*/

export default SlideSpecialty;
