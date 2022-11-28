const PacienteSchema = require("../models/PacienteSchema");
// const jwt = require('jsonwebtoken')
// const SECRET = process.env.SECRET

const criarPaciente = async (request, response) => {

//     const authHeader = request.get('authorization')
//     if (!authHeader) {
//       return response.status(401).send('Wheres the authorization, gatinha?')
//     }

//     const token = authHeader.split(' ') [1]

//   await jwt.verify(token, SECRET, async function (erro) {

//     if (erro) {
//       return response.status(403).send('Not happening')
//     }
// })
    const { nome, telefone, endereco, plano_saude, plano_saude_numero } = request.body

    if (!endereco) {
        return response.status(400).send({
            message: "Endereço não foi preenchido!"
        })
    }

    try {

        const paciente = new PacienteSchema({
            nome: nome,
            telefone: telefone,
            endereco: endereco,
            plano_saude: plano_saude,
            plano_saude_numero: plano_saude_numero
        })


        const salvarPaciente = await paciente.save()

        response.status(201).json({
            paciente: salvarPaciente
        })

    } catch (error) {
        response.status(400).json({
            message: error.message
        })
    }
}


const buscarPaciente = async (req, res) => {
    
//     const authHeader = req.get('authorization')
//     if (!authHeader) {
//       return res.status(401).send('Wheres the authorization, gatinha?')
//     }

//     const token = authHeader.split(' ') [1]

//   await jwt.verify(token, SECRET, async function (erro) {

//     if (erro) {
//       return res.status(403).send('Not happening')
//     }
// })
    
    const { nome } = req.query;
    let query = { };


    //validação para caso venha um nome
    if (nome) query.nome = new RegExp(nome, 'i');

    try{
        const pacientes = await PacienteSchema.find(query);
        res.status(200).json({
            statusCode: 200,
            message: 'Pacientes carregadas com sucesso!',
            pacientes: pacientes
        })

    }catch(error){
        res.status(500).json({
            statusCode: 500,
            mensagem: error.message
        })
    }
}


const buscarPacientePorId = async (req, res) => {
    
//     const authHeader = req.get('authorization')
//     if (!authHeader) {
//       return res.status(401).send('Wheres the authorization, gatinha?')
//     }

//     const token = authHeader.split(' ') [1]

//   await jwt.verify(token, SECRET, async function (erro) {

//     if (erro) {
//       return res.status(403).send('Not happening')
//     }
// })
    
    const id = req.params.id

    try {
        const buscarPaciente = await PacienteSchema.findById(id)

        if (!buscarPaciente) {
            return res.status(404).json({
                message: "Paciente não encontrada!"
            })
        }

        res.status(200).json({
            message: "Paciente encontrada",
            buscarPaciente})

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const atualizarPaciente = async(req, res) => {

//     const authHeader = req.get('authorization')
//     if (!authHeader) {
//       return res.status(401).send('Wheres the authorization, gatinha?')
//     }

//     const token = authHeader.split(' ') [1]

//   await jwt.verify(token, SECRET, async function (erro) {

//     if (erro) {
//       return res.status(403).send('Not happening')
//     }
// })
    const { nome, telefone, endereco, plano_saude, plano_saude_numero } = req.body

    try {
        const encontraPorId = await PacienteSchema.findById(req.params.id)

        if (!encontraPorId) {
            return res.status(404).send({
                message: "Nenhum cadastro encontrado para o id buscado!"
            })
        }

        encontraPorId.nome = nome || encontraPorId.nome
        encontraPorId.telefone = telefone || encontraPorId.telefone
        encontraPorId.endereco = endereco || encontraPorId.endereco
        encontraPorId.plano_saude = plano_saude || encontraPorId.plano_saude
        encontraPorId.plano_saude_numero = plano_saude_numero || encontraPorId.plano_saude_numero

        const pacienteAtualizada = await encontraPorId.save()

        res.status(200).json({
            message: "Paciente atualizada com sucesso!",
            paciente: pacienteAtualizada
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}


const deletarPaciente = async (req, res) => {
    try {

    //     const authHeader = req.get('authorization')
    //     if (!authHeader) {
    //       return res.status(401).send('Wheres the authorization, gatinha?')
    //     }
    
    //     const token = authHeader.split(' ') [1]
    
    //   await jwt.verify(token, SECRET, async function (erro) {
    
    //     if (erro) {
    //       return res.status(403).send('Not happening')
    //     }
    // })
        const buscarPacientePorId = await PacienteSchema.findById(req.params.id)

        if (!buscarPacientePorId) {
            return res.status(404).send({
                message: "Nenhum cadastro encontrado para o buscado"
            })
        }

        await buscarPacientePorId.delete()

        res.status(200).send({
            message: "Cadastro removido"
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}


module.exports = {
    criarPaciente,
    buscarPaciente,
    buscarPacientePorId,
    atualizarPaciente, 
    deletarPaciente
}