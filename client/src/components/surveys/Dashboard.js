import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './SurveyList';

const Dashboard = () => {
	return (
		<div>
			<SurveyList/>
			<div  className="fixed-action-btn">
				<Link style={{marginTop:'-200px'}} to ="/surveys/new" className="btn-floating btn-large red">
					<i className="material-icons">add</i>
				</Link>
			</div>
		</div>
	);
};

export default Dashboard;