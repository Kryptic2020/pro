import React from 'react';
import classes from './styles.module.css';
import Form from 'react-bootstrap/Form';

const Selector = (props) => {
	return (
		<div
			style={{
				backgroundColor: props.backgroundColor,
			}}
			className={classes.container}
		>
			<div className={classes.headings}>
				{props.text}
			</div>
			<div>
				<div className=' center switch'>
					<label className={classes.label}>
						{props.off}
						<input
							onChange={props.onChange}
							type='checkbox'
						></input>
						<span className='lever'></span>
						{props.on}
					</label>
				</div>
			</div>
		</div>
	);
};

export default Selector;
