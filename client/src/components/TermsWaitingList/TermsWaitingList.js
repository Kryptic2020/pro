import React from 'react';
import classes from './styles.module.css';
import ButtonCustom from '../UI/ButtonCustom/ButtonCustom';
import ContinueButton from '../ContinueButton/ContinueButton';

const TermsConditions = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.subcontainer}>
				<div className={classes.box}>
					<div className={classes.title}>
						How does it works?
					</div>

					<div className={classes.button}>
						<ButtonCustom
							onClick={props.onClick_swap}
							text={
								props.button_text
									? props.button_text
									: 'Portugues'
							}
						/>
					</div>
				</div>
				<div className={classes.text}>
					Lorem ipsum dolor sit amet, consetetur
					sadipscing elitr, sed diam nonumy eirmod
					tempor invidunt ut labore et dolore
					magna aliquyam erat, sed diam voluptua.
					At vero eos et accusam et justo duo
					dolores et ea rebum. Stet clita kasd
					gubergren, no sea takimata sanctus est
					Lorem ipsum dolor sit amet. Lorem ipsum
					dolor sit amet, consetetur sadipscing
					elitr, sed diam nonumy eirmod tempor
					invidunt ut labore et dolore magna
					aliquyam erat, sed diam voluptua. Stet
					clita kasd gubergren, no sea takimata
					sanctus est Lorem ipsum dolor sit amet.
					{props.conditions}
				</div>
			</div>
			<ContinueButton
				onClick={props.onClick_continue}
				text='ACCEPT & REQUEST'
			/>
		</div>
	);
};

export default TermsConditions;
