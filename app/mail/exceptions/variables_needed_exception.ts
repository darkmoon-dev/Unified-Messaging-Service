import { Exception } from "@adonisjs/core/exceptions";

export class VariablesNeededException extends Exception {
    constructor(private variables: string[]) {
        super(`Parameters are needed`)
    }

    public get errors() {
        return this.variables.map(variable => `- ${variable} is needed`)
        
    }
}