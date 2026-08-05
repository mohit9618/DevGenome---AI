"use client";

import { useState } from "react";
import Image from "next/image";

interface UploadResponse {
  success: boolean;
  publicId: string;
  secureUrl: string;
}

interface FileUploaderProps {
  folder: string;
  accept: string;
  label?: string;
  preview?: boolean;
  onUpload: (url: string, publicId: string) => void;
}

export default function FileUploader({
  folder,
  accept,
  label = "Choose File",
  preview = true,
  onUpload,
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileName, setFileName] = useState("");

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    setUploading(true);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data: UploadResponse = await response.json();

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      if (file.type.startsWith("image/")) {
        setPreviewUrl(data.secureUrl);
      }

      onUpload(data.secureUrl, data.publicId);
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">

      <label className="font-medium">
        {label}
      </label>

      <input
        type="file"
        accept={accept}
        onChange={handleUpload}
        className="file-input file-input-bordered w-full"
      />

      {uploading && (
        <span className="loading loading-spinner loading-md"></span>
      )}

      {preview && previewUrl && (
        <Image
          src={previewUrl}
          alt="Preview"
          width={180}
          height={180}
          className="rounded-lg border object-cover"
        />
      )}

      {!preview && fileName && (
        <div className="alert alert-success">
          <span>{fileName}</span>
        </div>
      )}
    </div>
  );
}