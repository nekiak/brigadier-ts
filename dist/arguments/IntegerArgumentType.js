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
exports.IntegerArgumentType = void 0;
var __1 = require("..");
var IntegerArgumentType = /** @class */ (function (_super) {
    __extends(IntegerArgumentType, _super);
    function IntegerArgumentType(minimum, maximum) {
        if (minimum === void 0) { minimum = -2147483648; }
        if (maximum === void 0) { maximum = 2147483647; }
        return _super.call(this, minimum, maximum) || this;
    }
    IntegerArgumentType.prototype.readNumber = function (reader) {
        return reader.readInt();
    };
    IntegerArgumentType.prototype.getTooSmallError = function () {
        return __1.CommandSyntaxError.INTEGER_TOO_SMALL;
    };
    IntegerArgumentType.prototype.getTooBigError = function () {
        return __1.CommandSyntaxError.INTEGER_TOO_BIG;
    };
    return IntegerArgumentType;
}(__1.NumberArgumentType));
exports.IntegerArgumentType = IntegerArgumentType;
