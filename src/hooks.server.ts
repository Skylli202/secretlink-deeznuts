import { env } from '$env/dynamic/private'
import PocketBase from 'pocketbase'

export async function handle({ event, resolve }) {
  event.locals.pb = new PocketBase('http://127.0.0.1:8090')
  await event.locals.pb.admins.authWithPassword(env.PB_ADMIN_EMAIL, env.PB_ADMIN_PASSWORD)
  const response = await resolve(event)
  return response
}
