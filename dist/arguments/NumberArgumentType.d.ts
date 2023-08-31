import { ArgumentType, StringReader, CommandErrorType } from "..";
export declare abstract class NumberArgumentType<N extends number | BigInt = number> extends ArgumentType<N> {
    private minimum;
    private maximum;
    constructor(minimum: N, maximum: N);
    getMinimum(): N;
    getMaximum(): N;
    parse(reader: StringReader): N;
    abstract readNumber(reader: StringReader): N;
    abstract getTooSmallError(): CommandErrorType;
    abstract getTooBigError(): CommandErrorType;
}
