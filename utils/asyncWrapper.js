const asyncWrapper = (func) => {
    return async (req, res, next) => {
        try {
            func(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = asyncWrapper