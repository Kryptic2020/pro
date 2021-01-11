import React from 'react';

import './Input.css';

const input = props => {
	return (
		<div style={{ marginTop: '10px', width:'100%' }}>
			<label style={{ color: 'white'}} className="left">{props.label}</label>
			<label style={{ color: 'yellow'}} className="right">{props.msg}</label>
  		<input
				style={{ fontSize: '18px', height: '45px',  textAlign: 'center', color: 'black', backgroundColor: 'white', borderRadius: '5px' }}
				type={props.type}
				onClick={props.onClick}
				onChange={props.onChange}
  		/>
  	</div>
	);
};
/*
const input = props => {
	let inputElement = <input {...props.config} onChange={props.onChange} />;
	if (props.elType === 'textarea') {
		inputElement = <textarea {...props.config} onChange={props.onChange} />;
	}
	return (
		<div className="input">
			<label>{props.label}</label>
			{inputElement}
		</div>
	);
};*/

export default input;
