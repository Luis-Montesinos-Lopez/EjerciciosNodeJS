const { z } = require('zod');

const validateUser = z.object({
    name: z.string('Name must be a string').min(1, 'Name is required'),
    surname : z.string('Surname must be a string').min(1, 'Surname is required'),
    email: z.string().email('Write a correct email').min(1, 'Email is required'),
    password: z.string().min(8,'Password must contains at least 8 characters'),
});
const validateEmailPassword = z.object({
    email: z.string().email('Write a correct email').min(1, 'Email is required'),
    password: z.string().min(8,'Password must contains at least 8 characters')
})
const validateEmail = z.object({
    email: z.string().email('Write a correct email').min(1, 'Email is required'),
});
const validatePassword = z.object({
    password: z.string().min(8,'Password must contains at least 8 characters')
})
module.exports = {validateUser, validateEmailPassword ,validateEmail, validatePassword};