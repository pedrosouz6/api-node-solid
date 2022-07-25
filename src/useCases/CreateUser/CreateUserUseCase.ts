import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider
    ) {}

    async execute(datas: ICreateUserDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(datas.email); 

        if(userAlreadyExists) {
            throw new Error('User already exists');
        }

        const user = new User(datas);

        await this.usersRepository.save(user);

        await this.mailProvider.sendEmail({
            to: {
                name: datas.name,
                email: datas.email
            }, 
            from: {
                name: datas.name,
                email: datas.email
            },
            body: 'body',
            subject: 'subject'
        })
    }
}