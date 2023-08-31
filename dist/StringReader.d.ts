export declare class StringReader {
    private string;
    private cursor;
    constructor(string: string | StringReader);
    getString(): string;
    getCursor(): number;
    setCursor(cursor: number): void;
    getRemainingLength(): number;
    getTotalLength(): number;
    getRead(): string;
    getRemaining(): string;
    canRead(length?: number): boolean;
    peek(offset?: number): string;
    read(): string;
    skip(): void;
    isAllowedNumber(c: string): boolean;
    readInt(): number;
    readLong(): BigInt;
    readFloat(): number;
    isAllowedInUnquotedString(c: string): boolean;
    isQuotedStringStart(c: string): boolean;
    readUnquotedString(): string;
    readStringUntil(terminator: string): string;
    readString(): string;
    readBoolean(): boolean;
}
