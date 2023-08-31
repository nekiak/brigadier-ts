export declare class StringRange {
    private start;
    private end;
    constructor(start: number, end: number);
    static at(pos: number): StringRange;
    static encompassing(a: StringRange, b: StringRange): StringRange;
    getStart(): number;
    getEnd(): number;
    isEmpty(): boolean;
    getLength(): number;
}
