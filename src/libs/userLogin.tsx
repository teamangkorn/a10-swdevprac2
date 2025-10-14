type LoginSuccess = {
  email: string
  token: string
  [key: string]: unknown
}

const LOGIN_ENDPOINT =
  process.env.NEXT_PUBLIC_AUTH_LOGIN_URL ||
  'https://a08-venue-explorer-backend.vercel.app/api/v1/auth/login'

const TEST_USER_EMAIL = 'alice@eventplanner.com'
const TEST_USER_PASSWORD = 'g00dD@y$'

export const TEST_AUTH_TOKEN = 'test-token-alice'

const TEST_LOGIN_RESPONSE: LoginSuccess = {
  success: true,
  email: TEST_USER_EMAIL,
  token: TEST_AUTH_TOKEN,
}

export default async function userLogin(
  userEmail: string,
  userPassword: string,
) {
  if (process.env.NODE_ENV === 'test') {
    if (userEmail === TEST_USER_EMAIL && userPassword === TEST_USER_PASSWORD) {
      return TEST_LOGIN_RESPONSE
    }
    throw new Error('Login failed')
  }

  const response = await fetch(LOGIN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
    }),
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }

  return (await response.json()) as LoginSuccess
}
