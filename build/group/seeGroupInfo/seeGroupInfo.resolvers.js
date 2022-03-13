"use strict";
exports.__esModule = true;
var resolvers = {
    Query: {
        seeGroupInfo: function (_, _a, _b) {
            var id = _a.id;
            var client = _b.client, loggedInUser = _b.loggedInUser;
            return client.group.findFirst({
                where: {
                    id: id
                },
                include: {
                    members: true
                }
            });
        }
    }
};
exports["default"] = resolvers;
