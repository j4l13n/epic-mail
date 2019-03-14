import users from '../models/users';
import jwt from 'jsonwebtoken';
import validateUser from '../helpers/validations/user';
import path from 'path';
import fs from 'fs';

class AuthController {
  static register(req, res) {
    const { firstname, lastname, email, password } = req.body;
    const { error } = validateUser(req.body);
    if (error) {
      res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const newUser = {
      id: users.length + 1,
      firstname,
      lastname,
      email,
      password,
    };
    users.push(newUser);
    fs.writeFileSync(
      path.resolve(__dirname, '../data/users.json'),
      JSON.stringify(users, null, 2),
    );

    jwt.sign(
      {
        user: newUser,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '2 days',
      },
      (err, token) => {
        res.status(201).json({
          status: 201,
          data: [{ token }],
        });
      },
    );
  }

  static login(req, res) {
    const { email, password } = req.body;
    const credentials = { email, password };

    const userData = users.find(user => user.email === email);

    if (userData) {
      if (userData.password === password) {
        jwt.sign(
          { user: credentials },
          process.env.SECRET_KEY,
          { expiresIn: '2 days' },
          (err, token) => {
            const context = {
              status: 200,
              data: [{ token }],
            };
            res.json(context);
          },
        );
      } else {
        res.json({
          status: 404,
          error: 'Invalid email and password combination',
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        error: 'This user is not found',
      });
    }
  }
}

export default AuthController;
