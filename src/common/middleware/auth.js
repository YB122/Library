import jwt from "jsonwebtoken";
import { env } from "./../../../config/env.service.js";

export const auth = (req, res, next) => {
  let { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ message: "Login required" });
  }
  let [bearer, token] = authorization.split(" ");
  if (!bearer || !token) {
    return res.status(401).json({ message: "Invalid token format" });
  }
  let signature = "";
  switch (bearer) {
    case "admin":
      signature = env.signatureAdmin;
      break;

    case "member":
      signature = env.signatureMember;
      break;


    default:
      return res.status(401).json({ message: "Invalid token" });
  }

  try {
    if (signature) {
      let decode = jwt.verify(token, signature);
      if (decode) {
        req.user = decode;
        req.bearer = bearer;
      } else {
        return res.status(401).json({ message: "Invalid token" });
      }
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (e) {
    console.error("Token verification failed:", e);
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  next();
};

export const generateToken = (userSearch) => {
  let signature = "";
  switch (userSearch.role) {
    case "admin":
      signature = env.signatureAdmin;
      break;
    case "member":
      signature = env.signatureMember;
      break;

  }
  return jwt.sign({ _id: userSearch._id }, signature);
};
