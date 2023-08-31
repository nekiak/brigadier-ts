import { Suggestions } from "..";
export declare class SuggestionsBuilder {
    private input;
    private start;
    private remaining;
    private result;
    constructor(input: string, start: number);
    getInput(): string;
    getStart(): number;
    getRemaining(): string;
    build(): Suggestions;
    buildPromise(): Promise<Suggestions>;
    suggest(text: string, tooltip?: string): SuggestionsBuilder;
    add(other: SuggestionsBuilder): SuggestionsBuilder;
    createOffset(start: number): SuggestionsBuilder;
    restart(start: number): SuggestionsBuilder;
}
