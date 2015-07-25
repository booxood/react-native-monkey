'use strict';

var React = require('react-native');
var {
  Icon
} = require('react-native-icons');

var {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} = React;


var BackButton = React.createClass({
  render: function() {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={this._onPress}>
        <Icon
          name='fontawesome|chevron-left'
          size={20}
          color='#fff'
          style={{width: 50, height: 50}}
          />
      </TouchableOpacity>
    )
  },
  _onPress: function() {
    this.props.customAction({action: 'UsersRankAction'});
  }
});

module.exports = BackButton;
