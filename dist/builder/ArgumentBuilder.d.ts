import { CommandNode, Command, Predicate, CommandContext } from "..";
export type RedirectModifier<S> = (context: CommandContext<S>) => S | S[];
export declare abstract class ArgumentBuilder<S, T extends ArgumentBuilder<S, T>> {
    private arguments;
    private command;
    private requirement;
    private target;
    private modifier;
    private forks;
    constructor();
    abstract getThis(): T;
    then(argument: ArgumentBuilder<S, any> | CommandNode<S>): T;
    executes(command: Command<S>): T;
    requires(requirement: Predicate<S>): T;
    redirect(target: CommandNode<S>, modifier?: RedirectModifier<S>): T;
    fork(target: CommandNode<S>, modifier: RedirectModifier<S>): T;
    forward(target: CommandNode<S>, modifier: RedirectModifier<S>, forks: boolean): T;
    getArguments(): CommandNode<S>[];
    getCommand(): Command<S>;
    getRequirement(): Predicate<S>;
    getRedirect(): CommandNode<S>;
    getRedirectModifier(): RedirectModifier<S>;
    isFork(): boolean;
    abstract build(): CommandNode<S>;
}
