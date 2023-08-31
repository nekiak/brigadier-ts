"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandContextBuilder = void 0;
var __1 = require("..");
var CommandContextBuilder = /** @class */ (function () {
    function CommandContextBuilder(dispatcher, source, rootNode, start) {
        this.dispatcher = dispatcher;
        this.source = source;
        this.rootNode = rootNode;
        this.range = __1.StringRange.at(start);
        this.nodes = [];
        this.arguments = new Map();
    }
    CommandContextBuilder.prototype.withSource = function (source) {
        this.source = source;
        return this;
    };
    CommandContextBuilder.prototype.getSource = function () {
        return this.source;
    };
    CommandContextBuilder.prototype.getRootNode = function () {
        return this.rootNode;
    };
    CommandContextBuilder.prototype.withArgument = function (name, argument) {
        this.arguments.set(name, argument);
        return this;
    };
    CommandContextBuilder.prototype.getArguments = function () {
        return this.arguments;
    };
    CommandContextBuilder.prototype.withChild = function (child) {
        this.child = child;
        return this;
    };
    CommandContextBuilder.prototype.getChild = function () {
        return this.child;
    };
    CommandContextBuilder.prototype.getLastChild = function () {
        var result = this;
        while (result.getChild() != null) {
            result = result.getChild();
        }
        return result;
    };
    CommandContextBuilder.prototype.withCommand = function (command) {
        this.command = command;
        return this;
    };
    CommandContextBuilder.prototype.getCommand = function () {
        return this.command;
    };
    CommandContextBuilder.prototype.withNode = function (node, range) {
        this.nodes.push(new __1.ParsedCommandNode(node, range));
        this.range = __1.StringRange.encompassing(this.range, range);
        this.modifier = node.getRedirectModifier();
        this.forks = node.isFork();
        return this;
    };
    CommandContextBuilder.prototype.getNodes = function () {
        return this.nodes;
    };
    CommandContextBuilder.prototype.copy = function () {
        var _a;
        var copy = new CommandContextBuilder(this.dispatcher, this.source, this.rootNode, this.range.getStart());
        copy.command = this.command;
        copy.child = this.child;
        copy.range = this.range;
        (_a = copy.nodes).push.apply(_a, this.nodes);
        this.arguments.forEach(function (v, k) {
            copy.arguments.set(k, v);
        });
        return copy;
    };
    CommandContextBuilder.prototype.build = function (input) {
        var child = this.child == null ? null : this.child.build(input);
        return new __1.CommandContext(this.source, input, this.arguments, this.command, this.rootNode, this.nodes, this.range, child, this.modifier, this.forks);
    };
    CommandContextBuilder.prototype.getDispatcher = function () {
        return this.dispatcher;
    };
    CommandContextBuilder.prototype.getRange = function () {
        return this.range;
    };
    CommandContextBuilder.prototype.findSuggestionContext = function (cursor) {
        if (this.range.getStart() <= cursor) {
            if (this.range.getEnd() < cursor) {
                if (this.child != null) {
                    return this.child.findSuggestionContext(cursor);
                }
                else if (this.nodes.length > 0) {
                    var last = this.nodes[this.nodes.length - 1];
                    return new __1.SuggestionContext(last.getNode(), last.getRange().getEnd() + 1);
                }
                else {
                    return new __1.SuggestionContext(this.rootNode, this.range.getStart());
                }
            }
            else {
                var prev = this.rootNode;
                for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
                    var node = _a[_i];
                    var nodeRange = node.getRange();
                    if (nodeRange.getStart() <= cursor && cursor <= nodeRange.getEnd()) {
                        return new __1.SuggestionContext(prev, nodeRange.getStart());
                    }
                    prev = node.getNode();
                }
                if (prev === null) {
                    throw new Error("Can't find node before cursor");
                }
                return new __1.SuggestionContext(prev, this.range.getStart());
            }
        }
        throw new Error("Can't find node before cursor");
    };
    return CommandContextBuilder;
}());
exports.CommandContextBuilder = CommandContextBuilder;
