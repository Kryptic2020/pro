import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import CreateIcon from '@material-ui/icons/Create';
import Button from 'react-bootstrap/Button';
export class Location extends Component {
  state = {
  	textToCopy: '50 Mclachlan st, Fortitude Valley, 4006',
  };

  scrollToTop() {
  	window.scrollTo({
  		top: 0,
  		behavior: 'smooth',
  	});
  }
  componentDidMount() {
  	this.scrollToTop();
  }
  render() {
  	const style = {
  		//marginTop: '10px',
  		marginBottom: '180px',
  		width: '100vw',
  		height: '90hv',
  	};
  	return (
  		<div
  			style={{
  				minHeight: '900px',
  				marginTop: '77px',
  				minWidth: '320px',
  				maxWidth: '380px',
  			}}
  		>
  			<div className="container" style={{ height: '50px', width: '100%' }}>
  				<Button
  					variant="info"
  					style={{ marginTop: '10px', height: '30px', fontSize: '10px' }}
  					onClick={() => {
  						navigator.clipboard.writeText(this.state.textToCopy);
  					}}
  				>
  					<CreateIcon /> Copy{' '}
  				</Button>
  				<span
  					style={{
  						position: 'absolute',
  						paddingLeft: '5px',
  						paddingTop: '15px',
  						color: 'white',
  						fontSize: '15px',
  					}}
  				>
  					{' '}
            50 Mclachlan st, Fortitude Valley
  				</span>
  			</div>
  			{
  				<Map
  					style={style}
  					google={this.props.google}
  					initialCenter={{
  						lat: -27.458,
  						lng: 153.036569,
  					}}
  					zoom={18}
  				>
  					<Marker onClick={this.onMarkerClick} name={'Current location'} />

  					<InfoWindow onClose={this.onInfoWindowClose}>
  						<div>
  							<h1></h1>
  						</div>
  					</InfoWindow>
  				</Map>
  			}
  		</div>
  	);
  }
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyAj6iZxDMTc6yHEm0wqCIpQGsGmjiiq9VQ',
})(Location);
