import {FastifyInstance} from "fastify";
import {register} from "./controllers/register";
import {app} from "../app";

export async function appRoutes(app: FastifyInstance){

    app.post('/users', register)

}