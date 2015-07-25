'use strict';

var React = require('react-native');
var Router = require('react-native-router');
var EventEmitter = require('EventEmitter');
var Subscribable = require('Subscribable');

var UsersRank = require('./UsersRank');
var ReposRank = require('./ReposRank');
var SelectQueryCondition = require('./SelectQueryCondition');

var SideMenuButton = require('../Components/SideMenuButton');
var SelectQueryConditionButton = require('../Components/SelectQueryConditionButton');
var BackButton = require('../Components/BackButton');

var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = React;

var firstRoute =  {
  name: 'Users Rank',
  component: UsersRank,
  leftCorner: SideMenuButton,
  rightCorner: SelectQueryConditionButton
};

var Home = React.createClass({
  mixins: [Subscribable.Mixin],

  getInitialState: function() {
    // console.log('Home this:', this);
    return {};
  },

  componentDidMount: function() {
    this.addListenerOn(this.props.parent.state.events, 'action', this._customAction);
  },

  render: function() {
    return (
      <Router
        ref="router"
        firstRoute={firstRoute}
        headerStyle={styles.header}
        customAction={this._customAction}>
      </Router>
    )
  },

  _customAction: function(event) {
    console.log('_customAction event:', event)
    console.log('router:', this.refs['router'])
    // TODO: must modify router package source code...
    var router = this.refs['router'].state.RNRouter;
    switch (event.action) {
      case 'SideMenuAction':
        this.props.menuActions.open();
        break;
      case 'SelectQueryConditionAction':
        router.push({
          name: 'Select Query Condition',
          component: SelectQueryCondition,
          leftCorner: BackButton,
        });
        break;
      case 'UsersRankAction':
        router.replace({
          name: 'Users Rank',
          component: UsersRank,
          leftCorner: SideMenuButton,
          rightCorner: SelectQueryConditionButton,
        });
        this.props.menuActions.close();
        break;
      case 'ReposRankAction':
        router.replace({
          name: 'Repos Rank',
          component: ReposRank,
          leftCorner: SideMenuButton,
        });
        this.props.menuActions.close();
        break;
      default:
        console.log('default action')
    }
  }
});

var styles = StyleSheet.create({
  header: {
    backgroundColor: '#5cafec'
  }
});

module.exports = Home;
