import Joi from 'joi';
import bcrypt, { genSalt } from 'bcrypt';

import users from './users.mongo.js'
import {
    getAuthToken
} from '../../utils/getAuthToken.js';

const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(3).required()
})

const authenticateSchema = Joi.object({
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(3).required()
})

const addNewUser = async (userData) => {
    try {
        const {
            error
        } = userSchema.validate(userData);

        // validating data
        if (error) {
            return {
                code: 400,
                status: false,
                message: error.details[0].message
            }
        } else {
            const existingUser = await users.find({
                email: userData.email
            });

            // checking for existing user
            if (existingUser.length > 0) {
                return {
                    code: 400,
                    status: false,
                    message: 'User already exists'
                }
            }
            // saving user
            else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(userData.password, salt);

                userData.password = hashedPassword;
                const result = await users.create(userData);

                if (result) {
                    const token = getAuthToken(userData)
                    return {
                        code: 201,
                        status: true,
                        message: token
                    }
                }
            }
        }
    } catch (error) {
        return {
            code: 500,
            status: false,
            message: error.message
        }
    }
}

const authenticateUser = async (userData) => {
    try {
        const {
            error
        } = authenticateSchema.validate(userData);
        
        if (error) {
            return {
                code: 400,
                status: false,
                message: error.details[0].message
            }
        } else {
            const existingUser = await users.find({
                email: userData.email
            });
            
            if (existingUser.length > 0) {
                const authenticated = await bcrypt.compare(userData.password, existingUser[0].password);
                
                if(authenticated) {
                    const token = getAuthToken(existingUser[0]);
                    return {
                        code: 200,
                        status: true,
                        message: token
                    }
                }
                else {
                    return {
                        code: 404,
                        status: false,
                        message: "Incorrect password!"
                    }
                }
            } else {
                return {
                    code: 404,
                    status: false,
                    message: 'User not found'
                }
            }
        }
    } catch (error) {
        return {
            code: 500,
            status: false,
            message: error.message
        }
    }
}

export {
    addNewUser,
    authenticateUser
}