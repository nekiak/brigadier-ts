"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestionsBuilder = void 0;
var __1 = require("..");
var SuggestionsBuilder = /** @class */ (function () {
    function SuggestionsBuilder(input, start) {
        this.input = input;
        this.start = start;
        this.remaining = input.substring(start);
        this.result = [];
    }
    SuggestionsBuilder.prototype.getInput = function () {
        return this.input;
    };
    SuggestionsBuilder.prototype.getStart = function () {
        return this.start;
    };
    SuggestionsBuilder.prototype.getRemaining = function () {
        return this.remaining;
    };
    SuggestionsBuilder.prototype.build = function () {
        return __1.Suggestions.create(this.input, this.result);
    };
    SuggestionsBuilder.prototype.buildPromise = function () {
        return Promise.resolve(this.build());
    };
    SuggestionsBuilder.prototype.suggest = function (text, tooltip) {
        if (text === this.remaining) {
            return this;
        }
        this.result.push(new __1.Suggestion(new __1.StringRange(this.start, this.input.length), text, tooltip));
        return this;
    };
    SuggestionsBuilder.prototype.add = function (other) {
        this.result.concat(other.result);
        return this;
    };
    SuggestionsBuilder.prototype.createOffset = function (start) {
        return new SuggestionsBuilder(this.input, start);
    };
    SuggestionsBuilder.prototype.restart = function (start) {
        return new SuggestionsBuilder(this.input, this.start);
    };
    return SuggestionsBuilder;
}());
exports.SuggestionsBuilder = SuggestionsBuilder;
