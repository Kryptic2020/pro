import React from 'react';
import classes from './styles.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SelectDate = (props) => {
	//Datepicker  - COMPONENT 4
	/*	scrollToTop() {
  	window.scrollTo({
  		top: 0,
  		behavior: 'smooth'
  	});
	}

  setDate = (date) => {
  	this.setState({ date });
  };

	datepickerHandler = (date) => {
		
  	this.setState({date});
  	const e = new Date(date)
  			.toLocaleDateString('es-ES', {
  				year: 'numeric',
  				month: 'numeric',
  				day: 'numeric',
  			});
		//console.log(e, new Date());
  	let timeArray = [];
  	if (new Date()
  			.toLocaleDateString('es-ES', {
  				year: 'numeric',
  				month: 'numeric',
  				day: 'numeric',
  			}) === e) {
			this.state.timeOfremainingSpots.sort().map((profile) => {
  		  if (parseISO(profile.date).toLocaleDateString('es-ES', {
  				year: 'numeric',
  				month: 'numeric',
  				day: 'numeric',
  			}) === e) {
  			  if (!profile.isBooked && profile.specialty === this.state.specialty) {
  				  if (profile.time.substring(0, 2) > new Date().getHours()) timeArray.push(profile.time);
  			  }
  		  }
  		}); if(timeArray.length<1) {this.scrollToTop();this.setState({msn:'Ops, I am sorry, Its fully booked for today', appointment: '', staff:'', staffID:'', specialty: '', date: '', selection:[], serviceName:'', price:''});document.getElementById('specialty').value = document.getElementById('specialty').defaultValue;}
  	} else {
  		this.state.timeOfremainingSpots.sort().map((profile) => {
  		if (parseISO(profile.date).toLocaleDateString('es-ES', {
  				year: 'numeric',
  				month: 'numeric',
  				day: 'numeric',
  			}) === e) {
  			if (!profile.isBooked && profile.specialty === this.state.specialty) {
						timeArray.push(profile.time);
						//console.log(profile.time.substring(0, 2), new Date().getHours());
  			}
  		}
  	});
  	};
  	
		

  	//P.time.substring(0, 2) > new Date().getHours()+2
  	this.setState({ selection: timeArray });
	}; 
	
	datepickerRender() {
  	const CustomInput = ({ value, onClick }) => (
  		<button className='left' style={{ width: '100%', height: '50px', fontSize: '18px', color: '#01579b', backgroundColor: 'white', borderRadius: '5px 5px 5px 5px' }} onClick={onClick}>
  			<span style={{ paddingLeft: '8px' }} className='left'>{value}</span>
  		</button>
		);
  	return (
  		<div>
  			<label style={{ width: '120px', fontSize: '15px', color: 'white' }}>Date</label>
  			<div>
  				<DatePicker
  					//style={{ width: '100%', color: '#01579b', fontWeight: "bold", backgroundColor: "white" }}
						selected={this.state.date}
						onChange={(date) => this.datepickerHandler(date)}
						withPortal
						dateFormat="dd/MM/yyyy"
						customInput={<CustomInput />}
						//placeholderText="Select Start Date"
						//openToDate={new Date()}
						//locale={fi}
						//locale={enGB}
						minDate={new Date()}
						//maxDate={addDays(new Date(), this.props.auth.daysCalendarView)}
  					includeDates={this.state.dateOfremainingSpots}
  					highlightDates={this.state.dateOfremainingSpots}
  					//excludeDates={[new Date(), subDays(new Date(), 1)]}
  				/>
  			</div>
  		</div>
      
  	);
	}

*/
	const CustomInput = ({ value, onClick }) => (
		<button className={classes.box} onClick={onClick}>
			<span className={classes.inbox}>{value}</span>
		</button>
	);
	return (
		<div>
			<label className={classes.label}>
				{props.label}
			</label>
			<div>
				<DatePicker
					className={classes.inbox}
					selected={props.selected}
					onChange={props.onChange}
					withPortal
					dateFormat='dd/MM/yyyy'
					customInput={<CustomInput />}
					//placeholderText="Select Start Date"
					//openToDate={new Date()}
					//locale={fi}
					//locale={enGB}
					minDate={props.minDate}
					//maxDate={addDays(new Date(), this.props.auth.daysCalendarView)}
					includeDates={props.includeDates}
					highlightDates={props.highlightDates}
					//excludeDates={[new Date(), subDays(new Date(), 1)]}
				/>
			</div>
		</div>
	);
};

export default SelectDate;
