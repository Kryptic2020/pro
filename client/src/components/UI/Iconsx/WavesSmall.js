import React from 'react';

const Waves = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		xlink='http://www.w3.org/1999/xlink'
		//width='439.021'
		//height='298.954'
		viewBox='0 0 378 298'
		//viewBox='0 0 1200 120'
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
				<stop offset='0' stopColor='#11b9f0' />
				<stop offset='0.165' stopColor='#15bfe7' />
				<stop offset='1' stopColor='#38f495' />
			</linearGradient>
			<filter
				id='Path_36'
				x='0'
				y='0'
				//width='439.021'
				//height='298.954'
				filterUnits='userSpaceOnUse'
			>
				<feOffset dy='3' input='SourceAlpha' />
				<feGaussianBlur
					stdDeviation='10'
					result='blur'
				/>
				<feFlood floodOpacity='0.161' />
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
				d='M360.707,170.249s-35.342,58.921-97.432,59.674S123.954,191.706,69.532,192.89s-87.847,31.467-87.847,31.467L-15.941-9.021H360.707Z'
				transform='translate(16.31 9.02)'
				//transform='translate(0 0)'
				fill='url(#linear-gradient)'
			/>
		</g>
	</svg>
);

export default Waves;
