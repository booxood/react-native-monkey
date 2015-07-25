'use strict';

// language, sort, page
exports.queryToURL = function(query) {
  var q = 'q=repos:>0';
  if (query.language && query.language !== 'ALL') {
    q += '+language:' + query.language;
  }
  if (query.location && query.location !== 'ALL') {
    q += '+location:' + query.location;
  }

  if (query.sort) {
    q += '&sort=' + query.sort;
  }
  if (query.page) {
    q += '&page=' + query.page;
  }

  return q + '&per_page=20&order=desc';
}

exports.SORT = ['followers', 'repositories', 'joined'];
exports.ORDER = ['desc', 'asc'];
