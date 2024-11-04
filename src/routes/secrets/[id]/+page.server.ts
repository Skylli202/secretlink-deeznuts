import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
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
