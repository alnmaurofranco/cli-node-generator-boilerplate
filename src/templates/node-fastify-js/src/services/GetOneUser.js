import boom from 'boom'
import User from '../models/User'

class GetOneUser {
  // eslint-disable-next-line class-methods-use-this
  async execute(id) {
    try {
      const user = await User.findById(id)

      if (!user) {
        throw boom.boomify('err')
      }

      return user
    } catch (err) {
      throw boom.boomify(err)
    }
  }
}

module.exports = { GetOneUser }
