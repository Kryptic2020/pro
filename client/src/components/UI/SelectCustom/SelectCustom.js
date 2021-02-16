import React from 'react';
import classes from './styles.module.css';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

const Select_custom = (props) => {
	/*const option = props.users.map((m) =>
		m.isAdmin ? (
			<option
				key={m.fullName}
				value={[m._id, m.fullName]}
			>
				{m.fullName}
			</option>
		) : null
	);*/
	return (
		<div>
			<FormControl
				style={{
					width: '100%',
				}}
				variant='outlined'
			>
				<label
					style={{
						display: props.display_icon,
					}}
					className={classes.icon}
				>
					{props.icon}
				</label>
				<label className={classes.label}>
					{props.label}
				</label>

				<div>
					<Select
						style={{
							border: 'none',
							color: '#504f4b',
							textAlign: 'center',
							height: props.height,
							width: props.width,
							lineHeight: props.lineHeight,
							borderRadius: '5px',
						}}
						className={classes.select}
						native
						open={props.open}
						onClose={props.onClose}
						onOpen={props.onOpen}
						value={props.value}
						onChange={props.onChange}
						MenuProps={props.MenuProps}
						inputProps={{
							name: props.name,
							id: props.id,
						}}
					>
						<option value='' /> {props.options}
					</Select>
				</div>
			</FormControl>
		</div>
	);
};

export default Select_custom;
