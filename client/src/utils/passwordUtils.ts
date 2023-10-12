export function isStrongPassword(password: string): boolean {
    // check pword length
    if (password.length < 12) {
        return false;
    }

    // check for at least one uppercase char
    if (!/[A-Z]/.test(password)) {
        return false;
    }

    //check for special char
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
        return false;
    }

    // check for not allowed strings
    const notAllowedStrings = ['password', '123', '1234', '12345', '123456'];
    for (const notAllowed of notAllowedStrings) {
        if (password.toLocaleLowerCase().includes(notAllowed)) {
            return false;
        }
    }

    return true;
}