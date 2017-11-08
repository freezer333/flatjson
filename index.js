// this code is adapted from https://github.com/strongloop/node-foreman/blob/master/lib/envs.js

function flattenJSON(json, delimiter, filter) {
  var flattened = {};
  var d = delimiter || ".";
  var keep_interior = false;

  if (filter && !(typeof filter === "function")) {
    keep_interior = filter;
  }

  if (!filter || !(typeof filter === "function")) {
    filter = function(key, item) {
      return !(typeof item === "function");
    };
  }
  walk(json, function(path, item) {
    flattened[path.join(d)] = item;
  });

  return flattened;

  function walk(obj, visitor, path) {
    var item;
    path = path || [];
    for (var key in obj) {
      item = obj[key];
      if (obj.hasOwnProperty(key) && filter(key, item)) {
        if (typeof item === "object") {
          walk(item, visitor, path.concat(key));
          if (keep_interior) {
            visitor(path.concat(key), item);
          }
        } else {
          visitor(path.concat(key), item);
        }
      }
    }
  }
}

module.exports = flattenJSON;
