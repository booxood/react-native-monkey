'use strict';

var React = require('react-native');
var Modal = require('react-native-modal');


var {
  Icon
} = require('react-native-icons');

var {
  StyleSheet,
  View,
  Text,
} = React;

var ReposRank = React.createClass({
  mixins: [Modal.Mixin],

  // getInitialState: function() {
  //   return {
  //     // isModalOpen: false,
  //   };
  // },

  render: function() {
    return (
      <View>
        <Text onPress={this.openModal}> ReposRank </Text>

        <Modal
          // forceToFront={true}
          isVisible={this.state.isModalOpen}
          onClose={() => this.closeModal()}>
          <Text>Hello world!</Text>
        </Modal>

      </View>
    )
  }
});

var styles = StyleSheet.create({
});

module.exports = ReposRank;
