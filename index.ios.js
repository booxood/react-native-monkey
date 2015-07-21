/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var EventEmitter = require('EventEmitter');
var Subscribable = require('Subscribable');

var SideMenu = require('react-native-side-menu');

var Home = require('./App/Views/Home');
var Menu = require('./App/Views/Menu');

var {
  AppRegistry,
  View,
} = React;

var GithubApp = React.createClass({
  getInitialState: function() {
    return {
      events: new EventEmitter()
    };
  },
  componentDidMount: function() {
    // this.events = new EventEmitter();
  },
  render: function() {
    var menu = <Menu parent={this} />;
    return (
      <SideMenu
        ref="sideMenu"
        menu={menu}
        touchToClose={true}
        >
        <Home
          ref="home"
          parent={this}
          />
      </SideMenu>
    );
  },
});

AppRegistry.registerComponent('GithubApp', () => GithubApp);
