import 'dotenv/config'
import { Request, Response } from 'express'

export async function login(req: Request, res: Response) {
    res.send('successful')
}