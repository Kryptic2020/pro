import React from 'react';
import { Link } from 'react-router-dom';
import classes from './styles.module.css';
import CardSettings from '../../../components/CardSettings/CardSettings';
import Heading from '../../../components/UI/Heading/Heading';
import SpecialtyIcon from '../../../components/UI/Iconsx/Specialty';
import Assigned from '../../../components/UI/Iconsx/Assigned';
import Clock from '../../../components/UI/Iconsx/Clock';
import Calendar from '../../../components/UI/Iconsx/Calendar';
import Profile from '../../../components/UI/Iconsx/Profile';
import SettingsIcon from '../../../components/UI/Iconsx/Settings';

const Settings = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.subcontainer}>
				<div className={classes.grid}>
					<div className={classes.icon_settings}>
						<SettingsIcon />
					</div>
					<div className={classes.settings_text}>
						Settings
					</div>
				</div>
				<div className={classes.box}>
					<div>
						<Link to='/specialty'>
							<CardSettings
								background_color={'#24CD98'}
								icon={<SpecialtyIcon />}
								title={'Setup Specialties'}
								content={[
									'Add new or delete existing Specialties.',
									<div>
										**Existing Specialty
										already assigned to
										a staff cannot be
										deleted, you need to
										first remove it from
										the assigned staff
										before deleting the
										Specialty.
									</div>,
									'',
								]}
							/>
						</Link>
					</div>
					<div>
						<Link to='/assign-staff'>
							<CardSettings
								background_color={'#11b9f0'}
								icon={<Assigned />}
								title={'Assign Staffs'}
								content={[
									'Add new or delete existing assignments.',
									<div>
										<div>
											Add new or
											delete services
											to the existing
											assignments.
										</div>
										<div>
											Add new or
											delete service
											description and
											price to the
											existing
											services.
										</div>
									</div>,
								]}
							/>
						</Link>
					</div>
					<div>
						<Link to='/time-tables'>
							<CardSettings
								background_color={'#504F4B'}
								icon={<Clock />}
								title={'Setup Time Tables'}
								content={[
									'Add new or Delete existing TimeTables.',
									<div>
										<div>
											** Each staff
											can have more
											than one time
											table.{' '}
										</div>
										<div>
											** Each staff
											has their own
											time tables with
											means you won’t
											be able to see
											time tables from
											other staffs.{' '}
										</div>
									</div>,
								]}
							/>
						</Link>
					</div>
					<div>
						<Link to='/calendar-manager'>
							<CardSettings
								background_color={'#24CD98'}
								icon={
									<Calendar
										fill={'#ffffff'}
									/>
								}
								title={'Calendar Manager'}
								content={[
									'Add new, update or delete existing spots on your Calendar.',
									<div>
										<div>
											** You can
											override
											unbooked spots
											by making them
											visible or
											invisible.
										</div>
										<div>
											** You won’t be
											able to override
											or delete spots
											that has been
											already booked.
										</div>
									</div>,
								]}
							/>
						</Link>
					</div>
					<div>
						<Link to='/profile-manager'>
							<CardSettings
								background_color={'#11b9f0'}
								icon={<Profile />}
								title={
									'Users Profile Manager'
								}
								content={[
									'Update or delete existing Contacts.',
									<div>
										<div>
											** You can grant
											or remove admin
											power to any
											user.
										</div>
										<div>
											** You can
											disable / enable
											users.
										</div>
										** You can write
										notes into users
										profiles, they won’t
										be able to see those
										notes unless they
										have admin power.
									</div>,
								]}
							/>
						</Link>
					</div>
					.
				</div>
			</div>
		</div>
	);
};

export default Settings;
