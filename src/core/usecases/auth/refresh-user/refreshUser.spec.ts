import InMemoryAuthGateway from '../../../../adapters/secondary/auth/InMemoryAuthGateway'
import InMemoryLocalStorage from '../../../../adapters/secondary/storage/InMemoryLocalStorage'
import { configureStore, ReduxStore } from '../../../../redux/configureStore'
import { refreshUser } from './refreshUser'

describe('Refresh user', () => {
  let store: ReduxStore
  let authGateway: InMemoryAuthGateway
  let localStorageService: InMemoryLocalStorage

  beforeEach(() => {
    authGateway = new InMemoryAuthGateway()
    localStorageService = new InMemoryLocalStorage()
    store = configureStore({ authGateway, localStorageService })
  })

  it('should refresh login with auth token', async () => {
    const user = {
      firstname: 'Jack',
      lastname: 'Skellington',
      email: 'jack.skellington@halloween.com',
    }

    await authGateway.register({ ...user, password: 'password' })
    const data = await authGateway.login(user.email, 'password')

    localStorageService.setItem('auth-token', data.authToken)

    await store.dispatch(refreshUser)

    expect(store.getState()).toEqual({ auth: { user } })
  })

  it('should logout when auth token not exist', async () => {
    await store.dispatch(refreshUser)
    expect(store.getState()).toEqual({ auth: { user: null } })
  })
})
