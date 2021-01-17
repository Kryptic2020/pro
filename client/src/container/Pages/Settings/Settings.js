import React from 'react';
import classes from './styles.module.css';
import Card_settings from '../../../components/Card_settings/Card_settings';
import Heading from '../../../components/UI/Heading/Heading';
import Specialty_icon from '../../../components/UI/Iconsx/Specialty';

const Settings = (props) => {
	return (
		<div className={classes.container}>
			<Heading text={'Settings'} />
			<div>
				<Card_settings
					background_color={'#11b9f0'}
					path={'/loginx'}
					icon={<Specialty_icon />}
					title={'Setup Specialties'}
					content={
						'djasj asjdajdk alskdj lasjd lasdj laskdj ksalj alskdj alsdj aslkjdakljdsakj klasdj kasld ja klsjdk lajdkalj laksjdk aljskdjal jsadjajdsal kasjdka jdsladjaskdjsa ldjsadjasdkasjdlaj daslkdjalkdjaslkdjas aspojdsp oad klasdj kasld ja klsjdk lajdkalj laksjdk aljskdjal jsadjajdsal kasjdka jdsladjaskdjsa '
					}
				/>
			</div>
		</div>
	);
};

export default Settings;
