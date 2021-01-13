import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';

import useStyles from './styles';

const LoginForm = (props) => {
	const [values, setValues] = React.useState({
		email: '',
		password: '',
		showPassword: false,
	});
	const classes = useStyles();
	const handleChange = (prop) => (event) => {
		setValues({
			...values,
			[prop]: event.target.value,
		});
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const { email, password } = values;

		if (email !== '' && password !== '') {
			console.log('Submited');
		} else {
			handleErrors();
		}
	};

	const handleErrors = () => {
		alert('Error');
	};

	return (
		<>
			<form noValidate autoComplete='off'>
				<FormControl fullWidth>
					<InputLabel htmlFor='email'>
						Email address
					</InputLabel>
					<Input
						className={classes.input1}
						id='email'
						type='email'
						value={values.email}
						onChange={handleChange('email')}
					/>
				</FormControl>
				<div
					style={{
						height: '16px',
						width: '100%',
					}}
				></div>
				<FormControl fullWidth>
					<InputLabel htmlFor='password'>
						Password
					</InputLabel>
					<Input
						className={classes.input1}
						id='password'
						type={
							values.showPassword
								? 'text'
								: 'password'
						}
						value={values.password}
						onChange={handleChange('password')}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton
									aria-label='toggle password visibility'
									onClick={
										handleClickShowPassword
									}
									onMouseDown={
										handleMouseDownPassword
									}
								>
									{values.showPassword ? (
										<Visibility />
									) : (
										<VisibilityOff />
									)}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
			</form>
		</>
	);
};

export default LoginForm;
