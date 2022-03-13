"use strict";
exports.__esModule = true;
var resolvers = {
    Query: {
        recommandGroups: function (_, __, _a) {
            var client = _a.client;
            return client.group.findMany({
                take: 5
            });
        }
    }
};
exports["default"] = resolvers;
