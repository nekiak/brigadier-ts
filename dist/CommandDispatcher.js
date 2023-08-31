"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandDispatcher = void 0;
var _1 = require(".");
var CommandDispatcher = exports.CommandDispatcher = /** @class */ (function () {
    function CommandDispatcher() {
        this.root = new _1.RootCommandNode();
    }
    CommandDispatcher.prototype.register = function (command) {
        var build = command.build();
        this.root.addChild(build);
        return build;
    };
    CommandDispatcher.prototype.execute = function (parse, source) {
        if (typeof (parse) === "string") {
            parse = this.parse(new _1.StringReader(parse), source);
        }
        if (parse.getReader().canRead()) {
            if (parse.getErrors().size == 1) {
                throw parse.getErrors().values().next();
            }
            else if (parse.getContext().getRange().isEmpty()) {
                throw _1.CommandSyntaxError.DISPATCHER_UNKNOWN_COMMAND.createWithContext(parse.getReader());
            }
            else {
                throw _1.CommandSyntaxError.DISPATCHER_UNKNOWN_ARGUMENT.createWithContext(parse.getReader());
            }
        }
        var result = 0;
        var successfulForks = 0;
        var forked = false;
        var foundCommand = false;
        var command = parse.getReader().getString();
        var original = parse.getContext().build(command);
        var contexts = [original];
        var next = [];
        while (contexts.length > 0) {
            var size = contexts.length;
            var _loop_1 = function (i) {
                var context = contexts[i];
                var child = context.getChild();
                if (child !== null) {
                    forked = forked || context.isForked();
                    if (child.hasNodes()) {
                        foundCommand = true;
                        var modifier = context.getRedirectModifier();
                        if (modifier === null) {
                            next.push(child.copyFor(context.getSource()));
                        }
                        else {
                            try {
                                var results = modifier(context);
                                results.forEach(function (source) {
                                    next.push(child.copyFor(source));
                                });
                            }
                            catch (e) {
                                if (!forked)
                                    throw e;
                            }
                        }
                    }
                }
                else if (context.getCommand()) {
                    foundCommand = true;
                    try {
                        var value = context.getCommand()(context);
                        result += (value || value === 0) ? value : 1;
                        successfulForks++;
                    }
                    catch (e) {
                        if (!forked)
                            throw e;
                    }
                }
            };
            for (var i = 0; i < size; i++) {
                _loop_1(i);
            }
            contexts = next;
            next = [];
        }
        if (!foundCommand) {
            throw _1.CommandSyntaxError.DISPATCHER_UNKNOWN_COMMAND.createWithContext(parse.getReader());
        }
        return forked ? successfulForks : result;
    };
    CommandDispatcher.prototype.parse = function (reader, source) {
        reader = new _1.StringReader(reader);
        var context = new _1.CommandContextBuilder(this, source, this.root, reader.getCursor());
        return this.parseNodes(this.root, reader, context);
    };
    CommandDispatcher.prototype.parseNodes = function (node, originalReader, contextSoFar) {
        var source = contextSoFar.getSource();
        var errors = new Map();
        var potentials = [];
        var cursor = originalReader.getCursor();
        for (var _i = 0, _a = node.getRelevantNodes(originalReader); _i < _a.length; _i++) {
            var child = _a[_i];
            if (!child.canUse(source)) {
                continue;
            }
            var context = contextSoFar.copy();
            var reader = new _1.StringReader(originalReader);
            try {
                try {
                    child.parse(reader, context);
                }
                catch (e) {
                    if (e instanceof _1.CommandSyntaxError) {
                        throw e;
                    }
                    else {
                        throw _1.CommandSyntaxError.DISPATCHER_PARSE_ERROR.createWithContext(reader, e.message);
                    }
                }
                if (reader.canRead() && reader.peek() !== " ") {
                    throw _1.CommandSyntaxError.DISPATCHER_EXPECTED_ARGUMENT_SEPARATOR.createWithContext(reader);
                }
            }
            catch (e) {
                if (e instanceof _1.CommandSyntaxError) {
                    errors.set(child, e);
                    reader.setCursor(cursor);
                    continue;
                }
                else {
                    throw e;
                }
            }
            context.withCommand(child.getCommand());
            if (reader.canRead(child.getRedirect() === null ? 2 : 1)) {
                reader.skip();
                if (child.getRedirect()) {
                    var childContext = new _1.CommandContextBuilder(this, source, child.getRedirect(), reader.getCursor());
                    var parse = this.parseNodes(child.getRedirect(), reader, childContext);
                    context.withChild(parse.getContext());
                    return new _1.ParseResults(context, parse.getReader(), parse.getErrors());
                }
                else {
                    potentials.push(this.parseNodes(child, reader, context));
                }
            }
            else {
                potentials.push(new _1.ParseResults(context, reader, new Map()));
            }
        }
        if (potentials.length == 0) {
            potentials.push(new _1.ParseResults(contextSoFar, originalReader, errors));
        }
        return potentials[0];
    };
    CommandDispatcher.prototype.getAllUsage = function (node, source, restricted) {
        var result = [];
        this.getAllUsageImpl(node, source, result, "", restricted);
        return result;
    };
    CommandDispatcher.prototype.getAllUsageImpl = function (node, source, result, prefix, restricted) {
        if (restricted && !node.canUse(source)) {
            return;
        }
        if (node.getCommand() != null) {
            result.push(prefix);
        }
        if (node.getRedirect() != null) {
            var redirect = node.getRedirect() === this.root ? "..." : "-> " + node.getRedirect().getUsageText();
            result.push(prefix.length === 0 ? node.getUsageText() + " " + redirect : prefix + " " + redirect);
        }
        else if (node.getChildren().length > 0) {
            for (var _i = 0, _a = node.getChildren(); _i < _a.length; _i++) {
                var child = _a[_i];
                var newPrefix = prefix.length === 0 ? child.getUsageText() : prefix + " " + child.getUsageText();
                this.getAllUsageImpl(child, source, result, newPrefix, restricted);
            }
        }
    };
    CommandDispatcher.prototype.getCompletionSuggestions = function (parse, cursor) {
        return __awaiter(this, void 0, void 0, function () {
            var context, nodeBeforeCursor, parent, start, fullInput, truncatedInput, promises, _i, _a, node, promise, suggestions;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (cursor === undefined) {
                            cursor = parse.getReader().getTotalLength();
                        }
                        context = parse.getContext();
                        nodeBeforeCursor = context.findSuggestionContext(cursor);
                        parent = nodeBeforeCursor.parent;
                        start = Math.min(nodeBeforeCursor.startPos, cursor);
                        fullInput = parse.getReader().getString();
                        truncatedInput = fullInput.substring(0, cursor);
                        promises = [];
                        for (_i = 0, _a = parent.getChildren(); _i < _a.length; _i++) {
                            node = _a[_i];
                            promise = _1.Suggestions.empty();
                            try {
                                promise = node.listSuggestions(context.build(truncatedInput), new _1.SuggestionsBuilder(truncatedInput, start));
                            }
                            catch (ignored) {
                                console.log("???", ignored);
                            }
                            promises.push(promise);
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        suggestions = _b.sent();
                        return [2 /*return*/, _1.Suggestions.merge(fullInput, suggestions)];
                }
            });
        });
    };
    CommandDispatcher.prototype.getSmartUsage = function (node, source, optional, deep) {
        if (optional === undefined && deep === undefined) {
            var result = new Map();
            var optional_1 = node.getCommand() !== undefined && node.getCommand() !== null;
            var children = node.getChildren();
            for (var index in children) {
                var child = children[index];
                var usage = this.getSmartUsage(child, source, optional_1, false);
                if (usage !== undefined) {
                    result.set(child, usage);
                }
            }
            return result;
        }
        else {
            if (!node.canUse(source)) {
                return undefined;
            }
            var self_1 = optional ? CommandDispatcher.USAGE_OPTIONAL_OPEN + node.getUsageText() + CommandDispatcher.USAGE_OPTIONAL_CLOSE : node.getUsageText();
            var childOptional = node.getCommand() !== undefined;
            var open_1 = childOptional ? CommandDispatcher.USAGE_OPTIONAL_OPEN : CommandDispatcher.USAGE_REQUIRED_OPEN;
            var close_1 = childOptional ? CommandDispatcher.USAGE_OPTIONAL_CLOSE : CommandDispatcher.USAGE_REQUIRED_CLOSE;
            if (!deep) {
                if (node.getRedirect() !== undefined) {
                    var redirect = node.getRedirect() === this.root ? "..." : "-> " + node.getRedirect().getUsageText();
                    return self_1 + " " + redirect;
                }
                else {
                    var children = node.getChildren().filter(function (c) { return c.canUse(source); });
                    if (children.length === 1) {
                        var usage = String(this.getSmartUsage(children[0], source, childOptional, childOptional));
                        if (usage !== undefined) {
                            return self_1 + " " + usage;
                        }
                    }
                    else if (children.length > 1) {
                        var childUsage = new Set();
                        for (var index in children) {
                            var child = children[index];
                            var usage = this.getSmartUsage(child, source, childOptional, true);
                            if (usage !== undefined) {
                                childUsage.add(usage);
                            }
                        }
                        if (childUsage.size === 1) {
                            var usage = childUsage.values().next().value;
                            return self_1 + " " + (childOptional ? CommandDispatcher.USAGE_OPTIONAL_OPEN + usage + CommandDispatcher.USAGE_OPTIONAL_CLOSE : usage);
                        }
                        else if (childUsage.size > 1) {
                            var builder = open_1;
                            for (var index = 0; index < children.length; index++) {
                                var child = children[index];
                                if (index > 0) {
                                    builder += CommandDispatcher.USAGE_OR;
                                }
                                builder += child.getUsageText();
                            }
                            if (children.length > 0) {
                                builder += close_1;
                                return self_1 + " " + builder;
                            }
                        }
                    }
                }
            }
        }
    };
    CommandDispatcher.prototype.getRoot = function () {
        return this.root;
    };
    CommandDispatcher.USAGE_OPTIONAL_OPEN = "[";
    CommandDispatcher.USAGE_OPTIONAL_CLOSE = "]";
    CommandDispatcher.USAGE_REQUIRED_OPEN = "(";
    CommandDispatcher.USAGE_REQUIRED_CLOSE = ")";
    CommandDispatcher.USAGE_OR = "|";
    return CommandDispatcher;
}());
