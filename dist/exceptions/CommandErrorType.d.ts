import { CommandSyntaxError, StringReader } from "..";
type CommandErrorFunction = (...args: any[]) => string;
export declare class CommandErrorType {
    private func;
    constructor(func: CommandErrorFunction);
    create(...args: any[]): CommandSyntaxError;
    createWithContext(reader: StringReader, ...args: any[]): CommandSyntaxError;
}
export {};
