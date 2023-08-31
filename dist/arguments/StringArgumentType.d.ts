import { ArgumentType, StringReader } from "..";
type StringType = "single_word" | "quotable_phrase" | "greedy_phrase";
export declare class StringArgumentType extends ArgumentType<string> {
    private type;
    constructor(type: StringType);
    getType(): StringType;
    parse(reader: StringReader): string;
}
export declare function word(): StringArgumentType;
export declare function string(): StringArgumentType;
export declare function greedyString(): StringArgumentType;
export {};
