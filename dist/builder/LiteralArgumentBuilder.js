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
exports.literal = exports.LiteralArgumentBuilder = void 0;
var __1 = require("..");
var LiteralArgumentBuilder = /** @class */ (function (_super) {
    __extends(LiteralArgumentBuilder, _super);
    function LiteralArgumentBuilder(literal) {
        var _this = _super.call(this) || this;
        _this.literal = literal;
        return _this;
    }
    LiteralArgumentBuilder.prototype.getThis = function () {
        return this;
    };
    LiteralArgumentBuilder.prototype.getLiteral = function () {
        return this.literal;
    };
    LiteralArgumentBuilder.prototype.build = function () {
        var result = new __1.LiteralCommandNode(this.getLiteral(), this.getCommand(), this.getRequirement(), this.getRedirect(), this.getRedirectModifier(), this.isFork());
        for (var _i = 0, _a = this.getArguments(); _i < _a.length; _i++) {
            var argument = _a[_i];
            result.addChild(argument);
        }
        return result;
    };
    return LiteralArgumentBuilder;
}(__1.ArgumentBuilder));
exports.LiteralArgumentBuilder = LiteralArgumentBuilder;
function literal(name) {
    return new LiteralArgumentBuilder(name);
}
exports.literal = literal;
