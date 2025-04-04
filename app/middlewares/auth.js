const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({
    path: path.resolve('../../.env')
})

class AuthService {

    static getToken(req, res, next) {
        // il va récupérer le token dans le requête
        const {  authorization } = req.headers
        if(!authorization){
            return res.status(400).json({ message: 'unauthorized' })
        }
        // Authorization : Bearer 1IOjdskd
        const token = authorization.split(" ")[1];
        if(!token){
            return res.status(400).json({ message: 'unauthorized' })
        }

        // le token existe bien
        req.token = token
        next()

    }

    static decypherToken(req, res, next){
        // il va déchiffrer le token
        const { token } = req
        if(!token){
            return res.status(400).json({ message: 'unauthorized' })
        }

        try {
            const decodedToken = jwt.verify(token,process.env.SECRET_KEY)
            console.log('decodedToken' , decodedToken)
            req.auth = decodedToken
            return next()

        } catch {
            return res.status(403).json({ message: 'invalid token'})
        }
     

    }

}

module.exports = AuthService