import React, {Component} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
//import { Link } from 'react-router-dom';
//import TimeTable from '../../components/Calendar/TimeTable';
import Modal from 'react-bootstrap/Modal';




const useStyles = theme => ({
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
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};



class MultipleSelect extends Component {
	
	state = {
		age: '0',
		name: 'hai',
		timeT: '',
		cicle: '',
		tableName: '',
		selection: '',
		msn: '',
		isLoading: false,
		timeTables: [],//
		selected: '',//
		selectedTimes: [],
		id:''
	};

	scrollToTop() {
  	window.scrollTo({
  		top: 0,
  		behavior: 'smooth'
  	});
	}
	
	componentDidMount() {
		this.fetchTimeTable();
		this.scrollToTop();
	}
reset2 = () => {
  	document.getElementById('tableName').value = document.getElementById(
  		'tableName'
  	).defaultValue;
  	document.getElementById('times').value = document.getElementById(
  		'times'
  	).defaultValue;
  	document.getElementById('period').value = document.getElementById(
  		'period'
  	).defaultValue;
};	
  handleModalShow = (id) => {
  	this.setState({ modalShow: true, id });
  };

  handleModalClose = () => {
  	this.setState({ modalShow: false, id:'' });
  };
	handleChange = (event) => {
		this.setState({
			...this.state, selection: event.target.value,
			selectedTimes: event.target.value,
			msn:''
		});
	};
	
	inputChangeHandler = (event) => {
		this.setState({
			...this.state,
			tableName: event.target.value,
		});
	};

	handleChange2 = (event) => {
		const name = event.target.name;
		this.setState({
			...this.state,
			[name]: event.target.value,
			cicle: event.target.value,
			msn: '',
		});
	};

	hideMsn = () => {
		this.setState({ ...this.state, msn: '' });
	};




	periodRender() {
		return (
			<div>
				<FormControl style={{ width: '100%' }} variant="outlined">
					<label style={{ width: '120px', fontSize: '15px', color: 'white' }}>Period</label>
					<Select
						style={{ width: '100%', color: '#01579b', fontWeight: 'bold', backgroundColor: 'white' }}
						native
						//value={this.state.age}
						onChange={this.handleChange2}
						inputProps={{
							name: 'age',
							id: 'period',
						}}
					>
						<option id='optionClear' aria-label="None" value="" />
						<option style={{fontSize:'18px', fontWeight:'bold'}} value={1}>Every 1hour</option>
						<option style={{ fontSize: '18px', fontWeight: 'bold' }} value={30}>Every 30min</option>
						<option style={{ fontSize: '18px', fontWeight: 'bold' }} value={15}>Every 15min</option>
						<option style={{ fontSize: '18px', fontWeight: 'bold' }} value={10}>Every 10min</option>
						<option style={{ fontSize: '18px', fontWeight: 'bold' }} value={5}>Every 5min</option>
					</Select>
				</FormControl>
			</div>
		);
	}

	
	selectTimesRender() {
		let bolo = this.state.timeT;
	  if (this.state.cicle === '5') {
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
	
		if (this.state.cicle === '10') {
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
	
		if (this.state.cicle === '15') {
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
	
		if (this.state.cicle === '30') {
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
	
		if (this.state.cicle === '1') {
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
	
		if (this.state.cicle === '') {
			bolo = ['null'];
		}
		const { classes } = this.props;
		return (
			<div>
				<label style={{ width: '120px', fontSize: '15px', color: 'white' }}>Select Times</label>
				<FormControl style={{ width: '100%', marginBottom:'20px' }} variant="outlined">
					<Select
						style={{ width: '100%', minHeight: '50px', borderRadius: '4px', color: '#01579b', fontWeight: 'bold', backgroundColor: 'white' }}
						labelId="demo-mutiple-chip-label"
						id="times"
						multiple
						value={this.state.selectedTimes}
						onChange={this.handleChange}
						//input={<Input id="select-multiple-chip" />}
						renderValue={(selected) => (
							<div className={classes.chips}>
								{selected.sort().map((value) => (
									<Chip key={value} label={value} className={classes.chip} />
								))}
							</div>
						)}
						MenuProps={MenuProps}
					>
						{bolo.sort().map((name) => (
							<MenuItem
								key={name}
								value={name}
								style={{ fontSize: '18px', color:':#01579b', fontWeight:'bold'}}
							>
								{name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
		);
	}

	tableNameRender() {
		return (
			<div>
				<label style={{ width: '120px', fontSize: '18px', color: 'white' }}>Table Name</label>
				<input
					style={{ width: '380', marginBottom:'20px',color: '#01579b', fontWeight: 'bold', backgroundColor: 'white', borderRadius:'4px' }}
					onChange={this.inputChangeHandler}
					id="tableName"
					className="validate"
					type="text"
				></input>
			</div>
		);
	}

	// SUBMIT - COMPONENT 
	submitHandle = async (event) => {
		event.preventDefault();
		this.setState({ ...this.state, isLoading: true}); 
		const tableData = {
			tableName: this.state.tableName,
			tableTimes: this.state.selection.toString().split(','),
		};
		await Axios.post('/api/createTimeTable', tableData)
			.then((res) => {
				this.setState({ ...this.state, msn: res.data}); 
			})
			.catch((err) => {
				this.setState({ ...this.state, msn: 'There was an error, please try again later!' });
			});
		this.reset2();
		this.setState({ ...this.state, cicle: '', selectedTimes:[], tableName: '', selection: '',isLoading: false }); 
		this.fetchTimeTable();
         
		//window.location.reload(false);
	};	

	createRender() {
		return (
			<div>
				<Button
					variant="info"
					onClick={this.submitHandle}
					disabled={
						this.state.cicle === '' ||
            this.state.tableName === '' ||
            this.state.selection === ''
					}
					style={{
						width: '100%', height: '50px'
					}}
			
				>
      Create<i className="material-icons"></i>
				</Button>
			</div>
		);
	}  


  //TABLES - COMPONENT 6
  fetchTimeTable = () => {
  	axios
  		.get('/api/timeTable/get')
  		.then((res) => {
  			this.setState({ isLoading: false, timeTables: res.data });
  			if(this.state.timeTables.length <1) {this.setState({msn:'There is no time table to be displayed'});}
  			//console.log(this.state.timeTables);
  		})
  		.catch((err) => {
  			this.setState({ isLoading: false, timeTables: [] });
  			//console.log(err);
  		});
  };  

	selectTableHandler = () => {
		
	}
	deleteTableHandler = () => {
			this.setState({ isLoading: true });
		const tableId = this.state.id ;
  	axios
  		.delete('/api/timeTable/' + tableId)
  		.then(() => {
  			this.fetchTimeTable();
  		})
  		.catch(() => {
  			this.setState({ msn: 'Deleting table failed. Please try again later' });
  			this.fetchTimeTable();
  		});
		this.handleModalClose();
		this.setState({ isLoading: false });
  };

	// MODAL DELETE -  COMPONENT

	modalDeleteRender() {
		return (
			<div>
				<Modal
  									show={this.state.modalShow}
  									onHide={this.handleModalClose}
  								>
  									<Modal.Header closeButton>
  										<Modal.Title>Delete Time Table</Modal.Title>
  									</Modal.Header>
  									<Modal.Body>
                      You're trying to delete this Time Table, are you sure?!
  									</Modal.Body>
  									<Modal.Footer>
  										<span className="left">
  											<Button
  												variant="secondary"
  												onClick={this.handleModalClose}
  											>
                          Close
  											</Button>
  										</span>
  										<span>
  											<Button
  												className="right"
  												variant="danger"
  												onClick={this.deleteTableHandler}
  											>
                          delete
  											</Button>
  										</span>
  									</Modal.Footer>
  								</Modal>
			</div>
		)
	}

  	// Tables render
  timeTablesRender() {
  	const timeTablesView = this.state.timeTables.sort().map((p) => (
  		<div key={p._id}>
  			<div className="card #01579b light-blue darken-3 white-text container">
    		<div>
		     	<div style={{ padding: '5px', marginLeft: '10px', fontSize: '18px', fontWeight: 'bold' }}>
				    {p.timeTableName}
			    </div>
			    <div>
				    <div className="center">
					    <i className="material-icons small">schedule</i>
				    </div>
				    <div style={{
					    border: '2px solid white',
					    borderRadius:'5px 5px 5px 5px',
					    fontSize: '18px',
					    textAlign: 'center',
					    padding: '5px',
					    width: '100%',
					    backgroundColor: 'white',
					    color: '#01579b',
					    fontWeight: 'bold'
				    }}>
					    {p.times.join(', ')}
				    </div>
				    <div style={{ height: '10px', width: '100%' }}></div> 
		    	</div>
			    <button	style={{ width:'100%', fontWeight: 'bold' }} onClick={()=>this.handleModalShow(p._id)}
				    className=" #d81b60 pink darken-1 right white-text btn-flat"
			    >
							Delete
		    	</button>
  					
		    </div>
		    <div style={{ height: '10px', width: '100%' }}></div>
  			</div>
  		</div>
  	));
  	return (
  		<div>
  			{this.state.timeTables.legth > 0 ? <label className='white-text'>
  				<h6>My TimeTables</h6>
  			</label> : null}
  			<div style={{ height: '20px', width: '100%' }}></div>
  			{timeTablesView}
  		</div>
  	);
  };  
 
  render() {
  	return (
  		<div>
  			<div className="container" style={{ marginTop: '77px', minWidth: '320px', maxWidth: '380px'}}>
  				<div  >
  					<div style={{ height: '20px', width: '100%' }}></div>
  					{this.state.msn ?
  						<Alert variant="warning " id='msn' onClick={this.hideMsn} style={{ marginBottom: '20px', fontSize: '18px' }}>
  							<Alert.Heading>
  								{this.state.msn}
  							</Alert.Heading>
  						</Alert> : null
  					}
  					<div style={{ height: '20px', width: '100%' }}></div>
  					<label style={{ color: 'white' }}>
  						<h6>Lets create a new Table?</h6>
  					</label>
  					<div className="center">{this.state.isLoading ? <Spinner /> : null}</div>
  						<div style={{ height: '20px', width: '100%' }}></div>
  						{this.periodRender()}
  						<div style={{ height: '20px', width: '100%' }}></div>
  						{this.state.cicle ? this.selectTimesRender():null}
						<div>{this.state.id? this.modalDeleteRender(): null}</div>
  						{this.state.selection ? this.tableNameRender() : null}
  					
  						{this.state.tableName ? this.createRender() : null}
  						<div style={{
  							width: '100%', height: '20px'
  						}}></div>
  					<div style={{ overflowY: 'scroll', maxHeight: '500px' }}>
  						{!this.state.id?this.timeTablesRender():null}
  					</div>
  				</div >
  			</div>
  			<div style={{
  							width: '100%', height: '50px'
  						}}></div>
  		</div>
	 );
  }  
	
};

export default withStyles(useStyles)(MultipleSelect);
