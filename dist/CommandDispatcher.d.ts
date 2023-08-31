import { RootCommandNode, LiteralCommandNode, StringReader, LiteralArgumentBuilder, CommandNode, ParseResults, Suggestions } from ".";
export declare class CommandDispatcher<S> {
    private root;
    private static USAGE_OPTIONAL_OPEN;
    private static USAGE_OPTIONAL_CLOSE;
    private static USAGE_REQUIRED_OPEN;
    private static USAGE_REQUIRED_CLOSE;
    private static USAGE_OR;
    constructor();
    register(command: LiteralArgumentBuilder<S>): LiteralCommandNode<S>;
    execute(parse: ParseResults<S> | string, source: S): number;
    parse(reader: StringReader | string, source: S): ParseResults<S>;
    private parseNodes;
    getAllUsage(node: CommandNode<S>, source: S, restricted: boolean): String[];
    private getAllUsageImpl;
    getCompletionSuggestions(parse: ParseResults<S>, cursor?: number): Promise<Suggestions>;
    getSmartUsage(node: CommandNode<S>, source: S): Map<CommandNode<S>, string>;
    getSmartUsage(node: CommandNode<S>, source: S, optional: boolean, deep: boolean): string;
    getRoot(): RootCommandNode<S>;
}
