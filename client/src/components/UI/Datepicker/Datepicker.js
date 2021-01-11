import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import './styles.css';
//import moment from 'moment';
import {
	SingleDatePicker,
} from 'react-dates';

//export default React.PureComponent;
export const pureComponentAvailable = true;

class Datepicker extends Component {
  state = {
  	date: null,
  };
  componentDidMount() {
  	//console.log(this.state.date);
  }

  render() {
  	return (
  		<div>
  			<SingleDatePicker
  				//showClearDates={true}
  				displayFormat={'DD/MM/YYYY'}
  				numberOfMonths={window.innerWidth < 600 ? 1 : 2}
  				withFullScreenPortal={true}
  				showDefaultInputIcon={true}
  				//isAMomentObject={true}
  				small={true}
  				//isUTC={false}
  				//isValid={true}
  				date={this.state.date} // momentPropTypes.momentObj or null
  				//startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
  				//endDate={this.state.endDate} // momentPropTypes.momentObj or null,
  				//endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
  				onDateChange={(date) => this.setState({ date})} // PropTypes.func.isRequired,
  				//focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
  				focused={this.state.focused} // PropTypes.bool
  				onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
  				id="your_unique_id" // PropTypes.string.isRequired,
  			/>

  		</div>
  	);
  }
}

export default Datepicker;
