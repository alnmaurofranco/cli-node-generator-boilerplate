import boom from 'boom'
import User from '../models/User'

class GetAllUser {
  // eslint-disable-next-line class-methods-use-this
  async execute() {
    try {
      const users = await User.find()
      return users
    } catch (err) {
      throw boom.boomify(err)
    }
  }
}

module.exports = { GetAllUser }
