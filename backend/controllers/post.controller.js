const PostModel = require('../models/post.model');


module.exports.getPosts = async (req, res)=>{
    const posts = await PostModel.find();
    res.status(200).json(posts);
};

module.exports.setPosts = async (req, res) =>{
    if (!req.body.message){
        res.status(404).json({message: "merci d'ajouter un message"})
    }
    const post = await PostModel.create({
        message: req.body.message,
        author: req.body.author,
    });
    res.status(200).json(post);
};

module.exports.editPost = async (req, res) =>{
    const post = await PostModel.findById(req.params.id)

    if(!post){
        res.status(404).json({message: "ce post n'existe pas "});
    }

    const updatePost = await PostModel.findByIdAndUpdate(post , req.body,{
        new: true,
    });

    res.status(200).json(updatePost);
};


module.exports.deletePost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Ce post n'existe pas" });
        }

        await PostModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Message supprimé: " + req.params.id });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la suppression du post" });
    }
};
