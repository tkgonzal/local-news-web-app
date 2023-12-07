"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// User permissions, to be used for article and user editing
var Permission;
(function (Permission) {
    Permission[Permission["READ_ONLY"] = 0] = "READ_ONLY";
    Permission[Permission["WRITE"] = 1] = "WRITE";
    Permission[Permission["DELETE"] = 2] = "DELETE";
})(Permission || (Permission = {}));
exports.default = Permission;
