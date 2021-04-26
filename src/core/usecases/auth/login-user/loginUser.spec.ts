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
    authGateway.register('uuid-1', {
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
      id: 'uuid-1',
      firstname: 'Jack',
      lastname: 'Skellington',
      email: 'jack.skellington@halloween.com',
    }
    expect(store.getState()).toEqual({ ...initialState, auth: { user } })

    const usersLogged = authGateway.getUsersLogged()
    expect(usersLogged['jack-skellington']).toEqual(user)
  })

  it('should not login user when credentials are incorrect', async () => {
    await store.dispatch(loginUser('test@test.com', 'incorrect'))

    expect(store.getState()).toEqual({ ...initialState, auth: { user: null } })
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
