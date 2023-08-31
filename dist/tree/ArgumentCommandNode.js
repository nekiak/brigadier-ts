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
exports.ArgumentCommandNode = void 0;
var __1 = require("..");
var ArgumentCommandNode = /** @class */ (function (_super) {
    __extends(ArgumentCommandNode, _super);
    function ArgumentCommandNode(name, type, command, requirement, redirect, modifier, forks) {
        var _this = _super.call(this, command, requirement, redirect, modifier, forks) || this;
        _this.name = name;
        _this.type = type;
        return _this;
    }
    ArgumentCommandNode.prototype.getType = function () {
        return this.type;
    };
    ArgumentCommandNode.prototype.parse = function (reader, contextBuilder) {
        var start = reader.getCursor();
        var result = this.type.parse(reader);
        var parsed = new __1.ParsedArgument(start, reader.getCursor(), result);
        contextBuilder.withArgument(this.name, parsed);
        contextBuilder.withNode(this, parsed.getRange());
    };
    ArgumentCommandNode.prototype.getName = function () {
        return this.name;
    };
    ArgumentCommandNode.prototype.getUsageText = function () {
        return "<" + this.name + ">";
    };
    ArgumentCommandNode.prototype.listSuggestions = function (context, builder) {
        return __1.Suggestions.empty();
    };
    return ArgumentCommandNode;
}(__1.CommandNode));
exports.ArgumentCommandNode = ArgumentCommandNode;
