import React from 'react';
import { Link } from 'react-router-dom';
import classes from './styles.module.css';
import CardCustom from '../../../components/CardCustom/CardCustom';
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
						<Link to='/my-slots'>
							<CardCustom
								background_color={'#11B9F0'}
								display={'none'}
								title={'My Slots'}
								content={[
									'',
									<div>
										Lorem ipsum dolor
										sit amet, consetetur
										sadipscing elitr,
										sed diam nonumy
										eirmod tempor
										invidunt ut labore
										et dolore magna
										aliquyam erat, sed
										diam voluptua
									</div>,
									'',
								]}
							/>
						</Link>
					</div>
					<div className={classes.card}>
						<Link to='/waiting-list-report'>
							<CardCustom
								background_color={'#504F4B'}
								display={'none'}
								title={
									'Waiting List Report'
								}
								content={[
									'',
									<div>
										Lorem ipsum dolor
										sit amet, consetetur
										sadipscing elitr,
										sed diam nonumy
										eirmod tempor
										invidunt ut labore
										et dolore magna
										aliquyam erat, sed
										diam voluptua
									</div>,
									'',
								]}
							/>
						</Link>
					</div>
					<div className={classes.card}>
						<Link to='/sales'>
							{' '}
							<CardCustom
								background_color={'#EAE8E8'}
								color={'#504F4B'}
								title_color={'#504F4B'}
								display={'none'}
								title={'Sales'}
								content={[
									'',
									<div>
										Lorem ipsum dolor
										sit amet, consetetur
										sadipscing elitr,
										sed diam nonumy
										eirmod tempor
										invidunt ut labore
										et dolore magna
										aliquyam erat, sed
										diam voluptua
									</div>,
									'',
								]}
							/>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
