import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../database/repositories/UserRepository';

interface IRequestParams {
  id: number;
}

class DeleteUserService {
  private userRepository = getCustomRepository(UserRepository);

  public async execute({ id }: IRequestParams): Promise<void> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new Error('not found user');
    }

    await this.userRepository.remove(user);
  }
}

export { DeleteUserService };
