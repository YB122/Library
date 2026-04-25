// ✅ Vercel picks up the default export from app.controller.js via this re-export
export { default } from "./app.controller.js";

// Disable Vercel's default body parsing to allow multer to handle multipart
export const config = {
    api: {
        bodyParser: false,
    },
};