const Usuario = require('../models/Usuario')

const cryptojs = require('crypto-js')
const CHAVE_SECRETA = 'chave_baixa'

const login = async (req, res) => {
    const valores = req.body

    if (!valores.email || !valores.senha) {
        return res.status(400).json({ message: 'Campos de email e senha não estão corretos' })
    }

    try {
        const usuario = Usuario.findOne({ where: { email: valores.email } })

        if (!usuario) {
            return res.status(400).json({ message: 'Usuario não achado' })
        }

        const bytes = cryptojs.AES.decrypt(usuario.senha, CHAVE_SECRETA)
        const senha = bytes.toString(CryptoJS.enc.Utf8)

        if (valores.senha !== senha) {
            return res.status(401).json({ message: 'Senha errada, não autorizado' })
        }

        const horasEmMs = 1.5 * 60 * 60 * 1000
        const tempoExpirar = date.now() + horasEmMs

        const payload = {
            idUsuario: usuario.codUsuario,
            nome: usuario.nome,
            expiraEm: tempoExpirar
        }

        const token = cryptojs.AES.encrypt(JSON.stringify(payload), CHAVE_SECRETA).toString()

        return res.status(200).json({
            message: 'Login realizado com sucesso',
            nome: usuario.nome,
            token: token
        })

    } catch (err) {
        console.error('não foi possivel fazer o login',err)
        res.status(500).json({message: 'não foi possivel fazer o login'})
    }
}

module.exports = login