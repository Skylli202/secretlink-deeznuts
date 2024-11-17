import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { ClientResponseError } from "pocketbase";
import type { Secret } from "../../+page.server";

export const load: PageServerLoad = async ({ locals: { pb }, params }) => {
  try {
    const secret = await pb.collection('secrets').getOne<Secret>(params.id)
    return { secret }
  } catch (e) {
    if (e instanceof ClientResponseError) {
      // Handle basic 404
      if (e.status === 404) {
        return error(e.status)
      }

      // Handle none-404
      console.error(`Tried to access: "${new URL(e.url).pathname}" PocketBase returned: ${e.status} ${JSON.stringify(e.response)}`)
      console.error(`Cause: ${e.cause}\nMessage: ${e.message}\nStack: ${e.stack}`)

      return error(e.status)
    }
    return error(500)
  }
}

export const actions: Actions = {
  default: async ({ params, request, locals }) => {
    const secretId = params.id
    const data = await request.formData()

    if (data.get("secretId") && params.id !== data.get("secretId")) {
      return fail(400)
    }
    try {
      await locals.pb.collection('secrets').delete(secretId)
    } catch (error) {
      return fail(400, { message: `Internal Server Error. Unable to process the request.` })
    }
    redirect(300, "/")
  }
}
