import InMemoryAuthGateway from '../../../../adapters/secondary/auth/InMemoryAuthGateway'
import InMemoryLocalStorage from '../../../../adapters/secondary/storage/InMemoryLocalStorage'
import { AppState } from '../../../../redux/appState.interface'
import { ReduxStore, configureStore } from '../../../../redux/configureStore'
import { loginUser } from '../login-user/loginUser'
import { refreshUser } from '../refresh-user/refreshUser'
import { logoutUser } from './logoutUser'

describe('Logout user', () => {
  let store: ReduxStore
  let authGateway: InMemoryAuthGateway
  let localStorageService: InMemoryLocalStorage
  let initialState: AppState

  beforeEach(() => {
    authGateway = new InMemoryAuthGateway()

    localStorageService = new InMemoryLocalStorage()
    store = configureStore({ authGateway, localStorageService })
    initialState = store.getState()

    setupTests()
  })

  function setupTests() {
    authGateway.register('uuid-1', {
      firstname: 'Jack',
      lastname: 'Skellington',
      email: 'jack.skellington@halloween.com',
      password: '1234',
    })
    localStorageService.setItem('auth-token', 'jack-skellington')
  }

  it('should logout the current user logged in', async () => {
    await store.dispatch(loginUser('jack.skellington@halloween.com', ''))
    await store.dispatch(logoutUser)

    expect(localStorageService.getItem('auth-token')).toBeUndefined()
    expect(store.getState()).toEqual({
      ...initialState,
      auth: {
        ...initialState.auth,
        user: null,
        status: 'disconnected',
      },
    })
  })
})
