import { form, getRequestEvent } from '$app/server';
import { pdb } from '#lib/prisma/db.ts';
import { authSchema } from '#lib/schema.ts';
import { hashPassword, verifyPassword } from '#lib/password.ts';
import { ACCESS_COOKIE, REFRESH_COOKIE } from '#lib/constants.ts';
import { createToken } from '#lib/jwt.ts';

const DAY_AMOUNT = 3; // Change this
const HOURS_IN_DAY = 24;
const hours = DAY_AMOUNT * HOURS_IN_DAY;

export const signup = form(authSchema, async ({ name, pass }) => {
	const existingUser = await pdb.User.first({ name });

	if (existingUser) {
		// User exists
		return { success: false, message: 'User already exists' };
	}

	const hash = hashPassword(pass);

	const user = await pdb.User.create({ name, hash });

	if (!user) {
		// db issue (?)
		return { success: false, message: 'A problem occurred during user sign up' };
	}
	return { success: true, message: `Successfully created user '${user.name}'` };
});

export const login = form(authSchema, async ({ name, pass }) => {
	const fail = { success: false, message: `User '${name}' does not exist with those credentials` };
	const user = await pdb.User.first({ name });

	if (!user) {
		// User does not exist
		return fail;
	}

	const matches = verifyPassword(pass, user.hash);

	if (!matches) {
		// Wrong password
		return fail;
	}

	const { cookies } = getRequestEvent();

	const expires = Temporal.Now.instant().add({ hours });
	const refreshToken = await pdb.RefreshToken.create({ expires, userid: user.id });

	cookies.set(REFRESH_COOKIE, refreshToken.id);
	cookies.set(ACCESS_COOKIE, await createToken(refreshToken.id));
});
