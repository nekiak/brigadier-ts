"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandErrorType = void 0;
var __1 = require("..");
var CommandErrorType = /** @class */ (function () {
    function CommandErrorType(func) {
        this.func = func;
    }
    CommandErrorType.prototype.create = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var message = this.func.apply(this, args);
        return new __1.CommandSyntaxError(message);
    };
    CommandErrorType.prototype.createWithContext = function (reader) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var message = this.func.apply(this, args);
        return new __1.CommandSyntaxError(message, reader.getString(), reader.getCursor());
    };
    return CommandErrorType;
}());
exports.CommandErrorType = CommandErrorType;
