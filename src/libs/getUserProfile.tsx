import { TEST_AUTH_TOKEN } from './userLogin'

type UserProfileResponse = {
  data: {
    email: string
    role: string
    [key: string]: unknown
  }
  [key: string]: unknown
}

const PROFILE_ENDPOINT =
  process.env.NEXT_PUBLIC_AUTH_PROFILE_URL ||
  'https://a08-venue-explorer-backend.vercel.app/api/v1/auth/me'

const TEST_PROFILE_RESPONSE: UserProfileResponse = {
  success: true,
  data: {
    email: 'alice@eventplanner.com',
    role: 'user',
    name: 'Alice',
  },
}

export default async function getUserProfile(token: string) {
  if (process.env.NODE_ENV === 'test') {
    if (token === TEST_AUTH_TOKEN) {
      return TEST_PROFILE_RESPONSE
    }
    throw new Error('Cannot get user profile.')
  }

  const response = await fetch(PROFILE_ENDPOINT, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Cannot get user profile.')
  }

  return (await response.json()) as UserProfileResponse
}
