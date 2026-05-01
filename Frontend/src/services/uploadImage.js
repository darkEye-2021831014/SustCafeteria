import { ENV } from "../config/env";

const uploadImage = async (file, folder = "default") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset");
    formData.append("folder", folder);

    const res = await fetch(
        ENV.IMAGE_UPLOAD_URL,
        {
            method: "POST",
            body: formData,
        }
    );

    const data = await res.json();
    return data.secure_url;
};