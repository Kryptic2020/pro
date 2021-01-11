//SurveyNew shows SurveyForm and SurveyFormReview

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';


class SurveyNew extends Component{
  state = {
  	showFormReview: false
  };

  renderContent() {
  	if (this.state.showFormReview) {
  		return (
  			<SurveyFormReview
  				onCancel={() => this.setState({ showFormReview: false })}
  			/>
  		);
  	}
  	return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview:true})}/>;

  }

  render() {
  	return (
  		<div className="container" style={{ width: '380px', marginTop: '21px' }}>
  			<div style={{width:'100%', height:'20px'}}></div>
  			{this.renderContent()}
  		</div>
  	);
  }
};
export default reduxForm({
	form: 'surveyForm'
})(SurveyNew);