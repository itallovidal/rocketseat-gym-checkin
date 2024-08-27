import {expect, describe, it} from 'vitest'
import {RegisterUseCase} from "./register";
import {InMemoryUsersRepository} from "../respositores/in-memory/in-memory-users-repository";
import {compare} from "bcryptjs";
import {UserAlreadyExistsError} from "./errors/user-already-exists-error";

describe('Register use case', () => {
    it("should be able to create a user", async () => {
        const inMemoryRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(inMemoryRepository)

        const {user} = await registerUseCase.execute({
            name: 'john doe',
            email: 'jonhdoe@gmail.com',
            password: '12345',
        })

        expect(user.id).toEqual(expect.any(String))
    });

    it("should hash user password upon registration", async () => {
        const inMemoryRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(inMemoryRepository)

        const password = '12345'

        const {user} = await registerUseCase.execute({
            name: 'john doe',
            email: 'jonhdoe@gmail.com',
            password,
        })

        const isCorrectlyHashed = await compare(password, user.password_hash)
        expect(isCorrectlyHashed).toBe(true)
    });

    it('should not be able to register the same email twice', async () => {
        const inMemoryRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(inMemoryRepository)

        const password = '12345'
        const email = 'jonhdoe@gmail.com'

        await registerUseCase.execute({
            name: 'john doe',
            email,
            password,
        })

        expect(async ()=>
            await registerUseCase.execute({
                name: 'john doe',
                email,
                password,
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    });
});