const app = require("../app")
const request = require("supertest")
const model = require("../models/PacienteSchema")


const SECRET = process.env.SECRET;

describe("Paciente Controller", () => {

    const pacienteMock = {
        nome: "Aka",
        telefone: "233640",
        endereco: "lua verde",
        plano_saude: true,
        plano_saude_numero: 6554

        // só preciso colocar uma token para fazer um test de autenticação
    }


    beforeAll(async() => {
        const novaPaciente = new model(pacienteMock)

        await novaPaciente.save()

        pacienteMock.id = novaPaciente._id

    })

    test("GET /pacientes/all", (done) => {

        request(app)
        .get("/pacientes/all")
        .expect(200)
        .expect(res => {
            expect(res.body.message).toBe("Pacientes carregadas com sucesso!")
        })
        .end(err => {
            if (err) return done(err)
            return done()
        })
    });

    test("POST /pacientes/create", (done) => {

        const novaPaciente = {
            nome: "Bruna",
            telefone: "4556-1963",
            endereco: "Rua Nova",
            plano_saude: true,
            plano_saude_numero: 55664
        }

        request(app)
        .post("/pacientes/create")
        .send(novaPaciente)
        .expect(201)
        .expect(res => {
            expect(res.body.paciente.nome).toBe("Bruna")
        })
        .end(err => {
            return done(err)
        })
    });

    test("PATCH /pacientes/update/:id", (done) => {

        const atualizarPaciente = {
            nome: "Luiza"
        }

        request(app)
        .patch("/pacientes/update/" + pacienteMock.id)
        .send(atualizarPaciente)
        .set("Accept", "application/json")
        .expect(200)
        .expect(res => {
            expect(res.body.message).toBe("Paciente atualizada com sucesso!")
            expect(res.body.paciente.nome).toBe("Luiza")
        })
        .end(err => done(err))
    });

        test('GET /pacientes/:id ', (done) => {
        request(app)
        .get(`/pacientes/${pacienteMock.id}`)
        .expect(200)
        .expect(res => {
            expect(res.body.message).toBe("Paciente encontrada")
        })
        .end(err => done(err))
    });

    test("DELETE /pacientes/delete/:id", (done) => {
        request(app)
        .delete("/pacientes/delete/" + pacienteMock.id)
        .expect(200)
        .end(err => done(err))

    });


    test('Deve retornar um erro ao não encontrar uma paciente e um 404', (done) => {
        let idFake = "638114f070de5e77ffacdf86"
        request(app)
        .get("/pacientes/" + idFake)
        .expect(404)
        .expect(res => {
            expect(res.body.message).toBe("Paciente não encontrada!")
        })
        .end(err => done(err))
    });

})