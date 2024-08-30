import { z } from 'zod' 

export const usernameValidation = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'username should contain no more than 20 characters')
  .regex(/^[a-zA-Z0-9_]{3,16}$/, 'username should not contain special characters')

  

export const signUpSchema = z.object({
  username: usernameValidation,
  email:z.string().email({message:'invalid email address'}),
  password:z.string().min(6, {message:'Password must be at least 6 characters'})
})