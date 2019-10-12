'use strict'

exports.post = async(repository, validationContract, req, resp) => {
    try {        
        if(!validationContract.isValid()){
            resp.status(400).send({validation: validationContract.errors()}).end()
            return
        }

        let resultado = await repository.create(req.body)
        resp.status(200).send(resultado)

    } catch (error) {
        console.log(`Erro no Post, motivos: ${error}`)
        resp.status(500).send({message: "Erro no processamento", erro: error})
    }
}

exports.put = async(repository, validationContract, req, resp) => {
    try {  
        let data = req.body

        if(!validationContract.isValid()){
            resp.status(400).send(
                {message: "Existem dados inválidos na sua requisição"}, 
                {validation: validationContract.errors()}
            ).end()
            return
        }

        let resultado = await repository.update(req.params.id, data)
        resp.status(202).send(resultado)

    } catch (error) {
        console.log(`Erro no Put, motivos: ${error}`)
        resp.status(500).send({message: "Erro no processamento", erro: error})
    }
}

exports.get = async(repository, req, resp) => {
    try {
        let list = await repository.getAll()
        resp.status(200).send(list)
    } catch (error) {
        console.log(`Erro no Get, motivos: ${error}`)
        resp.status(500).send({message: "Erro no processamento", erro: error})
    }
}

exports.getById = async(repository, req, resp) => {
    try {       
        if(req.params.id){
            let data = await repository.getById(req.params.id)
            resp.status(200).send(data)
        }
        else{
            console.log(`Erro no GetById, motivos: ${error}`)
            resp.status(400).send({message: "O parametro ID precisa ser informado"})
        }
    } catch (error) {
        console.log(`Erro no GetById, motivos: ${error}`)
        //resp.status(500).send({message: "Erro no processamento", erro: error})
    }
}

exports.delete = async(repository, req, resp) => {
    try {
        let id = req.params.id

        if(id){
            await repository.delete(id)
            resp.status(200).send({message: "Registro excluido com sucesso!"})
        }
        else {
            resp.send(200, {message: "O parametro ID precisa ser informado"})
        }
    } catch (error) {
        console.log(`Erro no Delete, motivos: ${error}`)
        resp.status(500).send({message: "Erro no processamento", erro: error})
    }
}