import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, "../server/.env"),
});


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});


const FOLDER = "home-gallery";

async function listImages() {
    try {
        const res = await cloudinary.search
            .expression(`folder="${FOLDER}"`)
            .max_results(100)
            .execute();

        const urls = res.resources.map(r =>
            r.secure_url.replace("/upload/", "/upload/q_auto,f_auto,w_800/")
        );

        const targetPath = path.join(
            __dirname,
            "../client/public/home-gallery.json"
        );

        fs.writeFileSync(targetPath, JSON.stringify(urls, null, 2));

        console.log("✅ Saved gallery.json with", urls.length, "items");
    } catch (err) {
        console.error("❌ Error:", err.message);
    }
}

listImages();