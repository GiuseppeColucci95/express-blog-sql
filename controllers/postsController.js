//import posts from post.js
const posts = require('../data/posts');

//import connection with db
const connection = require('../data/db');

//index
function index(req, res) {

  const sql = 'SELECT * FROM posts';

  connection.query(sql, (err, results) => {

    if (err) return res.status(500).json({ error: 'Database query failed' });
    res.json(results);

    console.log(results);
  });
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

  const slugToModify = req.params.slug.replaceAll("-", " ");
  const slugToUse = slugToModify.charAt(0).toUpperCase() + slugToModify.slice(1);

  const sql = 'DELETE FROM posts WHERE title = ?';

  connection.query(sql, [slugToUse], (err) => {

    if (err) return res.status(500).json({ error: 'Failed to delete post!' });
    res.sendStatus(204);
  });
}

//exports controller functions
module.exports = {
  index, show, store, update, modify, destroy
};