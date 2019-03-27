import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View } from 'react-native';
import styles from './styles';
import TagPicker from '../TagPicker/TagPicker';
import Footer from '../Footer';
import { Actions } from '../TagPicker';
import { Field } from 'redux-form';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  updateMatchingInformation: state.form.updateMatchingInformation,
});

class EditTags extends Component {
  componentWillMount() {
    this.props.initialize({
      ...this.props.initialValues,
      oldValues: this.props.initialValues,
    });
  }

  renderTag = (tag, isLastTag) => {
    const { lovedTags, hatedTags } = this.props.initialValues;
    let state = 0;
    let pos = lovedTags.indexOf(tag.id);
    if (pos >= 0) {
      state = 1;
    } else {
      pos = hatedTags.indexOf(tag.id);
      if (pos >= 0) {
        state = -1;
      }
    }

    return (
      <Field
        name="tagPicker"
        component={TagPicker}
        editProfile
        tag={tag}
        key={tag.name}
        selectionState={state}
        isLastTag={isLastTag}
        onPress={(tag, actionType) => this.handlePressedTag(tag, actionType)}
      />
    );
  };

  renderTags = (tags, addMarginToLastTag = false) => {
    return tags.map((tag, index) => {
      const isLastTag = addMarginToLastTag && index === tags.length - 1;
      return this.renderTag(tag, isLastTag);
    });
  };

  renderNewTags = () => {
    const { newTags } = this.props;
    const tags = this.renderTags(newTags);

    return (
      <View>
        <Text style={styles.tagTitle}>New tags</Text>
        {tags}
      </View>
    );
  };

  renderBaseTags = () => {
    const { baseTags } = this.props;
    const addMarginToLastTag = true;
    const tags = this.renderTags(baseTags, addMarginToLastTag);

    return (
      <View>
        <Text style={styles.tagTitle}>Base tags</Text>
        {tags}
      </View>
    );
  };

  handlePressedTag = (tag, actionType) => {
    const {
      lovedTags,
      hatedTags,
    } = this.props.updateMatchingInformation.values;
    const tagsArrays = [
      {
        list: lovedTags,
        arrayName: 'lovedTags',
      },
      {
        list: hatedTags,
        arrayName: 'hatedTags',
      },
    ];
    let arrayIndex = 0;
    let nextSelectedTags;
    let changedCategory;
    let tagPos = -1;

    if (actionType === Actions.RESET_TAG_CHOICE) {
      while (arrayIndex < tagsArrays.length && tagPos < 0) {
        tagPos = tagsArrays[arrayIndex].list.indexOf(tag);
        arrayIndex++;
      }
      nextSelectedTags = [...tagsArrays[arrayIndex - 1].list];
      changedCategory = tagsArrays[arrayIndex - 1].arrayName;
      nextSelectedTags.splice(tagPos, 1);
    } else {
      if (actionType === Actions.YEAHS_TAG) {
        changedCategory = tagsArrays[0].arrayName;
        nextSelectedTags = [...lovedTags];
      } else {
        changedCategory = tagsArrays[1].arrayName;
        nextSelectedTags = [...hatedTags];
      }
      nextSelectedTags.push(tag);
    }
    this.props.change(changedCategory, nextSelectedTags);
  };

  render() {
    return (
      <View style={[styles.container]}>
        <ScrollView bounces={false} style={[styles.scrollview]}>
          <Text style={styles.title}>
            <Text style={styles.yeah}>YEAHS!</Text> &{' '}
            <Text style={styles.nah}>NAAH...</Text>
          </Text>
          {this.renderNewTags()}
          {this.renderBaseTags()}
        </ScrollView>
        <Footer
          color="orange"
          disabled={!this.props.hasChanged}
          onPress={this.props.handleSubmit}
        >
          <Text style={[styles.next]}>Update</Text>
        </Footer>
      </View>
    );
  }
}

EditTags.propTypes = {};

export default connect(
  mapStateToProps,
  null,
)(EditTags);
