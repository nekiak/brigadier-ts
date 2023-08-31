"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Suggestions = void 0;
var __1 = require("..");
var Suggestions = exports.Suggestions = /** @class */ (function () {
    function Suggestions(range, suggestions) {
        this.range = range;
        this.suggestions = suggestions;
    }
    Suggestions.prototype.getRange = function () {
        return this.range;
    };
    Suggestions.prototype.getList = function () {
        return this.suggestions;
    };
    Suggestions.prototype.isEmpty = function () {
        return this.suggestions.length === 0;
    };
    Suggestions.empty = function () {
        return Promise.resolve(Suggestions.EMPTY);
    };
    Suggestions.merge = function (command, input) {
        if (input.length === 0) {
            return Suggestions.EMPTY;
        }
        else if (input.length === 1) {
            return input[0];
        }
        var texts = new Set();
        for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
            var suggestions = input_1[_i];
            suggestions.getList().forEach(function (s) { return texts.add(s); });
        }
        return Suggestions.create(command, Array.from(texts));
    };
    Suggestions.create = function (command, suggestions) {
        if (suggestions.length === 0) {
            return Suggestions.EMPTY;
        }
        var start = Infinity;
        var end = -Infinity;
        for (var _i = 0, suggestions_1 = suggestions; _i < suggestions_1.length; _i++) {
            var suggestion = suggestions_1[_i];
            start = Math.min(suggestion.getRange().getStart(), start);
            end = Math.max(suggestion.getRange().getEnd(), end);
        }
        var range = new __1.StringRange(start, end);
        var texts = [];
        for (var _a = 0, suggestions_2 = suggestions; _a < suggestions_2.length; _a++) {
            var suggestion = suggestions_2[_a];
            texts.push(suggestion.expand(command, range));
        }
        return new Suggestions(range, texts.sort());
    };
    Suggestions.EMPTY = new Suggestions(__1.StringRange.at(0), []);
    return Suggestions;
}());
