import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './styles.module.css';
import * as actions from '../../../store/actions';
import CardCustom from '../../../components/CardCustom/CardCustom';
import Heading from '../../../components/UI/Heading/Heading';
import Calendar from '../../../components/UI/Iconsx/Calendar';

const CalendarManager = () => {
	useEffect(() => {
		actions.scrollToTop();
	});
	return (
		<>
			<div className={classes.container}>
				<div className={classes.heading}>
					<Heading text={'Settings >'} />
				</div>

				<div className={classes.subcontainer}>
					<div className={classes.box}>
						<div className={classes.box_icon}>
							<Calendar fill={'#38F495'} />
						</div>
						<div className={classes.box_text}>
							Calendar Manager Options
						</div>
					</div>

					<div className={classes.card}>
						<Link to={'/slots-create'}>
							<CardCustom
								background_color={'#11B9F0'}
								display={'none'}
								title={'Create Slots'}
								content={[
									'Create Slots, visible or invisible to your clients.',
									<div key={'1'}>
										Lorem ipsum dolor
										sit amet, consetetur
										sadipscing elitr,
										sed diam nonumy
										eirmod tempor
										invidunt ut labore .
									</div>,
									'',
								]}
							/>
						</Link>
					</div>
					<div className={classes.card}>
						<Link to={'/slots-override'}>
							<CardCustom
								background_color={'#504F4B'}
								display={'none'}
								title={'Override Slots'}
								content={[
									'Override existing slots to make then visible or invisible to your clients.',
									<div key={'2'}>
										Lorem ipsum dolor
										sit amet, consetetur
										sadipscing elitr,
										sed diam nonumy
										eirmod tempor
										invidunt ut labore .
									</div>,
								]}
							/>
						</Link>
					</div>
					<div className={classes.card}>
						<Link to='/slots-delete'>
							<CardCustom
								background_color={'#FC0000'}
								display={'none'}
								title={'Delete slots'}
								content={[
									'Delete existing Slots.',
									<div key={'3'}>
										Lorem ipsum dolor
										sit amet, consetetur
										sadipscing elitr,
										sed diam nonumy
										eirmod tempor
										invidunt ut labore .
									</div>,
								]}
							/>
						</Link>
					</div>
					<div className={classes.card}>
						<Link to={'/slot-history'}>
							<CardCustom
								background_color={'#EAE8E8'}
								color={'#504F4B'}
								title_color={'#504F4B'}
								display={'none'}
								title={'Slot History'}
								content={[
									'Shows the history of each Slot update made by users with details.',
									<div key={'4'}>
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
								]}
							/>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default CalendarManager;
