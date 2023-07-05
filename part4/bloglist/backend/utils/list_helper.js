const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const result = blogs.reduce((mostLiked, blog) =>
    blog.likes > mostLiked.likes ? blog : mostLiked)
  const resultObject = {
    title: result.title,
    author: result.author,
    likes: result.likes
  }
  return resultObject
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}