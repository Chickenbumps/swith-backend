"use strict";
exports.__esModule = true;
var resolvers = {
    Comment: {
        isMine: function (_a, _, _b) {
            var userId = _a.userId;
            var client = _b.client, loggedInUser = _b.loggedInUser;
            if (!loggedInUser) {
                return false;
            }
            return userId === loggedInUser.id;
        }
    }
};
exports["default"] = resolvers;
