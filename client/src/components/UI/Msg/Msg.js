import React from 'react';
import Alert from 'react-bootstrap/Alert';

const msg = props => {
	return (
		<div className="center">
  				{props.msn ?
  					<Alert variant="warning " id='msn' onClick={props.clicked} style={{ marginBottom: '20px', marginTop:'20px'}}>
  						<Alert.Heading>
						    {props.msn}
  						</Alert.Heading>
  					</Alert> : null
  				}
  				</div>
	);
};

export default msg;