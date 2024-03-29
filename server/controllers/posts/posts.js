import User from '../../models/user.js';
import Post from '../../models/post.js';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';


//Create post

export const  createPost = async(req, res) => {
    try {
        const {title, text} = req.body;
        const user = await User.findById(req.userId);

        if (req.files) {
            let fileName =Date.now().toString() + req.files.image.name; 
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, '../../', 'uploads', fileName));

            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: req.userId,
            });
            await newPostWithImage.save();
            await User.findByIdAndUpdate(req.userId, {$push: {posts: newPostWithImage}});
            return res.json(newPostWithImage);
        };

        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl: '',
            author: req.userId,
        });
        await newPostWithoutImage.save();
        await User.findByIdAndUpdate(req.userId,{$push: {posts: newPostWithoutImage}});
        return res.json(newPostWithoutImage);

    } catch (error) {
        res,json({message:'Something went wrong'});
    }
};

// Get all posts

export const getAll = async(req,res) => {
    try {
        const posts = await Post.find().sort('-createdAt');
        const popularPosts = await Post.find().limit(5).sort("-view");
        if (!posts) {
            return res.json({message: 'No posts'});            
        };
        res.json({posts, popularPosts});
    } catch (error) {
        res.json({message: "Something went wrong"})
    }
};

// Get post by id

export const getById = async(req,res) => {
    try {
        const post = await Post.findOneAndUpdate(req.params.id, {
             $inc:{views: 1},
        });
        res.json(post);
    } catch (error) {
        res.json({message: "Something went wrong"})
    }
};