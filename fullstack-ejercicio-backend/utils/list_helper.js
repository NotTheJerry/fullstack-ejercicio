const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (array) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return array.length === 0
    ? 0
    : array.reduce(reducer, 0) / array.length
}

const favoriteBlog = (array) => {
    let mayor = 0;
    for(let i=1; i < array.length; i++){
        if(array[i].likes > array[i-1].likes){
            mayor = array[i]
        }
    }
    return mayor
}


const authorMostBlogs = (array) => {
    let arrayMax = {}
    array.map(blog => {
        if(arrayMax[blog.author]){
            arrayMax[blog.author].blogs++
        } else {
            arrayMax[blog.author] = {
                author: blog.author,
                blogs: 1
            }
        }
    });

    const mayor = _.maxBy(Object.keys(arrayMax), max => {
        return arrayMax[max].blogs
    })
    
    return arrayMax[mayor]
}

const authorMostLikes = (array) => {
    let arrayMax = {}
    array.map(blog => {
        if(arrayMax[blog.author]){
            arrayMax[blog.author].likes += blog.likes
        } else {
            arrayMax = { ...arrayMax, [blog.author] : { author: blog.author, likes: blog.likes } }
        }
    })

    const mayor = _.maxBy(Object.keys(arrayMax), item => {
        return arrayMax[item].likes
    })

    return arrayMax[mayor]
}

  module.exports = {
    dummy, totalLikes, favoriteBlog, authorMostBlogs, authorMostLikes
  }