import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { User } from '../database/models/User';
import { UserRepository } from '../database/repositories/UserRepository';

interface IRequest {
  id: number;
}

interface IRequestBody {
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  private userRepository = getCustomRepository(UserRepository);

  public async execute({
    id,
    name,
    email,
    password,
  }: IRequestBody & IRequest): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new Error('not found user');
    }

    user.name = name;
    user.email = email;
    user.password = await hash(password, 8);

    await this.userRepository.save(user);

    return user;
  }
}

export { UpdateUserService };
