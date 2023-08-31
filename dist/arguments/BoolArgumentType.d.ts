import { ArgumentType, StringReader, CommandContext, SuggestionsBuilder, Suggestions } from "..";
export declare class BoolArgumentType extends ArgumentType<boolean> {
    parse(reader: StringReader): boolean;
    listSuggestions(context: CommandContext<any>, builder: SuggestionsBuilder): Promise<Suggestions>;
}
export declare function bool(): BoolArgumentType;
