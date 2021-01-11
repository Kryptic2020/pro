//SurveyForm shows a form for a user to add imput
import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/utility';
import formFields from './formFields';

class SurveyForm extends Component {
	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return (
				<Field
					key={name}
					component={SurveyField}
					type="text"
					label={label}
					name={name}
				/>
			);
		});
	}
	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
				>
					{this.renderFields()}

					<button className="teal btn-flat right white-text" type="submit">
            Next
						<i to="/" className="material-icons right">done</i>
					</button>
          
					<Link to="/surveys" className="red btn-flat white-text">cancel</Link>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	errors.recipients = validateEmails(values.recipients || '');

	_.each(formFields, ({ name }) => {
		if (!values[name]) {
			errors[name] = 'You must provide a value';
		}
	});
  
	/*
  if (!values.title) {
    erros.title = 'You must provide a title';
  }
  if (!values.subject) {
    erros.subject = 'You must provide a subject';
  }
  if (!values.body) {
    erros.body = 'You must provide an email body';
  }*/

	return errors;
}

export default reduxForm({
	validate,
	form: 'surveyForm',
	destroyOnUnmount: false
})(SurveyForm);
