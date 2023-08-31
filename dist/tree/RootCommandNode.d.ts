import { CommandNode, StringReader, CommandContextBuilder, CommandContext, Suggestions, SuggestionsBuilder } from '..';
export declare class RootCommandNode<S> extends CommandNode<S> {
    constructor();
    parse(reader: StringReader, contextBuilder: CommandContextBuilder<S>): void;
    getName(): string;
    getUsageText(): string;
    listSuggestions(context: CommandContext<S>, builder: SuggestionsBuilder): Promise<Suggestions>;
}
