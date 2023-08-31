import { CommandNode } from "..";
export declare class SuggestionContext<S> {
    parent: CommandNode<S>;
    startPos: number;
    constructor(parent: CommandNode<S>, startPos: number);
}
