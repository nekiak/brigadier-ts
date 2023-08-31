"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringReader = void 0;
var CommandSyntaxError_1 = require("./exceptions/CommandSyntaxError");
var StringReader = /** @class */ (function () {
    function StringReader(string) {
        if (string instanceof StringReader) {
            this.string = string.getString();
            this.cursor = string.getCursor();
        }
        else {
            this.string = string;
            this.cursor = 0;
        }
    }
    StringReader.prototype.getString = function () {
        return this.string;
    };
    StringReader.prototype.getCursor = function () {
        return this.cursor;
    };
    StringReader.prototype.setCursor = function (cursor) {
        this.cursor = cursor;
    };
    StringReader.prototype.getRemainingLength = function () {
        return this.string.length - this.cursor;
    };
    StringReader.prototype.getTotalLength = function () {
        return this.string.length;
    };
    StringReader.prototype.getRead = function () {
        return this.string.substring(0, this.cursor);
    };
    StringReader.prototype.getRemaining = function () {
        return this.string.substring(this.cursor);
    };
    StringReader.prototype.canRead = function (length) {
        if (length === void 0) { length = 1; }
        return this.cursor + length <= this.string.length;
    };
    StringReader.prototype.peek = function (offset) {
        if (offset === void 0) { offset = 0; }
        return this.string.charAt(this.cursor + offset);
    };
    StringReader.prototype.read = function () {
        var char = this.string.charAt(this.cursor);
        this.cursor += 1;
        return char;
    };
    StringReader.prototype.skip = function () {
        this.cursor += 1;
    };
    StringReader.prototype.isAllowedNumber = function (c) {
        return c >= "0" && c <= "9" || c === "." || c === "-";
    };
    StringReader.prototype.readInt = function () {
        var start = this.cursor;
        while (this.canRead() && this.isAllowedNumber(this.peek())) {
            this.skip();
        }
        var number = this.string.substring(start, this.cursor);
        if (number.length === 0) {
            throw CommandSyntaxError_1.CommandSyntaxError.READER_EXPECTED_INT.createWithContext(this);
        }
        try {
            var value = Number(number);
            if (isNaN(value) || !Number.isInteger(value)) {
                throw new Error();
            }
            return value;
        }
        catch (e) {
            this.cursor = start;
            throw CommandSyntaxError_1.CommandSyntaxError.READER_INVALID_INT.createWithContext(this, number);
        }
    };
    StringReader.prototype.readLong = function () {
        var start = this.cursor;
        while (this.canRead() && this.isAllowedNumber(this.peek())) {
            this.skip();
        }
        var number = this.string.substring(start, this.cursor);
        if (number.length === 0) {
            throw CommandSyntaxError_1.CommandSyntaxError.READER_EXPECTED_INT.createWithContext(this);
        }
        try {
            return BigInt(number);
        }
        catch (e) {
            this.cursor = start;
            throw CommandSyntaxError_1.CommandSyntaxError.READER_INVALID_INT.createWithContext(this, number);
        }
    };
    StringReader.prototype.readFloat = function () {
        var start = this.cursor;
        while (this.canRead() && this.isAllowedNumber(this.peek())) {
            this.skip();
        }
        var number = this.string.substring(start, this.cursor);
        if (number.length === 0) {
            throw CommandSyntaxError_1.CommandSyntaxError.READER_EXPECTED_FLOAT.createWithContext(this);
        }
        try {
            var value = Number(number);
            if (isNaN(value)) {
                throw new Error();
            }
            return value;
        }
        catch (e) {
            this.cursor = start;
            throw CommandSyntaxError_1.CommandSyntaxError.READER_INVALID_FLOAT.createWithContext(this, number);
        }
    };
    StringReader.prototype.isAllowedInUnquotedString = function (c) {
        return c >= "0" && c <= "9"
            || c >= "A" && c <= "Z"
            || c >= "a" && c <= "z"
            || c == "_" || c == "-"
            || c == "." || c == "+";
    };
    StringReader.prototype.isQuotedStringStart = function (c) {
        return c === "'" || c === "\"";
    };
    StringReader.prototype.readUnquotedString = function () {
        var start = this.cursor;
        while (this.canRead() && this.isAllowedInUnquotedString(this.peek())) {
            this.skip();
        }
        return this.string.substring(start, this.cursor);
    };
    StringReader.prototype.readStringUntil = function (terminator) {
        var result = [];
        var escaped = false;
        while (this.canRead()) {
            var c = this.read();
            if (escaped) {
                if (c === terminator || c === "\\") {
                    result.push(c);
                    escaped = false;
                }
                else {
                    this.setCursor(this.cursor - 1);
                    throw CommandSyntaxError_1.CommandSyntaxError.READER_INVALID_ESCAPE.createWithContext(this, c);
                }
            }
            else if (c === "\\") {
                escaped = true;
            }
            else if (c === terminator) {
                return result.join("");
            }
            else {
                result.push(c);
            }
        }
        throw CommandSyntaxError_1.CommandSyntaxError.READER_EXPECTED_END_OF_QUOTE.createWithContext(this);
    };
    StringReader.prototype.readString = function () {
        if (!this.canRead()) {
            return "";
        }
        var next = this.peek();
        if (this.isQuotedStringStart(next)) {
            this.skip();
            return this.readStringUntil(next);
        }
        return this.readUnquotedString();
    };
    StringReader.prototype.readBoolean = function () {
        var start = this.cursor;
        var value = this.readUnquotedString();
        if (value.length === 0) {
            throw CommandSyntaxError_1.CommandSyntaxError.READER_EXPECTED_BOOL.createWithContext(this);
        }
        if (value === "true") {
            return true;
        }
        else if (value === "false") {
            return false;
        }
        else {
            throw CommandSyntaxError_1.CommandSyntaxError.READER_INVALID_BOOL.createWithContext(this, value);
        }
    };
    return StringReader;
}());
exports.StringReader = StringReader;
