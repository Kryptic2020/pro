import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
	const reviewFields = _.map(formFields, ({name, label}) => {
		return (
			<div key={name}>
				<label className="text-white">{label}</label>
				<div className="text-white">{formValues[name]}</div>
			</div>
		);
	});
	return (
		<div>
			<h5>Please confirm your entries</h5>
			{reviewFields}
			<div style={{width:'100%', height:'20px'}}></div>
			<button
				className="yellow darken-3 white-text btn-flat"
				onClick={onCancel}
			>
        Back
			</button>
			<button onClick={() => submitSurvey(formValues, history)}
				className="green white-text right btn-flat">
        Send Survey<i className="material-icons right">email</i>
			</button>
		</div>
	);
};

function mapStateToProps(state) {
	//console.log(state);
	return { formValues: state.form.surveyForm.values};
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));