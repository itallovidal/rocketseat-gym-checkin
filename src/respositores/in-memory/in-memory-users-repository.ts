import {UsersRepository} from "../users-repository";
import {Prisma, User} from "@prisma/client";


export class InMemoryUsersRepository implements UsersRepository{
    public items: User[] = []

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            id: 'userid_1'
        }
        this.items.push(user)
        return user
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find((user)=> user.email === email)

        if(!user) return null

        return user
    }

}
