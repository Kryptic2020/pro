import React from 'react';
//import { Link } from 'react-router-dom';

const timeTableItem = (props) => (
	<div className="card #01579b light-blue darken-3 white-text container">
		<div>
			<div style={{ padding: '5px', marginLeft: '10px', fontSize: '18px', fontWeight: 'bold' }}>
				{props.name}
			</div>
			<div>
				<div className="center">
					<i className="material-icons small">
            schedule
					</i>
				</div>
				<div style={{
					border: '2px solid white',
					borderRadius:'5px 5px 5px 5px',
					fontSize: '18px',
					textAlign: 'center',
					padding: '5px',
					width: '100%',
					backgroundColor: 'white',
					color: '#01579b',
					fontWeight: 'bold'
          
				}}>
					{props.times.join(', ')}
				</div>
				<div style={{ height: '10px', width: '100%' }}>
				</div> 
			</div>
			<button
				onClick={props.onSelect.bind(this, props)}
				style={{
					fontWeight: 'bold',
					//color: 'orange',
					//width: '90px',
					marginLeft: '5px',
					//padding: '5px',
					backgroundColor:'#032641'
          
				}}
				className="white-text left btn-flat"
			>
        Select
			</button>
		</div>
		<div style={{ height: '10px', width: '100%' }}></div>
	</div>
);

export default timeTableItem;
