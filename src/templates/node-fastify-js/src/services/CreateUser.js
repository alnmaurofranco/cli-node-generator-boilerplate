import boom from 'boom'
import User from '../models/User'

class CreateUser {
  // eslint-disable-next-line class-methods-use-this
  async execute(username, password, email) {
    try {
      const data = { username, password, email }
      const user = await new User(data)

      return user.save()
    } catch (err) {
      throw boom.boomify(err)
    }
  }
}

module.exports = { CreateUser }
