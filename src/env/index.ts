import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', `teste`, `production`]).default('dev'),
    PORT: z.coerce.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if(!_env.success){
    console.error('Erro nas validações de env.', _env.error.format())

    throw new Error('Erro nas variáveis de ambientes.')
}

export const env = _env.data