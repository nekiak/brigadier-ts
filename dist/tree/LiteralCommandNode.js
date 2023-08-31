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
exports.LiteralCommandNode = void 0;
var __1 = require("..");
var LiteralCommandNode = /** @class */ (function (_super) {
    __extends(LiteralCommandNode, _super);
    function LiteralCommandNode(literal, command, requirement, redirect, modifier, forks) {
        var _this = _super.call(this, command, requirement, redirect, modifier, forks) || this;
        _this.literal = literal;
        return _this;
    }
    LiteralCommandNode.prototype.parse = function (reader, contextBuilder) {
        var start = reader.getCursor();
        var end = this.parseInternal(reader);
        if (end > -1) {
            contextBuilder.withNode(this, new __1.StringRange(start, end));
            return;
        }
        throw __1.CommandSyntaxError.LITERAL_INCORRECT.createWithContext(reader, this.literal);
    };
    LiteralCommandNode.prototype.parseInternal = function (reader) {
        var start = reader.getCursor();
        if (reader.canRead(this.literal.length)) {
            var end = start + this.literal.length;
            if (reader.getString().substr(start, this.literal.length) === this.literal) {
                reader.setCursor(end);
                if (!reader.canRead() || reader.peek() == " ") {
                    return end;
                }
                else {
                    reader.setCursor(start);
                }
            }
        }
        return -1;
    };
    LiteralCommandNode.prototype.getName = function () {
        return this.literal;
    };
    LiteralCommandNode.prototype.getUsageText = function () {
        return this.literal;
    };
    LiteralCommandNode.prototype.listSuggestions = function (context, builder) {
        if (this.literal.toLowerCase().startsWith(builder.getRemaining().toLowerCase())) {
            return builder.suggest(this.literal).buildPromise();
        }
        else {
            return __1.Suggestions.empty();
        }
    };
    return LiteralCommandNode;
}(__1.CommandNode));
exports.LiteralCommandNode = LiteralCommandNode;
