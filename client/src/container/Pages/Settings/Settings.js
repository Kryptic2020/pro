import React from 'react';
import classes from './styles.module.css';
import CardSettings from '../../../components/CardSettings/CardSettings';
import Heading from '../../../components/UI/Heading/Heading';
import SpecialtyIcon from '../../../components/UI/Iconsx/Specialty';

const Settings = (props) => {
	return (
		<div>
			<div className={classes.container}>
				<div>
					<Heading text={'Settings'} />
				</div>

				<div>
					<CardSettings
						background_color={'#24CD98'}
						path={'/specialty'}
						icon={<SpecialtyIcon />}
						title={'Setup Specialties'}
						content={[
							'Add new or delete existing Specialties.',
							<div>
								**Existing Specialty already
								assigned to a staff cannot
								be deleted, you need to
								first remove it from the
								assigned staff before
								deleting the Specialty.
							</div>,
							'',
						]}
					/>
				</div>
				<div>
					<CardSettings
						background_color={'#11b9f0'}
						path={'/assign-staff'}
						icon={<SpecialtyIcon />}
						title={'Assign Staffs'}
						content={[
							'Add new or delete existing assignments.',
							<div>
								<div>
									Add new or delete
									services to the existing
									assignments.
								</div>
								<div>
									Add new or delete
									service description and
									price to the existing
									services.
								</div>
							</div>,
						]}
					/>
				</div>
				<div>
					<CardSettings
						background_color={'#504F4B'}
						path={'/time-tables'}
						icon={<SpecialtyIcon />}
						title={'Setup Time Tables'}
						content={[
							'Add new or Delete existing TimeTables.',
							<div>
								<div>
									** Each staff can have
									more than one time
									table.{' '}
								</div>
								<div>
									** Each staff has their
									own time tables with
									means you won’t be able
									to see time tables from
									other staffs.{' '}
								</div>
							</div>,
						]}
					/>
				</div>
				<div>
					<CardSettings
						background_color={'#11b9f0'}
						path={'/calendar-manager'}
						icon={<SpecialtyIcon />}
						title={'Calendar Manager'}
						content={[
							'Add new, update or delete existing spots on your Calendar.',
							<div>
								<div>
									** You can override
									unbooked spots by making
									them visible or
									invisible.
								</div>
								<div>
									** You won’t be able to
									override or delete spots
									that has been already
									booked.
								</div>
							</div>,
						]}
					/>
				</div>
			</div>
		</div>
	);
};

export default Settings;
