import { StringRange, Suggestion } from "..";
export declare class Suggestions {
    static EMPTY: Suggestions;
    private range;
    private suggestions;
    constructor(range: StringRange, suggestions: Suggestion[]);
    getRange(): StringRange;
    getList(): Suggestion[];
    isEmpty(): boolean;
    static empty(): Promise<Suggestions>;
    static merge(command: string, input: Suggestions[]): Suggestions;
    static create(command: string, suggestions: Suggestion[]): Suggestions;
}
