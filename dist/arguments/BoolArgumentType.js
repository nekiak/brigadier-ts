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
exports.bool = exports.BoolArgumentType = void 0;
var __1 = require("..");
var BoolArgumentType = /** @class */ (function (_super) {
    __extends(BoolArgumentType, _super);
    function BoolArgumentType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoolArgumentType.prototype.parse = function (reader) {
        return reader.readBoolean();
    };
    BoolArgumentType.prototype.listSuggestions = function (context, builder) {
        if ("true".startsWith(builder.getRemaining().toLowerCase())) {
            builder.suggest("true");
        }
        if ("false".startsWith(builder.getRemaining().toLowerCase())) {
            builder.suggest("false");
        }
        return builder.buildPromise();
    };
    return BoolArgumentType;
}(__1.ArgumentType));
exports.BoolArgumentType = BoolArgumentType;
function bool() {
    return new BoolArgumentType();
}
exports.bool = bool;
