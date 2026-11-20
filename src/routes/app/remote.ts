import { pdb } from '#lib/prisma/db.ts';
import { form, query } from '$app/server';
import { stringSchema } from '#lib/schema.ts';
import { EventEmitter, on } from 'node:events';
import * as v from 'valibot';

const emitter = new EventEmitter();
emitter.setMaxListeners(0);

export const getAllForums = query.live(async function* () {
	yield await pdb.Forum.all();

	for await (const _ of on(emitter, 'update')) {
		yield await pdb.Forum.all();
	}
});

export const createForum = form(
	v.object({ text: stringSchema, userid: stringSchema }),
	async ({ text, userid }) => {
		await pdb.Forum.create({ text, userid });
		emitter.emit('update');
	}
);
