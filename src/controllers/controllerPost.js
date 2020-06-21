const express = require('express')
const Post = require('../models/post')
const User = require('../models/User')

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

    /*
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');

    // Definindo o json para a imagem
    var finalImg = {
        contentType: req.file.mimetype,
        path: req.file.path,
        image: new Buffer(encode_image,'base64')
    };

    // aqui eu insiro a imagem no banco
    db.collection('postUser').insertOne(finalImg,(err, result) =>{
        console.log(result)

        if(err) return console.log(err);

        console.log("imagem salva salvo")

        res.contentType(finalImg.contentType);
        res.send(finalImg.image);
    })*/
};

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

