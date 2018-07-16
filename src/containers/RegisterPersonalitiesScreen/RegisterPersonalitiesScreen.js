import React from 'react';
import PersonalitiesForm from "../../components/PersonalitiesForm";
import {connect} from "react-redux";
import {reduxForm, SubmissionError} from "redux-form";
import {NavigationActions} from "react-navigation";

const mapDispatchToProps = dispatch => ({
  goToUserInformationForm: () => dispatch(NavigationActions.navigate({routeName: 'Tags'}))
});

const RegisterPersonalitiesScreen = props => (
  <PersonalitiesForm handleSubmit={(data) => props.handleSubmit(data)} change={props.change}/>
);

function validatePersonalities(values) {
  if (values.personalities.length <= 0) {
    throw new SubmissionError({
      _error: 'Login failed !',
    });
  }
}

export default connect(null, mapDispatchToProps)(
  reduxForm({
    form: 'register',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: validatePersonalities,
    onSubmitSuccess: (result, dispatch, props) => {
      props.goToUserInformationForm();
    }
  })(RegisterPersonalitiesScreen)
);