import InMemoryAuthGateway from '../../../../adapters/secondary/auth/InMemoryAuthGateway'
import InMemoryLocalStorage from '../../../../adapters/secondary/storage/InMemoryLocalStorage'
import { configureStore, ReduxStore } from '../../../../redux/configureStore'
import { loginUser } from './loginUser'

describe('Login User', () => {
  let store: ReduxStore
  let authGateway: InMemoryAuthGateway
  let localStorageService: InMemoryLocalStorage

  beforeEach(() => {
    authGateway = new InMemoryAuthGateway()
    localStorageService = new InMemoryLocalStorage()
    store = configureStore({ authGateway, localStorageService })
  })

  it('should login user when email and password are good', async () => {
    await store.dispatch(
      loginUser('jack.skellington@halloween.com', 'h@lloween')
    )

    const user = {
      firstname: 'Jack',
      lastname: 'Skellington',
      email: 'jack.skellington@halloween.com',
    }
    expect(store.getState()).toEqual({ auth: { user } })

    const usersLogged = authGateway.getUsersLogged()
    expect(usersLogged['jack-skellington']).toEqual(user)
  })

  it('should not login user when credentials are incorrect', async () => {
    await store.dispatch(loginUser('test@test.com', 'incorrect'))

    expect(store.getState()).toEqual({
      auth: { user: null },
    })
  })

  it('should store auth token on local storage', async () => {
    await store.dispatch(
      loginUser('jack.skellington@halloween.com', 'h@lloween')
    )

    expect(localStorageService.getItem('auth-token')).toEqual(
      'jack-skellington'
    )
  })
})
