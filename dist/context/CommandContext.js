"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandContext = void 0;
var CommandContext = /** @class */ (function () {
    function CommandContext(source, input, parsedArguments, command, rootNode, nodes, range, child, modifier, forks) {
        this.source = source;
        this.input = input;
        this.arguments = parsedArguments;
        this.command = command;
        this.rootNode = rootNode;
        this.nodes = nodes;
        this.range = range;
        this.child = child;
        this.modifier = modifier;
        this.forks = forks;
    }
    CommandContext.prototype.copyFor = function (source) {
        if (this.source === source) {
            return this;
        }
        return new CommandContext(source, this.input, this.arguments, this.command, this.rootNode, this.nodes, this.range, this.child, this.modifier, this.forks);
    };
    CommandContext.prototype.getChild = function () {
        return this.child;
    };
    CommandContext.prototype.getLastChild = function () {
        var result = this;
        while (result.getChild() != null) {
            result = result.getChild();
        }
        return result;
    };
    CommandContext.prototype.getCommand = function () {
        return this.command;
    };
    CommandContext.prototype.getSource = function () {
        return this.source;
    };
    CommandContext.prototype.getRootNode = function () {
        return this.rootNode;
    };
    CommandContext.prototype.get = function (name) {
        var argument = this.arguments.get(name);
        // TODO: Throw exception when argument is null
        return argument.getResult();
    };
    CommandContext.prototype.getRedirectModifier = function () {
        return this.modifier;
    };
    CommandContext.prototype.getRange = function () {
        return this.range;
    };
    CommandContext.prototype.getInput = function () {
        return this.input;
    };
    CommandContext.prototype.getNodes = function () {
        return this.nodes;
    };
    CommandContext.prototype.hasNodes = function () {
        return this.nodes.length !== 0;
    };
    CommandContext.prototype.isForked = function () {
        return this.forks;
    };
    return CommandContext;
}());
exports.CommandContext = CommandContext;
