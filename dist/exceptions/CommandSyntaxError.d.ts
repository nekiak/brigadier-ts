import { CommandErrorType } from "..";
export declare class CommandSyntaxError extends Error {
    private input;
    private cursor;
    constructor(message: string, input?: string, cursor?: number);
    static DOUBLE_TOO_SMALL: CommandErrorType;
    static DOUBLE_TOO_BIG: CommandErrorType;
    static FLOAT_TOO_SMALL: CommandErrorType;
    static FLOAT_TOO_BIG: CommandErrorType;
    static INTEGER_TOO_SMALL: CommandErrorType;
    static INTEGER_TOO_BIG: CommandErrorType;
    static LONG_TOO_SMALL: CommandErrorType;
    static LONG_TOO_BIG: CommandErrorType;
    static LITERAL_INCORRECT: CommandErrorType;
    static READER_EXPECTED_START_OF_QUOTE: CommandErrorType;
    static READER_EXPECTED_END_OF_QUOTE: CommandErrorType;
    static READER_INVALID_ESCAPE: CommandErrorType;
    static READER_INVALID_BOOL: CommandErrorType;
    static READER_EXPECTED_BOOL: CommandErrorType;
    static READER_INVALID_INT: CommandErrorType;
    static READER_EXPECTED_INT: CommandErrorType;
    static READER_INVALID_FLOAT: CommandErrorType;
    static READER_EXPECTED_FLOAT: CommandErrorType;
    static DISPATCHER_UNKNOWN_COMMAND: CommandErrorType;
    static DISPATCHER_UNKNOWN_ARGUMENT: CommandErrorType;
    static DISPATCHER_EXPECTED_ARGUMENT_SEPARATOR: CommandErrorType;
    static DISPATCHER_PARSE_ERROR: CommandErrorType;
}
