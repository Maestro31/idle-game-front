import InMemoryAuthGateway from './InMemoryAuthGateway'

export default class FakeAuthGateway extends InMemoryAuthGateway {
  constructor() {
    super()
    this.users = {
      'uuid-1': {
        id: 'uuid-1',
        firstname: 'John',
        lastname: 'Snow',
        email: 'john.snow@winteriscoming.com',
      },
    }

    const authToken = `${this.users[
      'uuid-1'
    ].firstname.toLowerCase()}-${this.users['uuid-1'].lastname.toLowerCase()}`
    this.usersLogged[authToken] = this.users['uuid-1']
  }
}
