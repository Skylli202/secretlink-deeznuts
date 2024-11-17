import { fail, type Actions } from '@sveltejs/kit';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import type { RecordModel } from 'pocketbase';

export const load = async () => {
  return {
    form: await superValidate(zod(formSchema))
  };
};

// No Dynamic Typing with PocketBase yet :(
export interface Secret extends RecordModel {
  iv: string
  data: string
  keyPubPart: string
  maxViewCount: number
  viewCount: number
}

export const actions: Actions = {
  new: async (event) => {
    const form = await superValidate(event, zod(formSchema));

    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    try {
      const secret = await event.locals.pb.collection('secrets').create<Secret>({ ...form.data, viewCount: 0 })
      return message(form, { secretId: secret.id })
    } catch (error) {
      return setError(form, `Internal Server Error. Unable to process the request.`, { status: 500 })
    }
  },
};
