import { StringRange } from "..";
export declare class Suggestion {
    private range;
    private text;
    private tooltip;
    constructor(range: StringRange, text: string, tooltip?: string);
    getRange(): StringRange;
    getText(): string;
    getTooltip(): string;
    apply(input: string): string;
    expand(command: string, range: StringRange): Suggestion;
}
