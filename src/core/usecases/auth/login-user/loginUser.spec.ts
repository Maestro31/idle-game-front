import InMemoryAuthGateway from '../../../../adapters/secondary/auth/InMemoryAuthGateway'
import InMemoryLocalStorage from '../../../../adapters/secondary/storage/InMemoryLocalStorage'
import { AppState } from '../../../../redux/appState.interface'
import { configureStore, ReduxStore } from '../../../../redux/configureStore'
import { loginUser } from './loginUser'

describe('Login User', () => {
  let store: ReduxStore
  let authGateway: InMemoryAuthGateway
  let localStorageService: InMemoryLocalStorage
  let initialState: AppState

  beforeEach(() => {
    authGateway = new InMemoryAuthGateway()
    authGateway.register({
      firstname: 'Jack',
      lastname: 'Skellington',
      email: 'jack.skellington@halloween.com',
      password: '1234',
    })

    localStorageService = new InMemoryLocalStorage()
    store = configureStore({ authGateway, localStorageService })
    initialState = store.getState()
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
    expect(store.getState()).toEqual({
      ...initialState,
      auth: { ...initialState.auth, user, status: 'connected' },
    })

    const usersLogged = authGateway.getUsersLogged()
    expect(usersLogged[0]).toEqual(user)
  })

  it('should not login user when credentials are incorrect', async () => {
    await store.dispatch(loginUser('test@test.com', 'incorrect'))

    expect(store.getState()).toEqual({
      ...initialState,
      auth: {
        ...initialState.auth,
        user: null,
        status: 'disconnected',
        errorMessage: 'Invalid credentials',
      },
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
