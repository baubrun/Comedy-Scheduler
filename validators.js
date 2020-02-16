const validateUserForm = (username, password) => {
    const condition = 2
    let errors = []
    if (!username || !password) {
        errors.push({
            msg: "All fields required."
        })
    } else {
        if (password.length < condition) {
            errors.push({
                msg: `Password must be at least ${condition} characters.`
            })
        }
    }
    return errors
}

module.exports = validateUserForm