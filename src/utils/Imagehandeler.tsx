export async function handleFileUpload(e: any) {
  const file = e.target.files[0];

  if (!file) {
    alert("Please select a file to upload.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Thanku"); // Add your Cloudinary upload

  try {
    const response = await uploadFile(formData);
    console.log("File uploaded successfully:", response);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

async function uploadFile(formData: FormData) {
  const apiUrl = "https://api.cloudinary.com/v1_1/dziuxxboo/image/upload"; // Replace with your Cloudinary upload URL
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
