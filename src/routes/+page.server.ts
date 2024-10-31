import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
const { subtle } = globalThis.crypto;

export const load = async () => {
  return {
    form: await superValidate(zod(formSchema))
  };
};

export const actions: Actions = {
  new: async (event) => {
    const form = await superValidate(event, zod(formSchema));

    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const key = await subtle.importKey("jwk", JSON.parse(form.data.keyPubPart), {
      name: 'AES-GCM',
      length: 256
    }, true, ['encrypt', 'decrypt'])

    const iv = new Uint8Array([...atob(form.data.iv)].map(char => char.charCodeAt(0)))
    const data = new Uint8Array([...atob(form.data.data)].map(char => char.charCodeAt(0))).buffer

    console.dir({ key, iv, data })

    const decoder = new TextDecoder()
    const mySecret = await subtle.decrypt({ name: "AES-GCM", iv }, key, data)
    console.log(`Secret: ${decoder.decode(mySecret)}`)

    return {
      form,
    };
  },
};
