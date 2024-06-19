import bcrypt from 'bcrypt';
export const hashPassword = async (plainPassword) => {
    return bcrypt.hash(plainPassword, parseInt(process.env.PASSWORD_SALT));
}

export const passwordCompare = async (plainPassword, hashPassword) => {
    return await bcrypt.compare(plainPassword, hashPassword)
}
