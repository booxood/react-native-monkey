'use strict';

var React = require('react-native');

var UsersRankService = require('../Services/UsersRank');
var util = require('../Common/util');
var Spinner = require('../Components/Spinner');

var {
  Icon
} = require('react-native-icons');

var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ListView,
  Image,
  PixelRatio,
  AlertIOS,
} = React;

var ds = new ListView.DataSource(
  {rowHasChanged: (r1, r2) => r1 !== r2});
var cachedList = [];

var UsersRank = React.createClass({
  getInitialState: function() {
    return {
      dataSource: ds.cloneWithRows([]),
      headerLoading: true,
      footerLoading: false,
      pulluping: false,
      total: 0,
    };
  },
  componentDidMount: function() {
    var self = this;
    UsersRankService.query.page = 1;
    UsersRankService.getUsersRank()
      .then(function(result) {
        cachedList = result.items;
        self.setState({
          dataSource: ds.cloneWithRows(cachedList),
          headerLoading: false,
          total: result.total_count,
        });
      })
      .catch(function(err) {
        console.log('UsersRankService.getUsersRank err:', err);
      });
  },
  render: function() {
    return (
      <View style={styles.list}>
        <View style={styles.statusBar}>
          <View style={styles.status}>
            <Text style={styles.statusText}>
              Language: {UsersRankService.query.language}
            </Text>
          </View>
          <View style={styles.status}>
            <Text style={styles.statusText}>
              Location: {UsersRankService.query.location}
            </Text>
          </View>
          <View style={styles.status}>
            <Text style={styles.statusText}>Total: {this.state.total}</Text>
          </View>
        </View>
        <ListView
          ref={'usersRankList'}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          onEndReached={this._onEnReached}
          renderHeader={this._renderHeader}
          renderFooter={this._renderFooter}
          automaticallyAdjustContentInsets={false}
          />
      </View>
    )
  },
  _renderRow: function(rowData, sectionID, rowID) {
    // console.log('rowData:', rowData)
    if (!rowData)
      console.log(sectionID, rowID)

    rowData = rowData || {};
    return (
      <View>
        <TouchableOpacity
          underlayColor="#eee"
          onPress={()=> {}}>
          <View style={styles.row}>
            <Text style={styles.id}>{parseInt(rowID)+1}</Text>
            <Image
              style={styles.avatar}
              source={{uri: rowData.avatar_url}}
            />
            <Text style={styles.username}>{rowData.login}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    )
  },
  _renderHeader: function() {
    if (this.state.headerLoading) {
      return (<Spinner />);
    }
  },
  _renderFooter: function() {
    if (this.state.footerLoading) {
      return (<Spinner />);
    }
  },
  _onEnReached: function() {
    if (this.state.footerLoading) {
      return;
    }
    this.setState({footerLoading: true});

    UsersRankService.query.page = UsersRankService.query.page + 1;
    var self = this;
    UsersRankService.getUsersRank()
      .then(function(result) {
        // console.log('result:', result)
        if (result.items) {
          cachedList = cachedList.concat(result.items);
        } else {
          AlertIOS.alert('Error', result.message);
        }
        self.setState({
          dataSource: ds.cloneWithRows(cachedList),
          footerLoading: false,
        });
      })
      .catch(function(err) {
        AlertIOS.alert('Error', err.message);
        console.log('UsersRankService.getUsersRank err:', err);
      });

  },
});

var styles = StyleSheet.create({
  statusBar: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  status: {
    flex: 1,
  },
  statusText: {
    color: '#5cafec',
    textAlign: 'center',
  },
  list: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    height: 72,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 15,
    paddingVertical: 5,
  },
  id: {
    width: 60,
    textAlign: 'center',
    color: '#5cafec',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    // flex: 1,
  },
  username: {
    flex: 1,
    // textAlign: 'center',
    paddingLeft: 50,
    fontSize: 20,
    color: '#5cafec',
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#eee',
    // marginLeft: 15,
  }

});

module.exports = UsersRank;
