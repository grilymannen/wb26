import { pdb } from '#lib/prisma/db.ts';
import { form, query } from '$app/server';
import { stringSchema } from '#lib/schema.ts';
import * as v from 'valibot';
export const getAllForums = query(async () => {
	return await pdb.Forum.all();
});

export const createForum = form(
	v.object({ text: stringSchema, userid: stringSchema }),
	async ({ text, userid }) => {
		pdb.Forum.create({ text, userid });
	}
);
