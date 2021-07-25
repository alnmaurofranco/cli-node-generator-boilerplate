const { CreateUser } = require('../services/CreateUser')
const { DeleteUser } = require('../services/DeleteUser')
const { GetAllUser } = require('../services/GetAllUser')
const { GetOneUser } = require('../services/GetOneUser')
const { UpdateUser } = require('../services/UpdateUser')

class UserController {
  async index(req, replay) {
    const allUsersService = new GetAllUser()

    const users = await allUsersService.execute()

    return replay.send(users)
  }

  async show(req, replay) {
    const { id } = req.params

    const getOneUserService = new GetOneUser()
    const user = await getOneUserService.execute(id)

    return replay.send(user)
  }

  async create(req, replay) {
    const { username, email, password } = req.body

    const createUserService = new CreateUser()

    const newUser = await createUserService.execute(username, email, password)

    return replay.send(newUser)
  }

  async update(req, replay) {
    const { id } = req.params
    const { username, email, password } = req.body

    const updateUserService = new UpdateUser()
    const updateUser = await updateUserService.execute(
      id,
      username,
      email,
      password
    )

    return replay.send(updateUser)
  }

  async delete(req, replay) {
    const { id } = req.params

    const deleteUser = new DeleteUser()

    await deleteUser.execute(id)

    return replay.status(204).send()
  }
}

module.exports = new UserController()
