'use strict';

var React = require('react-native');

var RankService = require('../Services/Rank');
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
} = React;

var ds = new ListView.DataSource(
  {rowHasChanged: (r1, r2) => r1 !== r2});
var cachedList = [];

var UsersRank = React.createClass({
  getInitialState: function() {
    return {
      dataSource: ds.cloneWithRows([]),
      sort: 'followers',
      language: 'all',
      location: 'china',
      total: '',
      page: 1,
      headerLoading: true,
      footerLoading: false,
      pulluping: false,
    };
  },
  componentDidMount: function() {
    var self = this;
    RankService.getUsersRank({
      sort: this.state.sort,
      page: this.state.page,
      language: this.state.language,
      location: this.state.location,
    }).then(function(result) {
        cachedList = result.items;
        self.setState({
          dataSource: ds.cloneWithRows(cachedList),
          headerLoading: false,
          total: result.total_count,
        });
      })
      .catch(function(err) {
        console.log('RankService.getUsersRank err:', err);
      });
  },
  render: function() {
    return (
      <View style={styles.list}>
        <View style={styles.statusBar}>
          <View style={styles.status}>
            <Text style={styles.statusText}>Language: {this.state.language}</Text>
          </View>
          <View style={styles.status}>
            <Text style={styles.statusText}>Location: {this.state.location}</Text>
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
    // console.log(sectionID, rowID)
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

    var nextPage = this.state.page + 1;
    var self = this;
    RankService.getUsersRank({
      sort: this.state.sort,
      language: this.state.language,
      location: this.state.location,
      page: nextPage,
    }).then(function(result) {
        cachedList = cachedList.concat(result.items);
        self.setState({
          dataSource: ds.cloneWithRows(cachedList),
          footerLoading: false,
          page: nextPage,
        });
      })
      .catch(function(err) {
        console.log('RankService.getUsersRank err:', err);
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
