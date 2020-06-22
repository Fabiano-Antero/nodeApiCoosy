const express = require('express')
const Post = require('../models/post')
const User = require('../models/User');
const comment = require('../models/comment');

//Configuração do envio de multiplas imagens para o MongoDB
exports.create = async (req, res) => {

    try {
        const userId = req.params.id;
        let img = new Post({
            data: req.body.data,
            like: req.body.like,
            conteudo: req.body.conteudo,
            images: req.files
        });
        const user = await User.findById(userId);
        img.autor_id = user;

        await img.save();
        console.log(img);


        user.post_id.push(img);
        await user.save();
        console.log(img)
        res.status(201).json({
            data: img,
            message: 'Publicado com sucesso!',
            status: 201
        });

    } catch (error) {
        res.status(400).json({
            erro: [
                {
                    message: "Envio não foi concluido, tente nomavente",
                    status: 400
                }
            ]
        })
    }
};

exports.update = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await Post.findOneAndUpdate(postId, req.boyd, {
            new: true,
            rawResult: true

        });

        res.status(200).json({
            status: 200,
            message: "Atualizado!",
            data: post
        });
        console.log(post);

    } catch (error) {
        console.log(error)
        res.status(400).json({
            Status: 400,
            message: "Não foi possível atualizar, tente novamente"
        })
    }
}

exports.delete = (req, res) => {
    Post.findByIdAndRemove(req.params.id).then(post => {
        if (!post) {
            return res.status(404).json({
                status: 404,
                message: "Não foi encontrada"
            });
        }
        res.status(200).json({
            status: 200,
            message: "Postagem deletada!"
        });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Não foi encontrado "
            });
        }
        return res.status(500).send({
            message: "Sem respota para essa postagem"
        });
    });
}

//buuscar todos
exports.searchs = (req, res) => {
    Post.find().then(post => {
        res.json({
            status: 200,
            message: "Sucesso!",
            data: post
        })
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Ocorreu um erro na listagem das postagens"
        });
    });

}

//buscar um
exports.search = (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (!post) {
                return res.status(404).send({
                    message: "Não foi encontrado " + req.params.id
                });
            }
            res.json({
                status: 200,
                message: "Sucesso!",
                data: post
            })
            console.log(post)
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "postagem não existe: " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error ao recuperar a postagem: " + req.params.id
            });
        });
};
