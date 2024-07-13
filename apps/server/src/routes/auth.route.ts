import { login } from '@/controller/auth.controller'
import express from 'express'
const fs = require('fs')
const authRouter = express.Router()

authRouter.get('/login', login)

export { authRouter }

