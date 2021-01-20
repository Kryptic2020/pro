import React from 'react';
import classes from './styles.module.css';
import Form from 'react-bootstrap/Form';

const Selector = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.headings}>
				By default your Slots are visible to
				clients. You can create your Slots on
				invisible mode by shifting the selector
				below
			</div>
			<div>
				<div className=' center switch'>
					<label className={classes.label}>
						Visible Slots
						<input
							onChange={props.onChange}
							type='checkbox'
						></input>
						<span className='lever'></span>
						Invisible Slots
					</label>
				</div>
			</div>
		</div>
	);
};

export default Selector;
