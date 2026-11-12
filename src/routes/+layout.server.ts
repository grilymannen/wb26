import { redirect } from '@sveltejs/kit';
import { readToken, createToken } from '#lib/jwt.ts';
import type { LayoutServerLoad } from './$types';
import { ACCESS_COOKIE, REFRESH_COOKIE, AUTH_PATH } from '#lib/constants.ts';
import { pdb } from '#lib/prisma/db.ts';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	const isProtected = url.pathname !== AUTH_PATH;

	if (!isProtected) {
		return;
	}

	const refreshToken = { id: cookies.get(REFRESH_COOKIE) };
	if (!refreshToken.id) {
		redirect(303, AUTH_PATH);
	}

	const accessToken = cookies.get(ACCESS_COOKIE);
	const refreshid = await readToken(accessToken);

	if (refreshid === refreshToken.id) {
		return;
	}
	const dbToken = await pdb.RefreshToken.include('user').first({ id: refreshToken.id });

	if (!dbToken) {
		redirect(303, AUTH_PATH);
	}

	const now = Temporal.Now.instant();
	const isExpired = Temporal.Instant.compare(dbToken.expires, now) < 1;

	if (isExpired) {
		redirect(303, AUTH_PATH);
	}
	cookies.set(ACCESS_COOKIE, await createToken(refreshToken.id));

	return dbToken.user;
};
