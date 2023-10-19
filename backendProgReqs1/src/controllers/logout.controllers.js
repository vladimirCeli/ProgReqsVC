const Person = require("../model/Person.model");

const logout = async (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.token) return res.sendStatus(204);
    const refresh_token = cookies.token;
  
    try {
      // Busca al usuario por su refresh_token utilizando Sequelize
      const foundUser = await Person.findOne({ where: { refresh_token } });
  
      if (!foundUser) {
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" });
        return res.sendStatus(204);
      }
  
      // Actualiza el refresh_token del usuario a null
      await foundUser.update({ refresh_token: null });
  
      res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" });
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

const checkSession = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.token) return res.sendStatus(204);
  const refresh_token = cookies.token;

  try {
    // Busca al usuario por su refresh_token utilizando Sequelize
    const foundUser = await Person.findOne({ where: { refresh_token } });

    if (!foundUser) {
      res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" });
      return res.json({ sessionActive: false });
    }
      else {
        return res.json({ sessionActive: true });
      }
    } catch (error) {
        console.log(error)
    }
  }
  
  module.exports = {
    logout,
    checkSession,
  };
  
  
  
  
  
  