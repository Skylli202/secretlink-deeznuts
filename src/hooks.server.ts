import { env } from '$env/dynamic/private'
import { error } from '@sveltejs/kit'
import PocketBase, { ClientResponseError } from 'pocketbase'

export async function handle({ event, resolve }) {
  try {
    event.locals.pb = new PocketBase(env.PB_URL)
    await event.locals.pb.collection("_superusers").authWithPassword(env.PB_ADMIN_EMAIL ?? "", env.PB_ADMIN_PASSWORD ?? "")
  } catch (e) {
    if (e instanceof ClientResponseError) {
      console.error(`Failed to connect to PocketBase at URL: ${env.PB_URL} with login: ${env.PB_ADMIN_EMAIL}.`)
      return error(503, 'Service Unavailable: PocketBase error.')
    }
    return error(503, 'Service Unavailable: Unknown error.')
  }
  const response = await resolve(event)
  return response
}
