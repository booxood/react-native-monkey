'use strict';

var React = require('react-native');

var {
  Icon
} = require('react-native-icons');

var {
  StyleSheet,
  View,
  Text,
  PickerIOS,
} = React;

var PickerItemIOS = PickerIOS.Item;

var SelectQueryCondition = React.createClass({

  getInitialState: function() {
    return {
      location: '',
      LOCATIONS: {
        'ALL': 'ALL',
        'China': 'China',
      }
    };
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text> Location: </Text>
          <PickerIOS
            selectedValue={this.state.location}
            onValueChange={(location) => this.setState({location})}>
            {Object.keys(this.state.LOCATIONS).map((carMake) => (
              <PickerItemIOS
                key={carMake}
                value={carMake}
                label={this.state.LOCATIONS[carMake]}
                />
              )
            )}
        </PickerIOS>
        </View>
        <View style={styles.row}>
          <Text> Language: </Text>
        </View>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

module.exports = SelectQueryCondition;
