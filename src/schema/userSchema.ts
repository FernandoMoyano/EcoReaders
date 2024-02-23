import z from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
})

export const UserRegisterSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
})

export const UserLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
})
