'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions').get('window');

var util = require('../Common/util');

var {
  View,
  Text,
  StyleSheet,
  WebView,
} = React;

var Trending = React.createClass({
  getInitialState: function() {
    return {
      url: 'https://github.com/trending',
    };
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View>
          <WebView
            style={styles.webview}
            automaticallyAdjustContentInsets={false}
            startInLoadingState={true}
            url={this.state.url} />
        </View>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    height: Dimensions.height,
  }
})

module.exports = Trending;
