import React, { Component } from 'react';
import Axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class Contacts extends Component {
	state = {
		contacts: [],
		search: '',
		isLoading: true,
	};

	scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	componentDidMount() {
		/*	Axios.get('/api/contacts')
  		.then((res) => {
  			this.setState({ ...this.state, contacts: res.data, isLoading: false });
  		})
  		.catch((err) => {
  			//console.log(err);
  		});
  	this.scrollToTop();*/
	}

	render() {
		function compare(a, b) {
			if (a.fullName < b.fullName) {
				return -1;
			}
			if (a.fullName > b.fullName) {
				return 1;
			}
			return 0;
		}
		const filteredContacts = this.state.contacts.filter(
			(contact) => {
				let contactLowercase = contact.fullName.toLowerCase();
				let searchTermLowercase = this.state.search.toLowerCase();
				return (
					contactLowercase.indexOf(
						searchTermLowercase
					) > -1
				);
			}
		);

		let user = <Spinner />;
		if (!this.props.loading) {
			user = filteredContacts
				.sort(compare)
				.map((d) => (
					<div
						style={{
							padding: '20px',
							backgroundColor: 'black',
							fontSize: '15px',
						}}
						key={d._id}
						className='card white-text'
					>
						<div>
							<i className='material-icons small'>
								person
							</i>
							<span
								style={{
									position: 'absolute',
									paddingLeft: '10px',
									color: 'yellow',
									fontSize: '18px',
								}}
							>
								{d.isActive ? (
									'Active'
								) : (
									<span
										style={{
											color: 'red',
										}}
									>
										Disabled
									</span>
								)}
							</span>
							<Link
								className='right'
								to={{
									pathname: '/profile',
									state: { _id: d._id },
								}}
							>
								<Button variant='info'>
									Edit
								</Button>
							</Link>
						</div>
						<div>{d.fullName}</div>
						<div>{d.email}</div>
						<div>
							{d.phone === 9999999999
								? 'Phone Missing'
								: '0' + d.phone}
						</div>
						<div>
							{d.provider}
							<span
								style={{
									paddingLeft: '30px',
									paddingRight: '30px',
								}}
							>
								{d.isAdmin
									? 'Admin On'
									: 'Admin Off'}
							</span>
							{d.emailVerified
								? 'Email verified'
								: 'Email is Not verified'}
						</div>
						<div
							style={{
								height: '10px',
								width: '100%',
							}}
						></div>
						<div>
							<Link
								to={{
									pathname: '/bookingAdm',
									id: d._id,
									fullName: d.fullName,
								}}
							>
								<Button
									variant='secondary'
									style={{
										width: '100%',
									}}
								>
									Book
								</Button>
							</Link>
						</div>
					</div>
				));
		}

		return (
			<div
				className='container'
				style={{
					marginTop: '77px',
					minWidth: '320px',
					maxWidth: '380px',
				}}
			>
				<div>
					<div
						style={{
							height: '20px',
							width: '100%',
						}}
					></div>
					<input
						placeholder='Search'
						style={{
							textAlign: 'center',
							borderRadius: '5px 5px 5px 5px',
							width: '100%',
							backgroundColor: 'white',
							height: 40,
							fontSize: 25,
							color: '#01579b',
							borderBottomColor: 'white',
						}}
						onChange={(e) =>
							this.setState({
								search: e.target.value,
							})
						}
					></input>
					<hr />
					<div
						style={{
							overflowY: 'scroll',
							maxHeight: '550px',
						}}
					>
						{user}
					</div>
				</div>
				<div
					style={{
						height: '60px',
						width: '100%',
					}}
				></div>
			</div>
		);
	}
}

export default Contacts;
