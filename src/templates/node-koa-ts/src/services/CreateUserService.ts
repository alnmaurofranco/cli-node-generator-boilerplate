import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { User } from '../database/models/User';
import { UserRepository } from '../database/repositories/UserRepository';

interface IRequestBody {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private userRepository = getCustomRepository(UserRepository);

  public async execute(data: IRequestBody): Promise<User> {
    const userAlready = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (userAlready) {
      throw new Error('user already with email');
    }

    const newUser = this.userRepository.create({
      name: data.name,
      email: data.email,
      password: await hash(data.password, 8),
    });

    await this.userRepository.save(newUser);

    return newUser;
  }
}

export { CreateUserService };
