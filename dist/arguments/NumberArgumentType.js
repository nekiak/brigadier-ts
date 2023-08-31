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
exports.NumberArgumentType = void 0;
var __1 = require("..");
var NumberArgumentType = /** @class */ (function (_super) {
    __extends(NumberArgumentType, _super);
    function NumberArgumentType(minimum, maximum) {
        var _this = _super.call(this) || this;
        _this.minimum = minimum;
        _this.maximum = maximum;
        return _this;
    }
    NumberArgumentType.prototype.getMinimum = function () {
        return this.minimum;
    };
    NumberArgumentType.prototype.getMaximum = function () {
        return this.maximum;
    };
    NumberArgumentType.prototype.parse = function (reader) {
        var start = reader.getCursor();
        var result = this.readNumber(reader);
        if (result < this.minimum) {
            reader.setCursor(start);
            throw this.getTooSmallError().createWithContext(reader, result, this.minimum);
        }
        else if (result > this.maximum) {
            reader.setCursor(start);
            throw this.getTooBigError().createWithContext(reader, result, this.maximum);
        }
        return result;
    };
    return NumberArgumentType;
}(__1.ArgumentType));
exports.NumberArgumentType = NumberArgumentType;
