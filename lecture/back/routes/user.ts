// import * as express from 'express';
// import * as bcrypt from 'bcrypt';
// import { isLoggedIn, isNotLoggedIn } from './middleware';
// import User from '../models/user';
//
// const router = express.Router();
//
// // 회원 정보 가져오기
// router.get('/', isLoggedIn, (req, res) => {
//   const user = req.user!.toJSON() as User;
//   delete user.password;
//   return res.json(user);
// });
//
// // 회원 가입
// router.post('/', isNotLoggedIn, async (req, res, next) => {
//   try {
//     const exUser = await User.findOne({
//       where: {
//         userId: req.body.userId,
//       },
//     });
//
//     if (exUser) {
//       return res.status(403).send('이미 사용중인 아이디입니다.');
//     }
//
//     const hashedPassword = await bcrypt.hash(req.body.password, 12);
//     const newUser = await User.create({
//       nickname: req.body.nickname,
//       userId: req.body.userId,
//       password: hashedPassword,
//     });
//   } catch (err) {
//     console.log(err);
//     return next(err);
//   }
// });

import * as express from 'express';
import * as bcrypt from 'bcrypt';
import { isLoggedIn } from './middleware';
import User from '../models/user';

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
  const user = req.user!.toJSON() as User;
  delete user.password;
  return res.json(user);
});

router.post('/', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용 중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashedPassword,
    });
    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
