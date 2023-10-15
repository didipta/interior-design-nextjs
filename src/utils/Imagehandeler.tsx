export async function handleFileUpload(e: any) {
  const file = e;

  if (!file) {
    alert("Please select a file to upload.");
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", `${process.env.IMG_KEY}`); // Add your Cloudinary upload

  try {
    const response = await uploadFile(formData);

    console.log("File uploaded successfully:", response);
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

async function uploadFile(formData: FormData) {
  const apiUrl = `${process.env.IMG_URL}`; // Replace with your Cloudinary upload URL
  const response = await fetch(apiUrl, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "File upload failed");
  }

  return response.json();
}
