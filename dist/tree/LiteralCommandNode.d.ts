import { CommandNode, StringReader, Command, CommandContext, CommandContextBuilder, Predicate, RedirectModifier, Suggestions, SuggestionsBuilder } from '..';
export declare class LiteralCommandNode<S> extends CommandNode<S> {
    private literal;
    constructor(literal: string, command: Command<S>, requirement: Predicate<S>, redirect: CommandNode<S>, modifier: RedirectModifier<S>, forks: boolean);
    parse(reader: StringReader, contextBuilder: CommandContextBuilder<S>): void;
    private parseInternal;
    getName(): string;
    getUsageText(): string;
    listSuggestions(context: CommandContext<S>, builder: SuggestionsBuilder): Promise<Suggestions>;
}
