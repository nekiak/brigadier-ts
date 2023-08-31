"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentBuilder = void 0;
var __1 = require("..");
var ArgumentBuilder = /** @class */ (function () {
    function ArgumentBuilder() {
        this.arguments = new __1.RootCommandNode();
        this.requirement = function (s) { return true; };
    }
    ArgumentBuilder.prototype.then = function (argument) {
        var child = argument instanceof __1.CommandNode ? argument : argument.build();
        this.arguments.addChild(child);
        return this.getThis();
    };
    ArgumentBuilder.prototype.executes = function (command) {
        this.command = command;
        return this.getThis();
    };
    ArgumentBuilder.prototype.requires = function (requirement) {
        this.requirement = requirement;
        return this.getThis();
    };
    ArgumentBuilder.prototype.redirect = function (target, modifier) {
        if (modifier === void 0) { modifier = null; }
        return this.forward(target, modifier, false);
    };
    ArgumentBuilder.prototype.fork = function (target, modifier) {
        return this.forward(target, modifier, true);
    };
    ArgumentBuilder.prototype.forward = function (target, modifier, forks) {
        this.target = target;
        this.modifier = modifier;
        this.forks = forks;
        return this.getThis();
    };
    ArgumentBuilder.prototype.getArguments = function () {
        return this.arguments.getChildren();
    };
    ArgumentBuilder.prototype.getCommand = function () {
        return this.command;
    };
    ArgumentBuilder.prototype.getRequirement = function () {
        return this.requirement;
    };
    ArgumentBuilder.prototype.getRedirect = function () {
        return this.target;
    };
    ArgumentBuilder.prototype.getRedirectModifier = function () {
        return this.modifier;
    };
    ArgumentBuilder.prototype.isFork = function () {
        return this.forks;
    };
    return ArgumentBuilder;
}());
exports.ArgumentBuilder = ArgumentBuilder;
