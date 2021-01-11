//SurveyField contem logic to render a single label and text input

import React from 'react';

export default ({ input, label, meta:{ error, touched } }) => {
	//console.log(meta);
	return (
		<div>
			<label className="text-white">{label}</label>
			<input className="text-white" {...input} style={{ marginBottom: '5px' }} />
			<div className="red-text" style={{ marginBottom: '20px' }}>
				{touched && error}
			</div>
		</div>
	);
};
