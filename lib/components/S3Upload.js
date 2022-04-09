import { useRef, useState } from "react";
import { uploadImage } from "../s3";

export default function S3Upload({ label, onUpload, className }) {
  const [imageUploading, setImageUploading] = useState(false);

  const fileupload = useRef(null);
  return (
    <>
      {/* Because it's hard to style file inputs, we use a button input
      as a proxy and hide the actual file input: */}
      <input
        disabled={imageUploading}
        className={className}
        type="button"
        value={
          label
            ? imageUploading
              ? "Uploading Image(s)..."
              : label
            : "Upload Image(s)"
        }
        onClick={() => {
          // setImageUploading(true);
          fileupload.current.click();
        }}
      />
      <form>
        <input
          style={{ display: "none" }}
          ref={fileupload}
          type="file"
          accept="image/png, image/jpeg"
          multiple
          onChange={async (e) => {
            setImageUploading(true);

            // add each file from the Files object
            for (let i = 0; i < fileupload.current.files.length; i++) {
              const file = fileupload.current.files[i];
              let res = await uploadImage(file);
              if (res.ok) {
                onUpload(file.name.split("\\").pop());
              }
            }

            setImageUploading(false);
          }}
        />
      </form>
    </>
  );
}
