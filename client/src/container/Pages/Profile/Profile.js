import React, { Component } from 'react';
import classes from './styles.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import CardProfile from '../../../components/CardProfile/CardProfile';
import Heading from '../../../components/UI/Heading/Heading';
import Switch from '../../../components/Selector/Selector';
import InputCustom from '../../../components/UI/InputCustom/InputCustom';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';

class Model extends Component {
	state = {
		isLoading: false,
	};
	render() {
		return (
			<div>
				{this.state.isLoading ? <Spinner /> : null}
				<div className={classes.container}>
					<Heading text={'User > Profile'} />
					<div>
						<CardProfile />
						<div
							className={classes.subcontainer}
						>
							<div
								className={
									classes.switch_status
								}
							>
								<Switch
									backgroundColor={
										'#11B9F0'
									}
									off='Deactivated'
									on='Active'
									text='User Status'
								/>
							</div>
							<div className={classes.box}>
								<div
									className={classes.text}
								>
									How many days ahead do
									you want your clients to
									see on your calendar ?
								</div>
								<div
									className={
										classes.input
									}
								>
									<InputCustom />
								</div>
							</div>
							<div
								className={
									classes.switch_admin
								}
							>
								<Switch
									backgroundColor={
										'#504F4B'
									}
									off='No'
									on='Yes'
									text='Admin Privileges'
								/>
							</div>
						</div>
						<ContinueButton text={'SAVE'} />
					</div>
				</div>
			</div>
		);
	}
}

export default Model;
