import React from 'react';
import classes from './styles.module.css';

const SelectWeekDays = (props) => {
	/*	
  //WEEKDAYS & OPEN/CLOSE VIEW - COMPONENT 5
  Mon = () => {
  	if (this.state.Mon === 'Empty') {
  		this.setState({ Mon: 'Mon' });
  	} else {
  		this.setState({ Mon: 'Empty' });
  	}
  }

  Tue = () => {
  	if (this.state.Tue === 'Empty') {
  		this.setState({ Tue: 'Tue' });
  	} else {
  		this.setState({ Tue: 'Empty' });
  	}
  }

  Wed = () => {
  	if (this.state.Wed === 'Empty') {
  		this.setState({ Wed: 'Wed' });
  	} else {
  		this.setState({ Wed: 'Empty' });
  	}
  }

  Thu = () => {
  	if (this.state.Thu === 'Empty') {
  		this.setState({ Thu: 'Thu' });
  	} else {
  		this.setState({ Thu: 'Empty' });
  	}
  }

  Fri = () => {
  	if (this.state.Fri === 'Empty') {
  		this.setState({ Fri: 'Fri' });
  	} else {
  		this.setState({ Fri: 'Empty' });
  	}
  }

  Sat = () => {
  	if (this.state.Sat === 'Empty') {
  		this.setState({ Sat: 'Sat' });
  	} else {
  		this.setState({ Sat: 'Empty' });
  	}
  }

  Sun = () => {
  	if (this.state.Sun === 'Empty') {
  		this.setState({ Sun: 'Sun' });
  	} else {
  		this.setState({ Sun: 'Empty' });
  	}
  } 

  OpenCloseViewHandler = (e) => {
  	this.setState({ openView: e.target.checked }); 
  }  
  
  renderWeekdays() {
  	return (
  		<div>
  		
  			<div>
  				<Button size="sm"  onClick={this.Mon}  variant={this.state.Mon === 'Empty' ? 'outline-primary':'outline-danger' }>Mon</Button>
  				<Button size="sm" style={{ marginLeft: '1px', width: '44px', height: '35px', fontSize: '11px'}}  onClick={this.Tue} variant={this.state.Tue === 'Empty' ? 'outline-primary':'outline-danger' }>Tue</Button>
  				<Button size="sm" style={{ marginLeft: '1px', width: '44px', height: '35px', fontSize: '11px'}}  onClick={this.Wed} variant={this.state.Wed === 'Empty' ? 'outline-primary':'outline-danger' }>Wed</Button>
  				<Button size="sm" style={{ marginLeft: '1px', width: '44px', height: '35px', fontSize: '11px'}}  onClick={this.Thu} variant={this.state.Thu === 'Empty' ? 'outline-primary':'outline-danger' }>Thu</Button>
  				<Button size="sm" style={{ marginLeft: '1px', width: '44px', height: '35px', fontSize: '11px'}}  onClick={this.Fri} variant={this.state.Fri === 'Empty' ? 'outline-primary':'outline-danger' }>Fri</Button>
  				<Button size="sm" style={{ marginLeft: '1px', width: '44px', height: '35px', fontSize: '11px'}}  onClick={this.Sat} variant={this.state.Sat === 'Empty' ? 'outline-primary':'outline-danger' }>Sat</Button>
  				<Button size="sm" style={{ marginLeft: '1px', width: '44px', height: '35px', fontSize: '11px'}}  onClick={this.Sun} variant={this.state.Sun === 'Empty' ? 'outline-primary':'outline-danger' }>Sun</Button>
  				<div style={{ height: '20px', width: '100%' }}></div>
  				<div style={{ backgroundColor: 'white', borderRadius: '5px', padding: '5px'}}>
  					<label style={{ color: '#01579b' }}><h6>Select "OpenView" if you want it to be seem by everyone</h6></label>
  					<div className=" center switch">
  						<label style={{ color: '#01579b', fontSize:'13px' }}>
                closed View
  							<input onChange = {this.OpenCloseViewHandler} type="checkbox"></input>
  							<span className="lever"></span>
                Open view
  						</label>
  					</div>
  				</div>
  			</div>
  		</div>
  	);
  } */
	return (
		<div className={classes.container}>
			<div className={classes.headings}>
				Want to exclude some weekdays from this
				operation? Make them red.
			</div>
			<div className={classes.box}>
				<button
					className={
						props.mon === 'Empty'
							? classes.unselected_button
							: classes.selected_button
					}
					onClick={props.onClick_mon}
				>
					MON
				</button>
				<button
					className={
						props.tue === 'Empty'
							? classes.unselected_button
							: classes.selected_button
					}
					onClick={props.onClick_tue}
				>
					TUE
				</button>
				<button
					className={
						props.wed === 'Empty'
							? classes.unselected_button
							: classes.selected_button
					}
					onClick={props.onClick_wed}
				>
					WED
				</button>
				<button
					className={
						props.thu === 'Empty'
							? classes.unselected_button
							: classes.selected_button
					}
					onClick={props.onClick_thu}
				>
					THU
				</button>
				<button
					className={
						props.fri === 'Empty'
							? classes.unselected_button
							: classes.selected_button
					}
					onClick={props.onClick_fri}
				>
					FRI
				</button>
				<button
					className={
						props.sat === 'Empty'
							? classes.unselected_button
							: classes.selected_button
					}
					onClick={props.onClick_sat}
				>
					SAT
				</button>
				<button
					className={
						props.sun === 'Empty'
							? classes.unselected_button
							: classes.selected_button
					}
					onClick={props.onClick_sun}
				>
					SUN
				</button>
			</div>
		</div>
	);
};

export default SelectWeekDays;
