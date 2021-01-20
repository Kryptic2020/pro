import React from 'react';
import classes from './styles.module.css';
//import CardSettings from '../../../components/CardSettings/CardSettings';
import CardCustom from '../../../components/CardCustom/CardCustom';
import Heading from '../../../components/UI/Heading/Heading';
import DashboardIcon from '../../../components/UI/Iconsx/Dashboard';

const Dashboard = (props) => {
	return (
		<>
			<div className={classes.container}>
				<div className={classes.subcontainer}>
					<div className={classes.box}>
						<div className={classes.box_icon}>
							<DashboardIcon />
						</div>
						<div className={classes.box_text}>
							Dashboard
						</div>
					</div>

					<div className={classes.card}>
						<CardCustom
							background_color={'#11B9F0'}
							path={'/my-slots'}
							display={'none'}
							title={'My Slots'}
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
							path={'/waiting-list-report'}
							display={'none'}
							title={'Waiting List Report'}
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
							path={'/sales'}
							display={'none'}
							title={'Sales'}
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

export default Dashboard;
