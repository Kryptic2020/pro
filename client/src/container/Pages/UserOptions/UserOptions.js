import React from 'react';
import classes from './styles.module.css';
//import CardSettings from '../../../components/CardSettings/CardSettings';
import CardCustom from '../../../components/CardCustom/CardCustom';
import Heading from '../../../components/UI/Heading/Heading';
import User from '../../../components/UI/Iconsx/User';

const UserOptions = (props) => {
	return (
		<>
			<div className={classes.container}>
				<div className={classes.subcontainer}>
					<div className={classes.box}>
						<div className={classes.box_icon}>
							<User />
						</div>
						<div className={classes.box_text}>
							Options
						</div>
					</div>

					<div className={classes.card}>
						<CardCustom
							background_color={'#11B9F0'}
							path={'/booking-now'}
							display={'none'}
							title={'Booking Now'}
							content={[
								'',
								<div>
									Lorem ipsum dolor sit
									amet, consetetur
									sadipscing elitr, sed
									diam nonumy eirmod
									tempor invidunt ut
									labore et dolore magna
									aliquyam erat, sed diam
									voluptua
								</div>,
								'',
							]}
						/>
					</div>
					<div className={classes.card}>
						<CardCustom
							background_color={'#504F4B'}
							path={'/my-bookings'}
							display={'none'}
							title={'My Bookings'}
							content={[
								'',
								<div>
									Lorem ipsum dolor sit
									amet, consetetur
									sadipscing elitr, sed
									diam nonumy eirmod
									tempor invidunt ut
									labore et dolore magna
									aliquyam erat, sed diam
									voluptua
								</div>,
								'',
							]}
						/>
					</div>
					<div className={classes.card}>
						<CardCustom
							background_color={'#FC0000'}
							path={'/waiting-list'}
							display={'none'}
							title={'Waiting List'}
							content={[
								'',
								<div>
									Lorem ipsum dolor sit
									amet, consetetur
									sadipscing elitr, sed
									diam nonumy eirmod
									tempor invidunt ut
									labore et dolore magna
									aliquyam erat, sed diam
									voluptua
								</div>,
								'',
							]}
						/>
					</div>
					<div className={classes.card}>
						<CardCustom
							background_color={'#EAE8E8'}
							color={'#504F4B'}
							title_color={'#504F4B'}
							path={'/profile'}
							display={'none'}
							title={'Profile'}
							content={[
								'',
								<div>
									Lorem ipsum dolor sit
									amet, consetetur
									sadipscing elitr, sed
									diam nonumy eirmod
									tempor invidunt ut
									labore et dolore magna
									aliquyam erat, sed diam
									voluptua
								</div>,
								'',
							]}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserOptions;
