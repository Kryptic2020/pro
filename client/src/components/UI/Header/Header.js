import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
//import HomeIcon from '@material-ui/icons/Home';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

class Header extends Component {

	render() {
		const myNav = (
			<div >
				<Navbar fixed="top" style={{ backgroundColor: 'black' }}>
					<Nav  className="mr-auto">
						<span  onClick={this.props.history.goBack}><ArrowBackIosIcon style={{ width:'65px',fontSize: '30px'}} /></span>
					</Nav>
					<Nav   className="mr-auto" style={{
						//marginLeft: '25%',
						//marginTop: '5px',
						color: 'white',
						fontSize: '35px',
						fontFamily: 'Dancing Script',//'Freestyle Script', //'Edwardian Script ITC'
						fontWeight: 'bold'
					  }}>
							PriThi
					</Nav>
					<Nav className="justify-content-end">
						{this.props.auth.authenticated ? <Button style={{ width:'80px'}} variant="outline-secondary" href="/api/logout">Logout</Button> : <div style={{ width:'65px'}}><Link  to="/auth"><Button   variant="outline-warning " >Login</Button></Link></div>
						}
					</Nav>
				</Navbar>
				<Navbar className="center" style={{fontSize:'12px' ,backgroundColor: 'black'}} fixed="bottom"><span style={{paddingLeft:'10%'}}> <a href='https://aquenzitech.com/'>Powered By Aquenzitech</a></span> <span  style={{paddingLeft:'10%' }}> &copy; Copyright 2020</span></Navbar>
			</div>
		);
    
		return (
			<div >
				<div>{myNav}</div>
			</div>
		);
	}
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		fullName:state.auth.fullName
	};
};

export default withRouter(connect(mapStateToProps,null)(Header));