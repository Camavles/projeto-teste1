const mongoose = require("mongoose");
const UserSchema = require('../models/UserSchema');
const bcrypt = require("bcrypt");

const getAll = async (req, res) => {
  UserSchema.find(function (err, users) {
    if (err) {
      res.status(500).send({ message: err.message })
    }
    res.status(200).send(users)
  })
}

const createUser = async (req, res) => {

  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  const emailExists = await UserSchema.exists({ email: req.body.email })

  if (emailExists) {
    return res.status(409).send({
      message: 'Email já cadastrado',
    })
  }

  try {
    const newUser = new UserSchema(req.body)

    const savedUser = await newUser.save()

    res.status(201).send({
      message: 'Usuário cadastrado com sucesso!',
      savedUser,
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({
      message: err.message,
    })
  }
}

const deleteUser = async (req, res) => {
    try {
      const { id } = req.params
      await UserSchema.findByIdAndDelete(id)
      res.status(200).json({ message: `Usuario com o id ${id} deletado` })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: err.message })
    }
  }

module.exports = {
    getAll,
    createUser,
    deleteUser
}