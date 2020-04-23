const validateLoginForm = (username, password) => {
    if (!username || !password) {

        return [{
            msg: "All fields required."
        }]
    } else {
        return []
    }
}

const validateRegisterForm = (username, password, email, hostId) => {
    const condition = 2
    let errors = []

    if (!username || !password || !email || !hostId) {
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


module.exports = {
    validateLoginForm,
    validateRegisterForm
}