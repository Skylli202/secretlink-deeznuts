import { env } from '$env/dynamic/private'
import { error } from '@sveltejs/kit'
import PocketBase, { ClientResponseError } from 'pocketbase'

export async function handle({ event, resolve }) {
  event.locals.pb = new PocketBase(env.PB_URL)
  try {

    const adminAuth = await event.locals.pb.admins.authWithPassword(env.PB_ADMIN_EMAIL, env.PB_ADMIN_PASSWORD)
  } catch (e) {
    if (e instanceof ClientResponseError) {
      return error(503, 'Service Unavailable: PocketBase unreachable, or unable to authenticate to the service.')
    }
  }
  const response = await resolve(event)
  return response
}
