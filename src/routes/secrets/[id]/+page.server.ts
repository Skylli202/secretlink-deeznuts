import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { ClientResponseError } from "pocketbase";
import type { Secret } from "../../+page.server";

export const load: PageServerLoad = async ({ locals: { pb }, params }) => {
  // try {
  const secret = await pb.collection('secrets').getOne<Secret>(params.id)
  return { secret }
  // } catch (error) {
  //   if (error instanceof ClientResponseError) {
  //     console.error(`Tried to access: "${error.url}" PocketBase returned: ${error.status} ${error.response}`)
  //     console.error(`Cause: ${error.cause} - Stack: ${error.stack}`)
  //     return fail(error.status)
  //   }
  //   return fail(400)
  // }
}

export const actions: Actions = {
  default: async ({ params, request, locals }) => {
    const secretId = params.id
    const data = await request.formData()

    if (data.get("secretId") && params.id !== data.get("secretId")) {
      return fail(400)
    }
    try {
      // No Dynamic Typing with PocketBase yet :(

      const deleted = await locals.pb.collection('secrets').delete(secretId)
      return { deleted, secretId: secretId }
    } catch (error) {
      return fail(400, { message: `Internal Server Error. Unable to process the request.` })
    }
  }
}
