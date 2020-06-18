const express = require('express')
const User = require('../models/User')

exports.registra = async (req, res) => {
    // Cria a conta do usuário
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
};


// Delete um registro do banco
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "Não é um id " + req.params.id
                });
            }
            res.send({ message: "Registro excluido com sucesso!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Não é um id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.id
            });
        });

};



//Pesquisar por um usuário
exports.pesquisaUm = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.id
            });
        });
};



//faz a busca por todoas as contas de usuário
exports.pesquisaTodos = async (req, res) => {
    User.find().then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu um erro na listagem dos usuarios"
        });
    });

}

exports.login = async (req, res) => {
    //Faz o login do usuário
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

};

exports.dadosPerfil = async (req, res) => {
    // Exibe dados do usuário logado
    res.send(req.user)
};

exports.logout = async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
};

exports.logoutAll = async (req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
}
