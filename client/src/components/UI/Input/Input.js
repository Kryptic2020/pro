import React from 'react';

const input = (props) => {
	return (
		<div style={{ marginTop: '10px', width: '100%' }}>
			<label
				style={{ color: 'grey' }}
				className='left'
			>
				{props.label}
			</label>
			<label
				style={{ color: 'green' }}
				className='right'
			>
				{props.msg}
			</label>
			<input
				autocomplete='on'
				style={{
					fontSize: '18px',
					height: '50px',
					textAlign: 'center',
					color: 'black',
					backgroundColor: 'white',
					border: '2px solid grey',
					borderRadius: '5px',
				}}
				type={props.type}
				onClick={props.onClick}
				onChange={props.onChange}
			/>
		</div>
	);
};

export default input;
