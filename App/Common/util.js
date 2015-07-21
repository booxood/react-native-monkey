'use strict';

// language, sort, page
exports.queryToURL = function(query) {
  var q = 'q=repos:>0';
  if (query.language) {
    q += '+language:' + query.language;
  }

  if (query.sort) {
    q += '&sort=' + query.sort;
  }
  if (query.page) {
    q += '&page=' + query.page;
  }

  return q + '&order=desc';
}

exports.SORT = ['followers', 'repositories', 'joined'];
exports.ORDER = ['desc', 'asc'];
