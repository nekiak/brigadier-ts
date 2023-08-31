import { StringReader, Command, CommandContext, CommandContextBuilder, Predicate, RedirectModifier, SuggestionsBuilder, Suggestions } from '..';
export declare abstract class CommandNode<S> {
    private children;
    private literals;
    private arguments;
    private command;
    private requirement;
    private redirect;
    private modifier;
    private forks;
    constructor(command: Command<S>, requirement: Predicate<S>, redirect: CommandNode<S>, modifier: RedirectModifier<S>, forks: boolean);
    getCommand(): Command<S>;
    getChildren(): CommandNode<S>[];
    getChild(name: string): CommandNode<S>;
    getRedirect(): CommandNode<S>;
    getRedirectModifier(): RedirectModifier<S>;
    isFork(): boolean;
    canUse(source: S): boolean;
    addChild(node: CommandNode<S>): void;
    abstract parse(reader: StringReader, context: CommandContextBuilder<S>): void;
    abstract getName(): string;
    abstract getUsageText(): string;
    abstract listSuggestions(context: CommandContext<S>, builder: SuggestionsBuilder): Promise<Suggestions>;
    getRelevantNodes(input: StringReader): CommandNode<S>[];
}
