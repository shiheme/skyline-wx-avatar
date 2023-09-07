"use strict";
function fromPairs(pairs) {
  const result = {};
  if (pairs == null) {
    return result;
  }
  for (const pair of pairs) {
    result[pair[0]] = pair[1];
  }
  return result;
}
exports.fromPairs = fromPairs;
