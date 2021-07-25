import { getCustomRepository } from 'typeorm';
import { User } from '../database/models/User';
import { UserRepository } from '../database/repositories/UserRepository';

interface IRequestParams {
  id: number;
}

class GetOneUserService {
  private userRepository = getCustomRepository(UserRepository);

  public async execute({ id }: IRequestParams): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new Error('not found user with ID');
    }

    return user;
  }
}

export { GetOneUserService };
