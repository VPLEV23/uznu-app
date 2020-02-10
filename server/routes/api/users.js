const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

//Підгружжаємо валідацію
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Підгружаєммо Модуль користувача

const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public

router.post("/register", (req, res) => {
  // форма валідації
  const { errors, isValid } = validateRegisterInput(req.body);
  // перевірка валідації
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      // Hash пароль перед зберіганням в базу данних
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public

router.post("/login", (req, res) => {
  // форма валідації
  const { errors, isValid } = validateLoginInput(req.body);
  // перевірка валідації
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Пошук користувача за e-mail
  User.findOne({ email }).then(user => {
    // Перевірка чи користувач існує
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // перевірка пароля
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Користувач співпадає
        // Створюємо JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Ключ Входу
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 рік в секундах
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// експорт
module.exports = router;
