import { ArgumentType, CommandNode, StringReader, Command, CommandContext, CommandContextBuilder, Predicate, RedirectModifier, Suggestions, SuggestionsBuilder } from '..';
export declare class ArgumentCommandNode<S, T> extends CommandNode<S> {
    name: string;
    type: ArgumentType<T>;
    constructor(name: string, type: ArgumentType<T>, command: Command<S>, requirement: Predicate<S>, redirect: CommandNode<S>, modifier: RedirectModifier<S>, forks: boolean);
    getType(): ArgumentType<T>;
    parse(reader: StringReader, contextBuilder: CommandContextBuilder<S>): void;
    getName(): string;
    getUsageText(): string;
    listSuggestions(context: CommandContext<S>, builder: SuggestionsBuilder): Promise<Suggestions>;
}
