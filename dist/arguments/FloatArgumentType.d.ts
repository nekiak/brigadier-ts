import { StringReader, NumberArgumentType } from "..";
export declare class FloatArgumentType extends NumberArgumentType {
    constructor(minimum?: number, maximum?: number);
    readNumber(reader: StringReader): number;
    getTooSmallError(): import("brigadier-ts/src/exceptions/CommandErrorType").CommandErrorType;
    getTooBigError(): import("brigadier-ts/src/exceptions/CommandErrorType").CommandErrorType;
}
