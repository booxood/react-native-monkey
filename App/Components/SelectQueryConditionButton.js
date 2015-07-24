'use strict';

var React = require('react-native');
var {
  Icon
} = require('react-native-icons');

var SelectQueryCondition = require('../Views/SelectQueryCondition');

var {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} = React;


var SelectQueryConditionButton = React.createClass({
  render: function() {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={this._onPress}>
        <Icon
          name='fontawesome|search'
          size={20}
          color='#fff'
          style={{width: 50, height: 50}}
          />
      </TouchableOpacity>
    )
  },
  _onPress: function() {
    // this.props.customAction({action: 'SelectQueryConditionAction'});
    this.props.toRoute({
      name: 'Select Query Condition',
      component: SelectQueryCondition,
    })
  }
});

module.exports = SelectQueryConditionButton;
