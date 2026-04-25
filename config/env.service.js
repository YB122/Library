import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });
let port = process.env.PORT;
let hash = Number.parseInt(process.env.HASH, 10);
let base_url = process.env.BASE_URL;
let signatureAdmin = process.env.SIGNATURE_ADMIN;
let signatureMember = process.env.SIGNATURE_MEMBER;
let accessToken = process.env.ACCESS_TOKEN;
let databaseUrl = process.env.DATA_BASE_URL_MY;
let verifySignature = process.env.VERIFY_SIGNATURE_MY;
export const env = {
  port,
  hash,
  base_url,
  signatureAdmin,
  signatureMember,
  accessToken,
  databaseUrl,
  verifySignature,
};
