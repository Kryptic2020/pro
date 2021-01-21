import React from 'react';
import classes from './styles.module.css';
import ButtonDelete from '../UI/ButtonDelete/ButtonDelete';
import ButtonBook from '../UI/ButtonBook/ButtonBook';
import ButtonEdit from '../UI/ButtonEdit/ButtonEdit';
import User from '../UI/Iconsx/User';

const CardProfileManager = (props) => {
	return (
		<div>
			<div className={classes.card}>
				<div className={classes.box}>
					<div className={classes.icon_box}>
						<div className={classes.icon}>
							<User />
						</div>
						<div className={classes.active}>
							{props.active}Active
						</div>
					</div>
					<div className={classes.user}>
						<div className={classes.name}>
							{props.name}email
						</div>
						<div className={classes.email}>
							{props.email}email
						</div>
						<div className={classes.phone}>
							{props.phone}email
						</div>
					</div>

					<div className={classes.info}>
						<div className={classes.provider}>
							{props.provider}provider
						</div>
						<div className={classes.verified}>
							{props.verified}provider
						</div>
						<div className={classes.admin}>
							{props.admin}provider
						</div>
					</div>

					<div className={classes.buttons}>
						<ButtonEdit
							onClick={props.onClick_edit}
						/>
						<ButtonBook
							onClick={props.onClick_book}
						/>
						<ButtonDelete
							onClick={props.onClick_delete}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardProfileManager;
