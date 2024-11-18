import { env } from '$env/dynamic/private'
import { error } from '@sveltejs/kit'
import PocketBase, { ClientResponseError } from 'pocketbase'

export async function handle({ event, resolve }) {
  try {
    console.log('AAAAAAAAAAAAAAAA')
    event.locals.pb = new PocketBase(env.PB_URL)
    console.log('BBBBBBBBBBBBBBBB')
    const adminAuth = await event.locals.pb.admins.authWithPassword(env.PB_ADMIN_EMAIL, env.PB_ADMIN_PASSWORD)
    console.log('CCCCCCCCCCCCCCCC')
  } catch (e) {
    console.log('AAAAAAAAAAAAAAAA')
    if (e instanceof ClientResponseError) {
      console.error(`Failed to connect to PocketBase at URL: ${env.PB_URL} with login: ${env.PB_ADMIN_EMAIL}.`)
      return error(503, 'Service Unavailable: DB unreachable or cannot authenticate to.')
    }
  }
  const response = await resolve(event)
  return response
}
