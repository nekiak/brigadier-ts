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
exports.RootCommandNode = void 0;
var __1 = require("..");
var RootCommandNode = /** @class */ (function (_super) {
    __extends(RootCommandNode, _super);
    function RootCommandNode() {
        return _super.call(this, null, function (c) { return true; }, null, function (c) { return null; }, false) || this;
    }
    RootCommandNode.prototype.parse = function (reader, contextBuilder) {
    };
    RootCommandNode.prototype.getName = function () {
        return "";
    };
    RootCommandNode.prototype.getUsageText = function () {
        return "";
    };
    RootCommandNode.prototype.listSuggestions = function (context, builder) {
        return __1.Suggestions.empty();
    };
    return RootCommandNode;
}(__1.CommandNode));
exports.RootCommandNode = RootCommandNode;
