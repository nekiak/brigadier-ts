import { ArgumentBuilder, ArgumentType, ArgumentCommandNode } from "..";
export declare class RequiredArgumentBuilder<S, T> extends ArgumentBuilder<S, RequiredArgumentBuilder<S, T>> {
    private name;
    private type;
    constructor(name: string, type: ArgumentType<T>);
    getThis(): RequiredArgumentBuilder<S, T>;
    getName(): string;
    getType(): ArgumentType<T>;
    build(): ArgumentCommandNode<S, T>;
}
export declare function argument(name: string, type: ArgumentType<any>): RequiredArgumentBuilder<any, any>;
