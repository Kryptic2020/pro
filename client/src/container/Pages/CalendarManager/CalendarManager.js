import React, { useEffect } from 'react';
import classes from './styles.module.css';
import * as actions from '../../../store/actions';
import CardSettings from '../../../components/CardSettings/CardSettings';
import CardCustom from '../../../components/CardCustom/CardCustom';
import Heading from '../../../components/UI/Heading/Heading';
import Calendar from '../../../components/UI/Iconsx/Calendar';

const CalendarManager = (props) => {
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
						<CardCustom
							background_color={'#11B9F0'}
							path={'/slots-create'}
							display={'none'}
							title={'Create Slots'}
							content={[
								'Create Slots, visible or invisible to your clients.',
								<div>
									Lorem ipsum dolor sit
									amet, consetetur
									sadipscing elitr, sed
									diam nonumy eirmod
									tempor invidunt ut
									labore .
								</div>,
								'',
							]}
						/>
					</div>
					<div className={classes.card}>
						<CardCustom
							background_color={'#504F4B'}
							path={'/slots-override'}
							display={'none'}
							title={'Override Slots'}
							content={[
								'Override existing slots to make then visible or invisible to your clients.',
								<div>
									<div>
										Lorem ipsum dolor
										sit amet, consetetur
										sadipscing elitr,
										sed diam nonumy
										eirmod tempor
										invidunt ut labore .
									</div>
								</div>,
							]}
						/>
					</div>
					<div className={classes.card}>
						<CardCustom
							background_color={'#FC0000'}
							path={'/slots-delete'}
							display={'none'}
							title={'Delete slots'}
							content={[
								'Delete existing Slots.',
								<div>
									<div>
										Lorem ipsum dolor
										sit amet, consetetur
										sadipscing elitr,
										sed diam nonumy
										eirmod tempor
										invidunt ut labore .
									</div>
								</div>,
							]}
						/>
					</div>
					<div className={classes.card}>
						<CardCustom
							background_color={'#EAE8E8'}
							color={'#504F4B'}
							title_color={'#504F4B'}
							path={'/slot-history'}
							display={'none'}
							title={'Slot History'}
							content={[
								'Shows the history of each Slot update made by users with details.',
								<div>
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
									</div>
								</div>,
							]}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default CalendarManager;
