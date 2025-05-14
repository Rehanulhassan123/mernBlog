import { useRef } from "react";
import { Controller } from "react-hook-form";
import { InputBox } from "../common";

const BannerUpload = ({
  control,
  name,
  className = "",
  handleBannerChange,
}) => {
  const fileRef = useRef(null);

  const handleFileChange = (e, onChange) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      handleBannerChange(reader.result, file);
      onChange({
        name: file.name,
        type: file.type,
        size: file.size,
        base64: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <div className="relative w-full h-full">
            <InputBox
              type="file"
              accept="image/*"
              ref={fileRef}
              className="hidden"
              onChange={(e) => handleFileChange(e, onChange)}
            />
            <img
              src={(value && value.base64) || "/imgs/banner.jpg"}
              alt="Banner"
              className={`w-full h-full rounded-xl cursor-pointer ${className}`}
              onClick={() => fileRef.current.click()}
              onError={(e) => {
                e.target.src = "/imgs/banner.jpg";
              }}
            />
            {error && (
              <p className="absolute bottom-2 left-2 text-[var(--validation-error)] text-sm bg-black/60 px-2 rounded">
                {error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default BannerUpload;
