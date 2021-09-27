import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Scotch Woohoo',
    email: 'scotch@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Soda Waahaa',
    email: 'soda@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
