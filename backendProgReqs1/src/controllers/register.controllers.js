const Person = require("../model/Person.model");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator");
require("dotenv").config();
const { cronSchedule } = require("../config/cronSchedule");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secureConnection: true,
  port: 587,
  service: "gmail",
  auth: {
      user: "vladimir.celi@unl.edu.ec",
      pass: "vapdncmehudtbbze",
  },
})

const generateUniqueToken = () => {
  const sha256 = require('crypto').createHash('sha256');
  return sha256.update(Math.random().toString()).digest('hex');
}

const sendConfirmationEmail = async (email, token) => {
  try {
  const mailOptions = {
      from: "vladimir.celi@unl.edu.ec",
      to: email,
      subject: "Confirmación de cuenta",
      html: `<h1>Por favor, confirma tu cuenta</h1>
      <h3>Para confirmar tu cuenta, haz click en el siguiente enlace</h3>
      <a href="https://progresqscic.onrender.com/confirm/${token}">Confirmar cuenta</a>
      `,
  }
   const info = await transporter.sendMail(mailOptions)
    console.log("Message sent: %s", info.messageId)
} catch (error) {
  console.log("Error al enviar el correo", error)
}
}

const passwordSchema = new passwordValidator();
passwordSchema
  .is()
  .min(12)
  .is()
  .max(30)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .symbols()
  .has()
  .not()
  .spaces()
  .is().not().oneOf(['Passw0rd', 'Password123', '12345678',]);

  const register = async (req, res, next) => {
    const { first_name, last_name, email, username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const existingEmail = await Person.findOne({ where: { email: email } });
  
      if (existingEmail) {
        return res.status(400).json({ message: "Email ya registrado" });
      }
  
      const existingUsername = await Person.findOne({ where: { username: username } });
  
      if (existingUsername) {
        return res.status(400).json({ message: "Username ya registrado" });
      }
  
      if (!passwordSchema.validate(password)) {
        return res.status(400).json({ message: "Contraseña no válida" });
      }
  
      const confirmationToken = generateUniqueToken();
      const person = await Person.create({
        first_name,
        last_name,
        email,
        username,
        password: hashedPassword,
        confirmation_token: confirmationToken,
      });
  
      const waitTime = 5 * 60 * 1000;
      cronSchedule(person.id, waitTime);
      await sendConfirmationEmail(email, confirmationToken);
      res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error al registrar usuario" });
    }
  };
  
  const confirmEmail = async (req, res) => {
    const { confirmationToken } = req.params;
  
    try {
      const person = await Person.findOne({ where: { confirmation_token: confirmationToken } });
  
      if (!person) {
        return res.status(404).json({ message: "Su token de confirmación no es válido" });
      }
  
      if (person.confirmed) {
        return res.status(400).json({ message: "Este correo electrónico ya ha sido confirmado" });
      }
  
       person.update({ confirmed: true });
  
      return res.json({ message: "Su correo electrónico ha sido confirmado con éxito" });
    } catch (error) {
      return res.status(500).json({ message: "Error al confirmar el correo electrónico" });
    }
  };

module.exports = {
  confirmEmail,
  register,
};
