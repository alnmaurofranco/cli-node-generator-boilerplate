import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from 'routing-controllers';
import { User } from '../database/models/User';
import { CreateUserService } from '../services/CreateUserService';
import { DeleteUserService } from '../services/DeleteUserService';
import { GetAllUserService } from '../services/GetAllUserService';
import { GetOneUserService } from '../services/GetOneUserService';
import { UpdateUserService } from '../services/UpdateUserService';

interface IResponse<T> {
  code: string;
  statusCode: number;
  success: boolean;
  [key: string]: Array<T> | Object;
}

interface ICreateUserBody {
  name: string;
  email: string;
  password: string;
}

type IUpdateUserBody = ICreateUserBody;

@Controller('/users')
class UserController {
  @Get()
  // eslint-disable-next-line class-methods-use-this
  public async showAll(): Promise<IResponse<User[]>> {
    const getAllUserService = new GetAllUserService();
    const getAllUsers = await getAllUserService.execute();

    return {
      code: 'users.all',
      statusCode: 200,
      success: true,
      users: getAllUsers,
    };
  }

  @Get('/:id')
  public async show(@Param('id') id: number): Promise<IResponse<User>> {
    const getOneUserService = new GetOneUserService();
    const getOneUser = await getOneUserService.execute({ id });

    return {
      code: 'user.show',
      statusCode: 200,
      success: true,
      user: getOneUser,
    };
  }

  @Post()
  public async create(
    @Body() { name, email, password }: ICreateUserBody
  ): Promise<IResponse<User>> {
    const createUserService = new CreateUserService();
    const createUser = await createUserService.execute({
      name,
      email,
      password,
    });

    return {
      code: 'user.create',
      statusCode: 201,
      success: true,
      data: createUser,
    };
  }

  @Put('/:id')
  public async update(
    @Param('id') id: number,
    @Body() { name, email, password }: IUpdateUserBody
  ): Promise<IResponse<User>> {
    const updateUserService = new UpdateUserService();
    const updateUser = await updateUserService.execute({
      id,
      name,
      email,
      password,
    });

    return {
      code: 'user.update',
      statusCode: 200,
      success: true,
      data: updateUser,
    };
  }

  @Delete('/:id')
  public async delete(@Param('id') id: number): Promise<IResponse<unknown>> {
    const deleteUserService = new DeleteUserService();
    await deleteUserService.execute({ id });

    return {
      code: 'user.delete',
      statusCode: 204,
      success: true,
    };
  }
}

export default UserController;
