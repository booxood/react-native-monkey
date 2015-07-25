'use strict';

var React = require('react-native');

var UsersRankService = require('../Services/UsersRank');

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
      location: UsersRankService.query.location,
      language: UsersRankService.query.language,
      LANGUAGES: [
        'ALL',
        'JavaScript',
        'Java',
        'Python',
        'PHP',
        'C#',
        'C++',
        'CSS',
        'Ruby',
        'Go',
        'Erlang'
      ],
      LOCATIONS: [
        'ALL',
        'China',
        'BeiJing',
        'ShangHai',
        'ShenZhen',
        'GuangZhou',
        'HangZhou',
        'ChangSha',
        'WuHan',
        'ChengDu',
        'ChongQing'
      ],
    };
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}> Language </Text>
          <PickerIOS
            selectedValue={this.state.language}
            onValueChange={(language) => {
              this.setState({language});
              UsersRankService.query.language = language;
            }}>
            {this.state.LANGUAGES.map((value, index) => (
              <PickerItemIOS
                key={value}
                value={value}
                label={value}
                />
              )
            )}
          </PickerIOS>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}> Location </Text>
          <PickerIOS
            selectedValue={this.state.location}
            onValueChange={(location) => {
              this.setState({location});
              UsersRankService.query.location = location;
            }}>
            {this.state.LOCATIONS.map((value, index) => (
              <PickerItemIOS
                key={value}
                value={value}
                label={value}
                />
              )
            )}
          </PickerIOS>
        </View>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    marginTop: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: '#5cafec',
  },
});

module.exports = SelectQueryCondition;
