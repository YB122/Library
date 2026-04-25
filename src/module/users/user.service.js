import { userModel } from "../../database/model/user.model.js";
import bcrypt from "bcrypt";
import { env } from "../../../config/env.service.js";
import { generateToken } from "../../common/middleware/auth.js";

export const register = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  const userFound = await userModel.findOne({ email });
  if (userFound) {
    return res.status(400).json({ message: "User already exists" });
  }
  let hash = await bcrypt.hash(password, env.hash);
  let user = await userModel.create({ name, email, password: hash, role });
  if (user)
    return res.status(201).json({ message: "user created", data: user });
  else return res.status(500).json({ message: "user not created" });
}


export const login = async (req, res) => {
  const { email, password } = req.body;
  const userFound = await userModel.findOne({ email });
  if (!userFound) {
    return res.status(400).json({ message: "User not found" });
  }
  const match = await bcrypt.compare(password, userFound.password);
  if (!match) {
    return res.status(400).json({ message: "Invalid password or email" });
  }
  let token = generateToken(userFound);
  return res.status(200).json({ message: "User logged in", data: userFound, token });
}

export const banUser = async (req, res) => {
  if (req.user && req.bearer == 'admin') {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (user)
      return res.status(200).json({ message: "User banned", data: user });
    else return res.status(404).json({ message: "User not banned" });
  } else {
    res.status(403).json({ message: 'admin only' });
  }
}

export const unbanUser = async (req, res) => {
  if (req.user && req.bearer == 'admin') {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, { isActive: true }, { new: true });
    if (user)
      return res.status(200).json({ message: "User unbanned", data: user });
    else return res.status(404).json({ message: "User not unbanned" });
  } else {
    res.status(403).json({ message: 'admin only' });
  }
}

export const getAllUsers = async (req, res) => {
  if (req.user && req.bearer == 'admin') {
    const users = await userModel.find({role: 'member'});
    if (users.length)
      return res.status(200).json({ message: "Users found", data: users });
    else
      return res.status(404).json({ message: "Users not found" });
  } else {
    res.status(403).json({ message: 'admin only' });
  }
}