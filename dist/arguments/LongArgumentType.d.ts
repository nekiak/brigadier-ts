import { StringReader, NumberArgumentType } from "..";
export declare class LongArgumentType extends NumberArgumentType<BigInt> {
    private static readonly MIN;
    private static readonly MAX;
    constructor(minimum?: bigint, maximum?: bigint);
    readNumber(reader: StringReader): BigInt;
    getTooSmallError(): import("brigadier-ts/src/exceptions/CommandErrorType").CommandErrorType;
    getTooBigError(): import("brigadier-ts/src/exceptions/CommandErrorType").CommandErrorType;
}
