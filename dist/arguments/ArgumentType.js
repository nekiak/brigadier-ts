"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentType = void 0;
var __1 = require("..");
var ArgumentType = /** @class */ (function () {
    function ArgumentType() {
    }
    ArgumentType.prototype.listSuggestions = function (context, builder) {
        return __1.Suggestions.empty();
    };
    return ArgumentType;
}());
exports.ArgumentType = ArgumentType;
