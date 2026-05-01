import { ENV } from "../config/env";

export const uploadImage = async (file, folder = "default") => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "unsigned_preset");
        formData.append("folder", folder);

        const res = await fetch(ENV.VITE_IMAGE_UPLOAD_URL, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error?.message || "Upload failed");
        }

        if (!data.secure_url) {
            throw new Error("No secure_url returned");
        }

        return data.secure_url;

    } catch (err) {
        console.error("UPLOAD ERROR:", err);
        throw err;
    }
};