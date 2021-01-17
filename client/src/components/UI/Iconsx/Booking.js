import React from 'react';

const Booking = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={props.width}
		height={props.height}
		viewBox='0 0 24 24'
	>
		<g
			id='Group_638'
			data-name='Group 638'
			transform='translate(-175.5 -1418)'
		>
			<g
				id='today-white-18dp'
				transform='translate(175.5 1418)'
			>
				<path
					id='Path_872'
					data-name='Path 872'
					d='M0,0H24V24H0Z'
					fill='none'
				/>
				<path
					id='Path_873'
					data-name='Path 873'
					d='M19,3H18V1H16V3H8V1H6V3H5A1.991,1.991,0,0,0,3.01,5L3,19a2,2,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V5A2.006,2.006,0,0,0,19,3Zm0,16H5V8H19ZM7,10h5v5H7Z'
					fill={props.fill}
				/>
			</g>
		</g>
	</svg>
);

export default Booking;
