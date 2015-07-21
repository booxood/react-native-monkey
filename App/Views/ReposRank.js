'use strict';

var React = require('react-native');

var {
  Icon
} = require('react-native-icons');

var {
  StyleSheet,
  View,
  Text,
} = React;

var ReposRank = React.createClass({
  getInitialState: function() {
    console.log('ReposRank this:', this);
    return {};
  },

  render: function() {
    return (
      <View>
        <Text> ReposRank </Text>
      </View>
    )
  }
});

module.exports = ReposRank;
