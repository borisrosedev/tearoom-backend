const User = require('../database/models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({
    path: path.resolve('../../.env')
})

const userController = {

    async index(req, res){
        try {
            const users = await User.findAll()

            if(!users){
                return res.status(404).json({ message: "no user found"})
            }

            return res.status(200).json({ users })
        } catch (err){
            return res.status(500).json({ message: err })
        }
    },

    async create(req, res){
        const { email, password , firstName, lastName } = req.body
    
        try {
            const newUser = await User.create({ email, password, firstName, lastName })
            return res.status(201).json({ user: newUser })
        } catch (err){
            return res.status(500).json({ message: err })
        }
    },

    async login(req,res){
        const { email, password } = req.body
        try {
            const user = await User.findOne({
                where: {
                    email: email
                }
            })


            if(!user){
                return res.status(400).json({ message: 'invalid data'})
            }

            // on a bien un utilisateur avec ce mail dans la bd

            const isPasswordValid = bcrypt.compareSync(password, user.password)

            if(!isPasswordValid){
                return res.status(400).json({ message: 'invalid data'})
            }

            // si ça coïncide on va créer le token 

            const token = jwt.sign(
                { email, role: user.role }, 
                process.env.SECRET_KEY,
                {
                    expiresIn:'1h'
                }
            )

            return res.status(200).json({ token })


        } catch (err){
            return res.status(500).json({ message: err })
        }
    },

    getOneById(req, res){

        try {

        } catch (err){
            return res.status(500).json({ message: err })
        }
    },

    //http://localhost:3000/api/user/1
    async deleteOneById(req,res){
        const { id } = req.params
        const { auth: { email, role } } = req
    

        try {
            const userToDelete = await User.findOne({
                where: {
                    id: Number(id)
                }
            })

            console.log('userToDelete.dataValues', userToDelete.dataValues)

            // si ce n'est ni un adminatreur ni l'utilisateur à supprimer
       
            if(! (role === "admin" || email === userToDelete.dataValues.email) ){
                return res.status(401).json({ message: 'invalida token'})
            }

            await userToDelete.destroy();

            return res.status(200).json({ message: `User with id : ${id} has been deleted`})

        } catch (err){
            return res.status(500).json({ message: err })
        }
    },


    async updateOneById (req, res) {
        try {
            const user = await User.findByPk(Number(req.params.id))


            console.log('📥 req.body:', req.body);
            console.log('🖼️ req.file:', req.file);
            console.log('📨 Content-Type:', req.headers['content-type']);
            if(!user){
                return res.status(404).json({ message: 'user not found'})
            }

            user.set({
                ...req.body
            });

            await user.save();

            return res.status(200).json({ message: `user with id ${req.params.id} updated`, user})
        } catch(err){
            return res.status(500).json({ message: err }) 
        }
    }
  


}

module.exports = userController