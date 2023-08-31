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
exports.CommandSyntaxError = void 0;
var __1 = require("..");
var CONTEXT_AMOUNT = 10;
var CommandSyntaxError = exports.CommandSyntaxError = /** @class */ (function (_super) {
    __extends(CommandSyntaxError, _super);
    function CommandSyntaxError(message, input, cursor) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, CommandSyntaxError.prototype);
        _this.input = input;
        _this.cursor = cursor;
        if (input && cursor >= 0) {
            _this.message += " at position ".concat(cursor, ": ");
            var cursor2 = Math.min(_this.input.length, _this.cursor);
            _this.message += cursor > CONTEXT_AMOUNT ? "..." : "";
            _this.message += _this.input.substring(Math.max(0, cursor2 - CONTEXT_AMOUNT), cursor2);
            _this.message += "<--[HERE]";
        }
        return _this;
    }
    CommandSyntaxError.DOUBLE_TOO_SMALL = new __1.CommandErrorType(function (found, min) { return "Double must not be less than ".concat(min, ", found ").concat(found); });
    CommandSyntaxError.DOUBLE_TOO_BIG = new __1.CommandErrorType(function (found, max) { return "Double must not be more than ".concat(max, ", found ").concat(found); });
    CommandSyntaxError.FLOAT_TOO_SMALL = new __1.CommandErrorType(function (found, min) { return "Float must not be less than ".concat(min, ", found ").concat(found); });
    CommandSyntaxError.FLOAT_TOO_BIG = new __1.CommandErrorType(function (found, max) { return "Float must not be more than ".concat(max, ", found ").concat(found); });
    CommandSyntaxError.INTEGER_TOO_SMALL = new __1.CommandErrorType(function (found, min) { return "Integer must not be less than ".concat(min, ", found ").concat(found); });
    CommandSyntaxError.INTEGER_TOO_BIG = new __1.CommandErrorType(function (found, max) { return "Integer must not be more than ".concat(max, ", found ").concat(found); });
    CommandSyntaxError.LONG_TOO_SMALL = new __1.CommandErrorType(function (found, min) { return "Long must not be less than ".concat(min, ", found ").concat(found); });
    CommandSyntaxError.LONG_TOO_BIG = new __1.CommandErrorType(function (found, max) { return "Long must not be more than ".concat(max, ", found ").concat(found); });
    CommandSyntaxError.LITERAL_INCORRECT = new __1.CommandErrorType(function (expected) { return "Expected literal ".concat(expected); });
    CommandSyntaxError.READER_EXPECTED_START_OF_QUOTE = new __1.CommandErrorType(function () { return "Expected quote to start a string"; });
    CommandSyntaxError.READER_EXPECTED_END_OF_QUOTE = new __1.CommandErrorType(function () { return "Unclosed quoted string"; });
    CommandSyntaxError.READER_INVALID_ESCAPE = new __1.CommandErrorType(function (character) { return "Invalid escape sequence '".concat(character, "' in quoted string"); });
    CommandSyntaxError.READER_INVALID_BOOL = new __1.CommandErrorType(function (value) { return "Invalid bool, expected true or false but found '".concat(value, "'"); });
    CommandSyntaxError.READER_EXPECTED_BOOL = new __1.CommandErrorType(function () { return "Expected bool"; });
    CommandSyntaxError.READER_INVALID_INT = new __1.CommandErrorType(function (value) { return "Invalid integer '".concat(value, "'"); });
    CommandSyntaxError.READER_EXPECTED_INT = new __1.CommandErrorType(function () { return "Expected integer"; });
    CommandSyntaxError.READER_INVALID_FLOAT = new __1.CommandErrorType(function (value) { return "Invalid float '".concat(value, "'"); });
    CommandSyntaxError.READER_EXPECTED_FLOAT = new __1.CommandErrorType(function () { return "Expected float"; });
    CommandSyntaxError.DISPATCHER_UNKNOWN_COMMAND = new __1.CommandErrorType(function () { return "Unknown Command"; });
    CommandSyntaxError.DISPATCHER_UNKNOWN_ARGUMENT = new __1.CommandErrorType(function () { return "Incorrect argument for command"; });
    CommandSyntaxError.DISPATCHER_EXPECTED_ARGUMENT_SEPARATOR = new __1.CommandErrorType(function () { return "Expected whitespace to end one argument, but found trailing data"; });
    CommandSyntaxError.DISPATCHER_PARSE_ERROR = new __1.CommandErrorType(function (message) { return "Could not parse command: ".concat(message); });
    return CommandSyntaxError;
}(Error));
