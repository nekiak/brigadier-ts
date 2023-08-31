"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandNode = void 0;
var __1 = require("..");
var CommandNode = /** @class */ (function () {
    function CommandNode(command, requirement, redirect, modifier, forks) {
        this.children = new Map();
        this.literals = new Map();
        this.arguments = new Map();
        this.command = command;
        this.requirement = requirement;
        this.redirect = redirect;
        this.modifier = modifier;
        this.forks = forks;
    }
    CommandNode.prototype.getCommand = function () {
        return this.command;
    };
    CommandNode.prototype.getChildren = function () {
        return Array.from(this.children.values());
    };
    CommandNode.prototype.getChild = function (name) {
        return this.children.get(name);
    };
    CommandNode.prototype.getRedirect = function () {
        return this.redirect;
    };
    CommandNode.prototype.getRedirectModifier = function () {
        return this.modifier;
    };
    CommandNode.prototype.isFork = function () {
        return this.forks;
    };
    CommandNode.prototype.canUse = function (source) {
        return this.requirement(source);
    };
    CommandNode.prototype.addChild = function (node) {
        var child = this.children.get(node.getName());
        if (child != null) {
            if (node.getCommand() != null) {
                child.command = node.getCommand();
            }
            node.getChildren().forEach(function (grandChild) {
                child.addChild(grandChild);
            });
        }
        else {
            this.children.set(node.getName(), node);
            if (node instanceof __1.LiteralCommandNode) {
                this.literals.set(node.getName(), node);
            }
            else if (node instanceof __1.ArgumentCommandNode) {
                this.arguments.set(node.getName(), node);
            }
        }
    };
    CommandNode.prototype.getRelevantNodes = function (input) {
        if (this.literals.size > 0) {
            var cursor = input.getCursor();
            while (input.canRead() && input.peek() != " ") {
                input.skip();
            }
            var text = input.getString().substring(cursor, input.getCursor());
            input.setCursor(cursor);
            var literal = this.literals.get(text);
            if (literal != null) {
                return [literal];
            }
        }
        return Array.from(this.arguments.values());
    };
    return CommandNode;
}());
exports.CommandNode = CommandNode;
