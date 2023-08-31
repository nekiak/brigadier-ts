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
exports.LongArgumentType = void 0;
var __1 = require("..");
var LongArgumentType = exports.LongArgumentType = /** @class */ (function (_super) {
    __extends(LongArgumentType, _super);
    function LongArgumentType(minimum, maximum) {
        if (minimum === void 0) { minimum = LongArgumentType.MIN; }
        if (maximum === void 0) { maximum = LongArgumentType.MAX; }
        return _super.call(this, minimum, maximum) || this;
    }
    LongArgumentType.prototype.readNumber = function (reader) {
        return reader.readLong();
    };
    LongArgumentType.prototype.getTooSmallError = function () {
        return __1.CommandSyntaxError.LONG_TOO_SMALL;
    };
    LongArgumentType.prototype.getTooBigError = function () {
        return __1.CommandSyntaxError.LONG_TOO_BIG;
    };
    LongArgumentType.MIN = BigInt("-9223372036854775808");
    LongArgumentType.MAX = BigInt("9223372036854775807");
    return LongArgumentType;
}(__1.NumberArgumentType));
