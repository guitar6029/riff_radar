import { z } from "zod";

// for password
const MIN_PASSWORD_LENGTH = 4;
const MIN_PASSWORD_ERROR_MESSAGE = `Password too short, must be at least ${MIN_PASSWORD_LENGTH} characters long`;
const MAX_PASSWORD_LENGTH = 30;
const MAX_PASSWORD_ERROR_MESSAGE = `Password too long, must be no more than ${MAX_PASSWORD_LENGTH} characters`;

// for usernme
const MIN_USERNAME_LENGTH = 1;
const MAX_USERNAME_LENGTH = 50;
const MIN_USERNAME_ERROR_MESSAGE = `Username too short, must be at least ${MIN_USERNAME_LENGTH} characters long`;
const MAX_USERNAME_ERROR_MESSAGE = `Username too long, must be no more than ${MIN_USERNAME_LENGTH} characters`;

export const SignupSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, MIN_PASSWORD_ERROR_MESSAGE)
    .max(MAX_PASSWORD_LENGTH, MAX_PASSWORD_ERROR_MESSAGE),
  username: z
    .string()
    .min(MIN_USERNAME_LENGTH, MIN_USERNAME_ERROR_MESSAGE)
    .max(MAX_USERNAME_LENGTH, MAX_USERNAME_ERROR_MESSAGE),
});
