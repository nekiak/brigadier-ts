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
exports.argument = exports.RequiredArgumentBuilder = void 0;
var __1 = require("..");
var RequiredArgumentBuilder = /** @class */ (function (_super) {
    __extends(RequiredArgumentBuilder, _super);
    function RequiredArgumentBuilder(name, type) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.type = type;
        return _this;
    }
    RequiredArgumentBuilder.prototype.getThis = function () {
        return this;
    };
    RequiredArgumentBuilder.prototype.getName = function () {
        return this.name;
    };
    RequiredArgumentBuilder.prototype.getType = function () {
        return this.type;
    };
    RequiredArgumentBuilder.prototype.build = function () {
        var result = new __1.ArgumentCommandNode(this.getName(), this.getType(), this.getCommand(), this.getRequirement(), this.getRedirect(), this.getRedirectModifier(), this.isFork());
        for (var _i = 0, _a = this.getArguments(); _i < _a.length; _i++) {
            var argument_1 = _a[_i];
            result.addChild(argument_1);
        }
        return result;
    };
    return RequiredArgumentBuilder;
}(__1.ArgumentBuilder));
exports.RequiredArgumentBuilder = RequiredArgumentBuilder;
function argument(name, type) {
    return new RequiredArgumentBuilder(name, type);
}
exports.argument = argument;
