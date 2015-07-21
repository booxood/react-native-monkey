'use strict';

var React = require('react-native');

var Dimensions = require('Dimensions').get('window');

var {
  StyleSheet,
  View,
  ActivityIndicatorIOS,
} = React;

var Spinner = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS
          // style={{top: this.props.top}}
          size="large" />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    // top:0,
    // left:0,
    // position: 'relative',
    // width: Dimensions.width,
    // height: Dimensions.height,
    // backgroundColor: '#000',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8
  }
});


module.exports = Spinner;
