import 'dotenv/config'

import {z} from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333)
})

const _env = envSchema.safeParse(envSchema)

if(!_env.success){
    console.error("Invalid enviromnet variables.", _env.error.format())

    throw new Error('invalid variables.')
}

export const env = _env.data