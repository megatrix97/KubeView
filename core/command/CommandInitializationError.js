class CommandInitializationError extends Error {
    constructor(message) {
        super(message)
        this.name = "CommandInitializationError"
    }
}

module.exports = { CommandInitializationError }