import * as v from 'valibot';

export const stringSchema = v.pipe(v.string(), v.trim(), v.minLength(3));
export const authSchema = v.object({ name: stringSchema, pass: stringSchema });
