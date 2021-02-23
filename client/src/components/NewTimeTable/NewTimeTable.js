import React from 'react';
import classe from './styles.module.css';
import InputCustom from '../UI/InputCustom/InputCustom';
import SelectCustom from '../UI/SelectCustom/SelectCustom';
import Select from '@material-ui/core/Select';
import Clock from '../UI/Iconsx/Clock';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 2,
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
			border: 'none',
			color: '#000000',
		},
	},
};

const NewTimeTable = (props) => {
	const classes = useStyles();

	const options = (
		<>
			<option
				id='optionClear'
				aria-label='None'
				value=''
			/>
			<option
				style={{
					fontSize: '18px',
					fontWeight: 'bold',
				}}
				value={1}
			>
				Every 1hour
			</option>
			<option
				style={{
					fontSize: '18px',
					fontWeight: 'bold',
				}}
				value={30}
			>
				Every 30min
			</option>
			<option
				style={{
					fontSize: '18px',
					fontWeight: 'bold',
				}}
				value={15}
			>
				Every 15min
			</option>
			<option
				style={{
					fontSize: '18px',
					fontWeight: 'bold',
				}}
				value={10}
			>
				Every 10min
			</option>
			<option
				style={{
					fontSize: '18px',
					fontWeight: 'bold',
				}}
				value={5}
			>
				Every 5min
			</option>
		</>
	);

	let bolo = [];
	if (props.cicle === '5') {
		var fives = [
			'00',
			'05',
			'10',
			'15',
			'20',
			'25',
			'30',
			'35',
			'40',
			'45',
			'50',
			'55',
		];
		//var names = [];
		for (var i = 0; i < 24; i++) {
			for (var j = 0; j < 12; j++) {
				var time = i + ':' + fives[j];
				if (i < 10) {
					time = '0' + time;
				}
				bolo.push(time);
			}
		}
	}

	if (props.cicle === '10') {
		var tens = ['00', '10', '20', '30', '40', '50'];
		bolo = [];
		for (var a = 0; a < 24; a++) {
			for (var b = 0; b < 6; b++) {
				var time1 = a + ':' + tens[b];
				if (a < 10) {
					time1 = '0' + time1;
				}
				bolo.push(time1);
			}
		}
	}

	if (props.cicle === '15') {
		var quarterHours = ['00', '15', '30', '45'];
		bolo = [];
		for (var e = 0; e < 24; e++) {
			for (var f = 0; f < 4; f++) {
				var time2 = e + ':' + quarterHours[f];
				if (e < 10) {
					time2 = '0' + time2;
				}
				bolo.push(time2);
			}
		}
	}

	if (props.cicle === '30') {
		var halfs = ['00', '30'];
		bolo = [];
		for (var g = 0; g < 24; g++) {
			for (var h = 0; h < 2; h++) {
				var time3 = g + ':' + halfs[h];
				if (g < 10) {
					time3 = '0' + time3;
				}
				bolo.push(time3);
			}
		}
	}

	if (props.cicle === '1') {
		var hours = ['00'];
		bolo = [];
		for (var l = 0; l < 24; l++) {
			for (var m = 0; m < 1; m++) {
				var time4 = l + ':' + hours[m];
				if (l < 10) {
					time4 = '0' + time4;
				}
				bolo.push(time4);
			}
		}
	}

	if (props.cicle === '') {
		bolo = ['null'];
	}

	return (
		<div className={classe.container}>
			<div className={classe.box}>
				<div className={classe.action}>
					<div className={classe.action_icon}>
						<Clock />
					</div>
					<div className={classe.action_text}>
						Add New Time Table
					</div>
				</div>

				<div className={classe.table_name}>
					<InputCustom
						id='name'
						onChange={props.onChange}
						type='text'
						value={props.value_name}
						label={'Table Name'}
						display_icon={'none'}
						//icon={<Specialty_icon />}
					/>
				</div>
				<div className={classe.period}>
					<SelectCustom
						id='period'
						onChange={props.onChange_period}
						options={options}
						display_icon={'none'}
						label={'Select Period'}
					/>
				</div>
				<div className={classe.time_slots}>
					<label className={classe.label}>
						Select Times
					</label>
					<FormControl
						className={classe.form}
						variant='outlined'
					>
						<Select
							className={classe.selected}
							labelId='mutiple-chip'
							id='times'
							multiple
							value={props.value}
							onChange={props.onChange_slots}
							//input={<Input id="select-multiple-chip" />}
							renderValue={(selected) => (
								<div
									className={
										classes.chips
									}
								>
									{selected
										.sort()
										.map((value) => (
											<Chip
												key={value}
												label={
													value
												}
												className={
													classes.chip
												}
											/>
										))}
								</div>
							)}
							MenuProps={MenuProps}
						>
							{bolo.sort().map((name) => (
								<MenuItem
									key={name}
									value={name}
									style={{
										fontSize: '18px',
										color: ':#01579b',
										fontWeight: 'bold',
									}}
								>
									{name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
			</div>
		</div>
	);
};

export default NewTimeTable;
