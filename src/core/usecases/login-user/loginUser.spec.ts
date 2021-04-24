import InMemoryAuthGateway from '../../../adapters/secondary/auth/InMemoryAuthGateway'
import { configureStore, ReduxStore } from '../../../redux/configureStore'
import { loginUser } from './loginUser'

describe('Login User', () => {
  let store: ReduxStore
  let authGateway: InMemoryAuthGateway

  beforeEach(() => {
    authGateway = new InMemoryAuthGateway()
    store = configureStore({ authGateway })
  })

  it('should login user when email and password are good', async () => {
    await store.dispatch(
      loginUser('jack.skellington@halloween.com', 'h@lloween')
    )

    expect(store.getState()).toEqual({
      auth: {
        user: {
          firstname: 'Jack',
          lastname: 'Skellington',
          email: 'jack.skellington@halloween.com',
        },
        authToken: 'jack-skellington',
      },
    })
  })

  it('should not login user when credentials are incorrect', async () => {
    await store.dispatch(loginUser('test@test.com', 'incorrect'))

    expect(store.getState()).toEqual({
      auth: {
        user: null,
        authToken: null,
      },
    })
  })
})
