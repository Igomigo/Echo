const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`;

const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Echo-file");

    const response = await fetch(url, {
        method: "post",
        body: formData
    });

    const data = await response.json();

    return data;
};


export default uploadFile;