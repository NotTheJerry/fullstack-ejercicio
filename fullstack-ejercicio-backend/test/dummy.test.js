const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
  })

  describe('favorite blog', () => {
    const listWithManyBlogs = [
      {
        _id: '5a422aa71b54a676234d17f1',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f2',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f3',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f4',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 300,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f5',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 0,
        __v: 0
      }
    ]
  
    test('test favorite blog', () => {
      const result = listHelper.favoriteBlog(listWithManyBlogs)
      expect(result)
      .toEqual( {
        _id: '5a422aa71b54a676234d17f4',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 300,
        __v: 0
      } )
    })
  })


  describe('author with most blogs', () => {
    const listWithManyBlogs = [
        {
          _id: '5a422aa71b54a676234d17f1',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f2',
          title: 'Go To Statement Considered Harmful',
          author: 'Gera',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 2,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f3',
          title: 'Go To Statement Considered Harmful',
          author: 'Gera',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 10,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f4',
          title: 'Go To Statement Considered Harmful',
          author: 'Gera',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 300,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f5',
          title: 'Go To Statement Considered Harmful',
          author: 'Pedro Pasc',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 0,
          __v: 0
        }
      ]
    
      test('test favorite blog', () => {
        const result = listHelper.authorMostBlogs(listWithManyBlogs)
        expect(result)
        .toEqual( {
            author: "Gera",
            blogs: 3
          } )
      })
  })

  describe('author with most likes', () => {
    const listWithManyBlogs = [
        {
          _id: '5a422aa71b54a676234d17f1',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f2',
          title: 'Go To Statement Considered Harmful',
          author: 'Gera',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 2,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f3',
          title: 'Go To Statement Considered Harmful',
          author: 'Gera',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 10,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f4',
          title: 'Go To Statement Considered Harmful',
          author: 'Gera',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 300,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f5',
          title: 'Go To Statement Considered Harmful',
          author: 'Pedro Pasc',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 100,
          __v: 0
        }
      ]
    
      test('test favorite blog', () => {
        const result = listHelper.authorMostLikes(listWithManyBlogs)
        expect(result)
        .toEqual( {
            author: "Gera",
            likes: 312
          } )
      })
  })