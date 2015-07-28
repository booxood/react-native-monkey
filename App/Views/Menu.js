'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions').get('window');

var UsersRank = require('./UsersRank');

var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  PixelRatio,
} = React;

var Menu = React.createClass({
  getInitialState: function() {
    // console.log('Menu this:', this);
    return {};
  },

  render: function() {
    return (
      <View style={styles.menu}>
        <View style={styles.header}>
          <Text style={styles.title}> Monkey </Text>
        </View>

        <ScrollView
          automaticallyAdjustContentInsets={false}
          style={styles.list}>

          <TouchableOpacity
            underlayColor="#000"
            onPress={this._onPress.bind(this, 'TrendingAction')}>
            <View style={styles.row}>
              <Text style={styles.text}> Trending </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.separator} />
          <TouchableOpacity
            underlayColor="#000"
            onPress={this._onPress.bind(this, 'UsersRankAction')}>
            <View style={styles.row}>
              <Text style={styles.text}> Users Rank </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />

          <TouchableOpacity
            underlayColor="#000"
            onPress={this._onPress.bind(this, 'ReposRankAction')}>
            <View style={styles.row}>
              <Text style={styles.text}> Repos Rank </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />

          <TouchableOpacity
            underlayColor="#000"
            onPress={this._onPress.bind(this, 'AboutAction')}>
            <View style={styles.row}>
              <Text style={styles.text}> About </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />

        </ScrollView>
      </View>
    )
  },

  _onPress: function(action) {
    console.log('_onPress action:', action)
    this.props.parent.state.events.emit('action', {action: action});
  },

});

var styles = StyleSheet.create({
  menu: {
    flex: 1,
    flexDirection: 'column',
    width: Dimensions.width * 2 / 3,
  },
  header: {
    height: 64,
    backgroundColor: '#5cafec',
    paddingTop: 27,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
  list: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    height: 40,
    // backgroundColor: '#eee',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#5cafec',
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#eee',
  }
})

module.exports = Menu;
