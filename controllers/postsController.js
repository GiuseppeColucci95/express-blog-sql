//import posts from post.js
const posts = require('../data/posts');

//index
function index(req, res) {

  //get query tag inserted
  const queryTag = req.query.tag;
  let filteredPosts = posts;

  //check if tag exist
  if (!queryTag) {

    //return all posts
    return res.json(filteredPosts);
  }

  //else filter posts
  filteredPosts = posts.filter(post => post.tags.includes(queryTag));

  //return result
  res.json(filteredPosts);

}

//show
function show(req, res) {
  //get dynamic slug
  const postSlug = req.params.slug;

  //find interested post
  const post = posts.find(post => post.slug === postSlug);

  //check if post got found
  if (!post) {
    //error (bonus)
    return res.status(404).json({
      error: "404 Not Found",
      message: "Post not found"
    });
  }

  res.json(post);
}

//store
function store(req, res) {

  //create a new slug from the given title
  newSlug = req.body.title.replaceAll(" ", "-").toLowerCase();

  //create a new object 
  const newPost = {
    title: req.body.title,
    slug: newSlug,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags
  };

  //insert the new object in the array
  posts.push(newPost);

  //print in console the new object
  console.log(newPost);

  //set status and return the object just created in json format
  res.status(201).json(newPost);
}

//update
function update(req, res) {

  //get the slug to modify
  const slugToModify = req.params.slug;
  console.log(slugToModify);

  //find the post to modify
  const postToModify = posts.find(post => post.slug === slugToModify);

  //check if post to modify exist and handle the error
  if (!postToModify) {
    return res.status(404).json({
      error: "404 NOT FOUND",
      message: "Post not found"
    });
  }

  //modify the post
  postToModify.title = req.body.title;
  postToModify.content = req.body.content;
  postToModify.image = req.body.image;
  postToModify.tags = req.body.tags;
  postToModify.slug = req.body.title.replaceAll(" ", "-").toLowerCase();

  //return the modified post in console and in json
  console.log(postToModify);
  res.json(postToModify);
}

//modify
function modify(req, res) {

  //get the slug to modify
  const slugToModify = req.params.slug;
  console.log(slugToModify);

  //find the post to modify
  const postToModify = posts.find(post => post.slug === slugToModify);

  //check if post to modify exist and handle the error
  if (!postToModify) {
    return res.status(404).json({
      error: "404 NOT FOUND",
      message: "Post not found"
    });
  }

  //modify the post
  postToModify.tags = req.body.tags;

  //return the modified post in console and in json
  console.log(postToModify);
  res.json(postToModify);
}

//destroy
function destroy(req, res) {

  //get dynamic slug
  const postSlug = req.params.slug;
  //try to find post with given slug
  const post = posts.find(post => post.slug === postSlug);

  //if post not found
  if (!post) {
    //error (bonus)
    return res.status(404).json({
      error: "404 Not Found",
      message: "Post Not Found"
    });
  }

  //else remove the post
  posts.splice(posts.indexOf(post), 1);
  //print length in console to check the result
  console.log(posts);

  //send 204 status
  res.sendStatus(204);
}

//exports controller functions
module.exports = {
  index, show, store, update, modify, destroy
};