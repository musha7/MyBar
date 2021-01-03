import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Michael Shlezinger',
        email: 'michael@gmail.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true
    },
    {
        name: 'John Black',
        email: 'john@gmail.com',
        password: bcrypt.hashSync('12345', 10),
    },
    {
        name: 'Luka Doncic',
        email: 'luka@gmail.com',
        password: bcrypt.hashSync('12345', 10),
    }
]

export default users