import React from 'react';

const WavesLarge = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		xlink='http://www.w3.org/1999/xlink'
		//width='1994.763'
		//height='511.441'
		viewBox='0 0 1994.763 511.441'
		preserveAspectRatio='none'
	>
		<defs>
			<linearGradient
				id='linear-gradient'
				x1='0.5'
				y1='0.897'
				x2='0.5'
				gradientUnits='objectBoundingBox'
			>
				<stop offset='0' stop-color='#11b9f0' />
				<stop offset='0.165' stop-color='#15bfe7' />
				<stop offset='1' stop-color='#38f495' />
			</linearGradient>
			<filter
				id='Path_36'
				x='0'
				y='0'
				//	width='1994.763'
				//	height='511.441'
				filterUnits='userSpaceOnUse'
			>
				<feOffset dy='3' input='SourceAlpha' />
				<feGaussianBlur
					stdDeviation='10'
					result='blur'
				/>
				<feFlood flood-opacity='0.161' />
				<feComposite operator='in' in2='blur' />
				<feComposite in='SourceGraphic' />
			</filter>
		</defs>
		<g
			transform='matrix(1, 0, 0, 1, 0, 0)'
			filter='url(#Path_36)'
		>
			<path
				id='Path_36-2'
				data-name='Path 36'
				d='M1916.448,329.661S1736.04,440.977,1419.1,442.4s-711.183-72.2-988.986-69.963S-18.315,431.884-18.315,431.884L-6.2-9.021H1916.448Z'
				transform='translate(48.31 36.02)'
				fill='url(#linear-gradient)'
			/>
		</g>
	</svg>
);

export default WavesLarge;
