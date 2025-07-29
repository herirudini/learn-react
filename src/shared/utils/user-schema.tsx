import { z } from 'zod';
import { REGEX } from '../constants/OtherConstans';

const userSchema = {
  name: z.string()
    .min(1, { message: 'Required' })
  ,
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .refine((text) => REGEX.email.test(text), {
      message: 'Email not valid',
    }),
  password: z
    .string()
    .min(1, { message: 'Password is required' }),
  confirm_password: z
    .string()
    .min(1, { message: 'Confirm Password is required' }),
}

export const signinSchema = z.object({
  email: userSchema.email,
  password: userSchema.password
})
export const signupSchema = z
  .object({
    name: userSchema.name,
    email: userSchema.email,
    password: userSchema.password,
    confirm_password: userSchema.confirm_password,
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Confirm Passwords must match',
    path: ['confirm_password'], // This sets the error location to the confirm_password field
  });

export type SigninSchema = z.infer<typeof signinSchema>

export type SignupSchema = z.infer<typeof signupSchema>