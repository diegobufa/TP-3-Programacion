export const verifyRole = (...roles) => {

  return (req, res, next) => {

    if (req.user.fk_rol === 3)
      return next();

    if (!roles.includes(req.user.fk_rol)) {
      return res.status(403).json({
        message: "Acceso denegado"
      });
    }

    next();
  };
};