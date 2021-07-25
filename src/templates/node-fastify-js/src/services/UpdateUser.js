import boom from 'boom'
import User from '../models/User'

class UpdateUser {
  // eslint-disable-next-line class-methods-use-this
  async execute(id, username, email, password) {
    try {
      const userExists = await User.findById(id)

      if (!userExists) {
        throw boom.boomify('err')
      }

      const data = { username, email, password }

      const user = await User.findByIdAndUpdate(id, data, { new: true })

      return user
    } catch (err) {
      throw boom.boomify(err)
    }
  }
}

module.exports = { UpdateUser }
