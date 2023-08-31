"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseResults = void 0;
var ParseResults = /** @class */ (function () {
    function ParseResults(context, reader, errors) {
        this.context = context;
        this.reader = reader;
        this.errors = errors;
    }
    ParseResults.prototype.getContext = function () {
        return this.context;
    };
    ParseResults.prototype.getReader = function () {
        return this.reader;
    };
    ParseResults.prototype.getErrors = function () {
        return this.errors;
    };
    return ParseResults;
}());
exports.ParseResults = ParseResults;
