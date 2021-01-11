import React from 'react';

const label = props => {
	return (
		<div className="center" style={{ marginTop: '10px', width:'100%' }}>
			<label style={{ color:'white', fontSize:'18px'}}>{props.text}</label>
  	</div>
	);
};

export default label;