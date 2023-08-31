"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.greedyString = exports.string = exports.word = exports.StringArgumentType = void 0;
var __1 = require("..");
var StringArgumentType = /** @class */ (function (_super) {
    __extends(StringArgumentType, _super);
    function StringArgumentType(type) {
        var _this = _super.call(this) || this;
        _this.type = type;
        return _this;
    }
    StringArgumentType.prototype.getType = function () {
        return this.type;
    };
    StringArgumentType.prototype.parse = function (reader) {
        if (this.type === "greedy_phrase") {
            var text = reader.getRemaining();
            reader.setCursor(reader.getTotalLength());
            return text;
        }
        else if (this.type === "single_word") {
            return reader.readUnquotedString();
        }
        else {
            return reader.readString();
        }
    };
    return StringArgumentType;
}(__1.ArgumentType));
exports.StringArgumentType = StringArgumentType;
function word() {
    return new StringArgumentType("single_word");
}
exports.word = word;
function string() {
    return new StringArgumentType("quotable_phrase");
}
exports.string = string;
function greedyString() {
    return new StringArgumentType("greedy_phrase");
}
exports.greedyString = greedyString;
