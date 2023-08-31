import { 
    ArgumentBuilder,
    ArgumentType,
    ArgumentCommandNode
} from "..";

export class RequiredArgumentBuilder<S, T> extends ArgumentBuilder<S, RequiredArgumentBuilder<S, T>> {
    private name: string;
    private type: ArgumentType<T>;

    constructor(name: string, type: ArgumentType<T>) {
        super();
        this.name = name;
        this.type = type;
    }

    getThis(): RequiredArgumentBuilder<S, T> {
        return this;
    }

    getName(): string {
        return this.name;
    }

    getType(): ArgumentType<T> {
        return this.type;
    }
    
    build(): ArgumentCommandNode<S, T> {
        const result = new ArgumentCommandNode(this.getName(), this.getType(), this.getCommand(), this.getRequirement(), this.getRedirect(), this.getRedirectModifier(), this.isFork());
        for (const argument of this.getArguments()) {
            result.addChild(argument);
        }
        return result;
    }
}

export function argument(name: string, type: ArgumentType<any>): RequiredArgumentBuilder<any, any> {
    return new RequiredArgumentBuilder<any, any>(name, type);
}
