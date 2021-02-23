import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import CardCustom from '../../../components/CardCustom/CardCustom';
import User from '../../../components/UI/Iconsx/User';
import classes from './styles.module.css';

class UserOptions extends Component {
	render() {
		return (
			<>
				<div className={classes.container}>
					<div className={classes.subcontainer}>
						<div className={classes.box}>
							<div
								className={classes.box_icon}
							>
								<User />
							</div>
							<div
								className={classes.box_text}
							>
								Options
							</div>
						</div>

						<div className={classes.card}>
							<Link to='/book-now'>
								{' '}
								<CardCustom
									background_color={
										'#11B9F0'
									}
									path={'/booking-now'}
									display={'none'}
									title={'Booking Now'}
									content={[
										'',
										<div key='1'>
											Lorem ipsum
											dolor sit amet,
											consetetur
											sadipscing
											elitr, sed diam
											nonumy eirmod
											tempor invidunt
											ut labore et
											dolore magna
											aliquyam erat,
											sed diam
											voluptua
										</div>,
										'',
									]}
								/>
							</Link>
						</div>
						<div className={classes.card}>
							<Link to='/my-bookings'>
								<CardCustom
									background_color={
										'#504F4B'
									}
									display={'none'}
									title={'My Bookings'}
									content={[
										'',
										<div key='2'>
											Lorem ipsum
											dolor sit amet,
											consetetur
											sadipscing
											elitr, sed diam
											nonumy eirmod
											tempor invidunt
											ut labore et
											dolore magna
											aliquyam erat,
											sed diam
											voluptua
										</div>,
										'',
									]}
								/>
							</Link>
						</div>
						<div className={classes.card}>
							<Link to='/waiting-list'>
								<CardCustom
									background_color={
										'#24CD98'
									}
									display={'none'}
									title={'Waiting List'}
									content={[
										'',
										<div key='3'>
											Lorem ipsum
											dolor sit amet,
											consetetur
											sadipscing
											elitr, sed diam
											nonumy eirmod
											tempor invidunt
											ut labore et
											dolore magna
											aliquyam erat,
											sed diam
											voluptua
										</div>,
										'',
									]}
								/>
							</Link>
						</div>
						<div className={classes.card}>
							<Link
								to={{
									pathname: '/profile',
									state: {
										_id: this.props.auth
											._id,
									},
								}}
							>
								<CardCustom
									background_color={
										'#EAE8E8'
									}
									color={'#504F4B'}
									title_color={'#504F4B'}
									display={'none'}
									title={'Profile'}
									content={[
										'',
										<div key='4'>
											Lorem ipsum
											dolor sit amet,
											consetetur
											sadipscing
											elitr, sed diam
											nonumy eirmod
											tempor invidunt
											ut labore et
											dolore magna
											aliquyam erat,
											sed diam
											voluptua
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
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		//fullName: state.auth.fullName,
		//color: state.auth.theme,
	};
};

export default withRouter(
	connect(mapStateToProps, null)(UserOptions)
);
