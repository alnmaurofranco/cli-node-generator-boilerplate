import { getCustomRepository } from 'typeorm';
import { User } from '../database/models/User';
import { UserRepository } from '../database/repositories/UserRepository';

class GetAllUserService {
  private userRepository = getCustomRepository(UserRepository);

  public async execute(): Promise<User[] | undefined> {
    const users = await this.userRepository.find({});

    return users;
  }
}

export { GetAllUserService };
