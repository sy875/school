import { useState } from "react";
import { supabase } from "@/lib/supabase"; // Adjust the import based on where Supabase is initialized
import { Button } from "./ui/button"; // Your button component


interface ImageUploadProps {
    onImageUpload: (url: string) => void; // Callback function to pass the uploaded image URL
}

export function ImageUpload({ onImageUpload }: ImageUploadProps) {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            // Generate a local URL for the image preview
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    // Upload image to Supabase Storage
    const handleUploadClick = async () => {
        if (!selectedImage) {
            return;
        }

        setLoading(true);
        setErrorMessage("");

        try {
            const fileName = `${Date.now()}-${selectedImage.name}`;
            const filePath = `images/${fileName}`;

            // Upload to Supabase Storage
            const { data, error } = await supabase.storage
                .from("images") // 'images' is the bucket name
                .upload(filePath, selectedImage);

            if (error) {
                throw new Error(error.message);
            }

            // Get the public URL of the uploaded image
            const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data?.path}`;

            // Pass the uploaded image URL to the parent component
            onImageUpload(publicUrl);
            setLoading(false);
            setImagePreview(null); // Clear preview after upload
        } catch (error: any) {
            setLoading(false);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="space-y-4 h-full">
            <h2>School Image</h2>


            {/* Display image preview if available */}
            {imagePreview ? (
                <div className="h-full">
                    <div
                        className="w-full h-[350px] lg:w-[350px] lg:h-[280px] bg-cover bg-no-repeat relative rounded-md overflow-hidden"
                        style={{
                            backgroundImage: `url(${imagePreview})`,
                        }}
                    >
                        <Button
                            type="button"
                            className=" capitalize absolute top-0 right-0" onClick={handleUploadClick}>
                            Upload
                        </Button>
                    </div>

                </div>
            ) : (
                <>

                    <div className="flex items-center justify-center w-full h-full">
                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={loading}
                            />
                        </label>
                    </div>
                </>
            )

            }

            {loading && <p>Uploading...</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
    );
}
