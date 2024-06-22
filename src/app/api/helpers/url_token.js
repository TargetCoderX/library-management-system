import crypto from 'crypto'
import oneTimeUrlModel from '../database/schemas/one_time_url.schema';

export const createOneTimeUrl = async () => {
    const generateToken = crypto.randomBytes(32).toString('hex');
    const date = Date.now();
    const expirationTime = date + 3600000 // in milisecond

    const createUrl = new oneTimeUrlModel({
        "token": generateToken,
        "expire_time": expirationTime,
    })
    await createUrl.save();
    return generateToken;
}

export const checkOneTimeUrl = () => {

}