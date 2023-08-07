const { CommandInitializationError } = require("./CommandInitializationError.js")

class Command {
    constructor(name, returnType, requiredArgs, optionalArgs) {
        this.name = name
        this.returnType = returnType
        if (!requiredArgs) {
            throw new CommandInitializationError("failed to initalize command object for: " + name + "\nrequired arguments cannot be null")
        }
        this.requiredArgs = requiredArgs
        this.optionalArgs = optionalArgs
    }
}

module.exports = { Command }