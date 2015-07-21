'use strict';

var config = require('../Common/config');
var util = require('../Common/util');

var Rank = {};

Rank.getUsersRank = function(query) {
  query = query || {};
  var url = config.API_URL + '/search/users?' + util.queryToURL(query);
  console.log('url:', url);
  return fetch(url, {
    method: 'GET',
  }).then((response) => response.json());
}

module.exports = Rank;
