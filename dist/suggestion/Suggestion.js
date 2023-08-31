"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Suggestion = void 0;
var Suggestion = /** @class */ (function () {
    function Suggestion(range, text, tooltip) {
        this.range = range;
        this.text = text;
        this.tooltip = tooltip;
    }
    Suggestion.prototype.getRange = function () {
        return this.range;
    };
    Suggestion.prototype.getText = function () {
        return this.text;
    };
    Suggestion.prototype.getTooltip = function () {
        return this.tooltip;
    };
    Suggestion.prototype.apply = function (input) {
        if (this.range.getStart() == 0 && this.range.getEnd() === input.length) {
            return this.text;
        }
        var result = "";
        if (this.range.getStart() > 0) {
            result += input.substring(0, this.range.getStart());
        }
        result += this.text;
        if (this.range.getEnd() < input.length) {
            result += input.substring(this.range.getEnd());
        }
        return result;
    };
    Suggestion.prototype.expand = function (command, range) {
        if (range === this.range) {
            return this;
        }
        var result = "";
        if (range.getStart() < this.range.getStart()) {
            result += command.substring(range.getStart(), this.range.getStart());
        }
        result += this.text;
        if (range.getEnd() > this.range.getEnd()) {
            result += command.substring(this.range.getEnd(), range.getEnd());
        }
        return new Suggestion(range, result, this.tooltip);
    };
    return Suggestion;
}());
exports.Suggestion = Suggestion;
