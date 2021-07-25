import boom from 'boom'
import User from '../models/User'

class DeleteUser {
  // eslint-disable-next-line class-methods-use-this
  async execute(id) {
    try {
      const user = await User.findByIdAndRemove(id)

      return user
    } catch (err) {
      throw boom.boomify(err)
    }
  }
}

module.exports = { DeleteUser }
