import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { Field } from 'redux-form';
import styles from './styles';

class RegisterTextInput extends React.Component {
  render() {
    const {
      name,
      returnKeyType,
      placeholder,
      onChangeText,
      navigate,
      reference,
      value = '',
      keyboardType = 'default',
      secureTextEntry = false,
      helperText = undefined,
      err = undefined,
      multiline = false,
      title,
    } = this.props;
    return (
      <View style={styles.textInput}>
        {title ? <Text style={[styles.title]}>{title}</Text> : null}
        <Field
          withRef
          secureTextEntry={secureTextEntry}
          name={name}
          component={TextInput}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          underlineColorAndroid="transparent"
          placeholderTextColor="#4a4a4a"
          placeholder={placeholder}
          onChangeText={onChangeText}
          onSubmitEditing={navigate}
          ref={reference}
          style={styles.field}
          defaultValue={value}
          multiline={multiline}
        />
        <View style={styles.horizontalLine} />
        {helperText ? (
          <Text style={styles.helperText}>{helperText}</Text>
        ) : null}
        {err ? <Text style={[styles.warning]}>{err}</Text> : null}
      </View>
    );
  }
}

export default RegisterTextInput;
