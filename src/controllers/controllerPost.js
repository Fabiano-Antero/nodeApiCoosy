const express = require('express')
const Post = require('../models/post')
const User = require('../models/User')

//Configuração do envio de multiplas imagens para o MongoDB
exports.imgUploads = async (req, res) => {

    try {
        const userId = req.params.id;
        let img = new Post({
                data: req.body.data,
                like: req.body.like,
                conteudo: req.body.conteudo,
                images: req.files
            });
            const user = await User.findById(userId);
            img.autor = user;

            await img.save();
            user.post.push(img);
            await user.save();
            res.status(201).json(img);

    } catch (error) {
        res.status(400).send(error)
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