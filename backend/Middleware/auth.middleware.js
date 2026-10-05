const cryptojs = require('crypto-js')
const CHAVE_SECRETA = 'chave_baixa'

function authMiddleware(req,res,next){
    const token = req.header['authorization']

    if(!token){
        return res.status()
    }
}