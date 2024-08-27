import {z} from "zod";
import {FastifyReply, FastifyRequest} from "fastify";
import {RegisterUseCase} from "../../use-cases/register";
import {PrismaUsersRepository} from "../../respositores/prisma-users-repository";

export async function register(request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const {name, email, password} = registerBodySchema.parse(request.body)

    try{
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUsersRepository)

        await registerUseCase.execute({name, email, password})

    }catch (e){
        if(e instanceof UserAlreadyExistsError){
            return reply.status(409).send({ message: e.message})
        }

        return reply.status(500).send()
    }

    return reply.status(201).send()
}