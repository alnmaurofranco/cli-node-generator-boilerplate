import UserController from '../controllers/UserController'

const routes = [
  {
    method: 'GET',
    url: '/api/v1/users',
    handler: UserController.index,
  },
  {
    method: 'GET',
    url: '/api/v1/users/:id',
    handler: UserController.show,
  },
  {
    method: 'POST',
    url: '/api/v1/users',
    handler: UserController.create,
  },
  {
    method: 'PUT',
    url: '/api/v1/users/:id',
    handler: UserController.update,
  },
  {
    method: 'DELETE',
    url: '/api/v1/users/:id',
    handler: UserController.delete,
  },
]

export { routes }
