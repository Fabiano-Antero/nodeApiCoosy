const Post = require('../models/post')
const Comment = require('../models/comment');
const comment = require('../models/comment');


exports.create = async (req, res) => {
    try {

        //passa o id da postagem
        const postId = req.params.id;
        let comment = new Comment(req.body);

        // referencia a postagem ao qual esse cementario pertence
        const post = await Post.findById(postId);
        comment.post_id = post;

        await comment.save()
        console.log(comment)

        post.comentarios_id.push(comment);
        await post.save();
        console.log(post)

        res.status(201).json({
            data: comment,
            message: "Criado!",
            status: 201
        });

    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }

}

//atualiza os dados
exports.update = async (req, res) => {

        try{
            const commentId = req.params.id
            const comment = await Comment.findOneAndUpdate(commentId, req.body,{
                new: true,
                rawResult: true 
            });
            console.log(comment);
            res.status(200).json({
                status: 200,
                message: "Atualizado!",
                data: comment
            });

        }catch(error){
            
           res.status(400).json({
               Status: 400,
               message: "Não foi possível atualizar, tente novamente"
           })
        }
        
        
}


exports.delete = (req, res) => {
    //passa o id do comentario
    Comment.findByIdAndRemove(req.params.id)
        .then(comment => {
            if (!comment) {
                return res.status(404).send({
                    message: "Não foi encontrado "
                });
            }
            res.send({ message: "Comentário deletado!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Não foi encontrado "
                });
            }
            return res.status(500).send({
                message: "Sem respota para esse comentário" + req.params.id
            });
        });

};


//busca por um comentario
exports.search = (req, res) => {
    //passa o id do comentario
    Comment.findById(req.params.id)
        .then(comment => {
            if (!comment) {
                return res.status(404).send({
                    message: "Não foi encontrado " + req.params.id
                });
            }
            res.send(comment);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Comentário não existe: " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error ao recuperar o id: " + req.params.id
            });
        });
};

//busca por todos os comentarios da postagem
exports.searchs = (req, res) => {
    Comment.find().then(comment => {
        res.send(comment);
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Ocorreu um erro na listagem dos usuarios"
        });
    });

}
