import InMemoryAuthGateway from '../../../../adapters/secondary/auth/InMemoryAuthGateway'
import InMemoryLocalStorage from '../../../../adapters/secondary/storage/InMemoryLocalStorage'
import { AppState } from '../../../../redux/appState.interface'
import { configureStore, ReduxStore } from '../../../../redux/configureStore'
import { refreshUser } from './refreshUser'

describe('Refresh user', () => {
  let store: ReduxStore
  let authGateway: InMemoryAuthGateway
  let localStorageService: InMemoryLocalStorage
  let initialState: AppState

  beforeEach(() => {
    authGateway = new InMemoryAuthGateway()
    localStorageService = new InMemoryLocalStorage()
    store = configureStore({ authGateway, localStorageService })
    initialState = store.getState()
  })

  it('should refresh login with auth token', async () => {
    const user = {
      firstname: 'Jack',
      lastname: 'Skellington',
      email: 'jack.skellington@halloween.com',
    }

    await authGateway.register('uuid-1', { ...user, password: 'password' })
    const data = await authGateway.login(user.email, 'password')

    localStorageService.setItem('auth-token', data.authToken)

    await store.dispatch(refreshUser)

    expect(store.getState()).toEqual({
      ...initialState,
      auth: {
        ...initialState.auth,
        user: { id: 'uuid-1', ...user },
        status: 'connected',
      },
    })
  })

  it('should logout when auth token not exist', async () => {
    await store.dispatch(refreshUser)
    expect(store.getState()).toEqual({
      ...initialState,
      auth: { ...initialState.auth, user: null, status: 'disconnected' },
    })
  })

  it('should track the process of refreshing', (done) => {
    const unsubscribe = store.subscribe(() => {
      expect(store.getState()).toEqual({
        ...initialState,
        auth: {
          ...initialState.auth,
          status: 'fetching',
        },
      })
      unsubscribe()
      done()
    })

    store.dispatch(refreshUser)
  })
})
