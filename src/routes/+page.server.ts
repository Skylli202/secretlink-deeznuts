import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';

export const load = async () => {
  return {
    form: await superValidate(zod(formSchema))
  };
};

export const actions: Actions = {
  new: async (event) => {
    console.log('YOYO')
    const form = await superValidate(event, zod(formSchema));
    console.log(form.data)

    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    console.log(form.valid, form.data)
    const enc = new TextEncoder()
    console.log(enc.encode(form.data.iv))

    return {
      form,
    };
  },
};
