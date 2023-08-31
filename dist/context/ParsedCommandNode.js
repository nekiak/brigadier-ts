"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsedCommandNode = void 0;
var ParsedCommandNode = /** @class */ (function () {
    function ParsedCommandNode(node, range) {
        this.node = node;
        this.range = range;
    }
    ParsedCommandNode.prototype.getNode = function () {
        return this.node;
    };
    ParsedCommandNode.prototype.getRange = function () {
        return this.range;
    };
    return ParsedCommandNode;
}());
exports.ParsedCommandNode = ParsedCommandNode;
