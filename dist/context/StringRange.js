"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringRange = void 0;
var StringRange = /** @class */ (function () {
    function StringRange(start, end) {
        this.start = start;
        this.end = end;
    }
    StringRange.at = function (pos) {
        return new StringRange(pos, pos);
    };
    StringRange.encompassing = function (a, b) {
        var start = Math.min(a.getStart(), b.getStart());
        var end = Math.max(a.getEnd(), b.getEnd());
        return new StringRange(start, end);
    };
    StringRange.prototype.getStart = function () {
        return this.start;
    };
    StringRange.prototype.getEnd = function () {
        return this.end;
    };
    StringRange.prototype.isEmpty = function () {
        return this.start === this.end;
    };
    StringRange.prototype.getLength = function () {
        return this.end - this.start;
    };
    return StringRange;
}());
exports.StringRange = StringRange;
