"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsedArgument = void 0;
var __1 = require("..");
var ParsedArgument = /** @class */ (function () {
    function ParsedArgument(start, end, result) {
        this.range = new __1.StringRange(start, end);
        this.result = result;
    }
    ParsedArgument.prototype.getRange = function () {
        return this.range;
    };
    ParsedArgument.prototype.getResult = function () {
        return this.result;
    };
    return ParsedArgument;
}());
exports.ParsedArgument = ParsedArgument;
