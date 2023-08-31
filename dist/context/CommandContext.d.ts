import { Command, CommandNode, StringRange, ParsedArgument, ParsedCommandNode, RedirectModifier } from "..";
export declare class CommandContext<S> {
    private source;
    private input;
    private arguments;
    private nodes;
    private command;
    private rootNode;
    private child;
    private range;
    private modifier;
    private forks;
    constructor(source: S, input: string, parsedArguments: Map<string, ParsedArgument<any>>, command: Command<S>, rootNode: CommandNode<S>, nodes: ParsedCommandNode<S>[], range: StringRange, child: CommandContext<S>, modifier: RedirectModifier<S>, forks: boolean);
    copyFor(source: S): CommandContext<S>;
    getChild(): CommandContext<S>;
    getLastChild(): CommandContext<S>;
    getCommand(): Command<S>;
    getSource(): S;
    getRootNode(): CommandNode<S>;
    get(name: string): any;
    getRedirectModifier(): RedirectModifier<S>;
    getRange(): StringRange;
    getInput(): string;
    getNodes(): ParsedCommandNode<S>[];
    hasNodes(): boolean;
    isForked(): boolean;
}
