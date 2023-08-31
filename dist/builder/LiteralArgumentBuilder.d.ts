import { ArgumentBuilder, LiteralCommandNode } from "..";
export declare class LiteralArgumentBuilder<S> extends ArgumentBuilder<S, LiteralArgumentBuilder<S>> {
    private literal;
    constructor(literal: string);
    getThis(): LiteralArgumentBuilder<S>;
    getLiteral(): string;
    build(): LiteralCommandNode<S>;
}
export declare function literal(name: string): LiteralArgumentBuilder<any>;
