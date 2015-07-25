'use strict';

var config = require('../Common/config');
var util = require('../Common/util');

var Rank = {};

Rank.query = {
  sort: 'followers',
  language: 'ALL',
  location: 'China',
  page: 1,
}

Rank.getUsersRank = function(query) {
  query = query || {};
  var url = config.API_URL + '/search/users?' + util.queryToURL(Rank.query);
  console.log('url:', url);
  return fetch(url, {
    method: 'GET',
  }).then((response) => response.json());
}

module.exports = Rank;
