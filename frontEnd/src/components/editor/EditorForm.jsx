import React, { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateDraft } from "../../redux/feature/draftSlice";
import { debounce } from "lodash";
import { BannerUpload, Editor } from "./index";
import { TextAreaBox, Button, AnimationWrapper } from "../common";
import { useNavigate } from "react-router-dom";

const BlogForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const draft = useSelector((state) => state.draft);
  const { control, handleSubmit, register, watch } = useForm({
    defaultValues: {
      title: draft.title || "",
      content: draft.content || "",
      banner: draft.banner || "",
    },
  });

  const debouncedSave = useRef(
    debounce((values) => {
      dispatch(updateDraft(values));
    }, 500)
  ).current;

  const handleBannerChange = (base64, file) => {
    dispatch(
      updateDraft({
        banner: {
          base64,
          name: file.name,
          type: file.type,
          size: file.size,
        },
      })
    );
  };

  useEffect(() => {
    const subscription = watch((formValues) => {
      debouncedSave(formValues);
    });
    return () => {
      subscription.unsubscribe();
      debouncedSave.cancel();
    };
  }, [watch, debouncedSave]);

  const onSubmit = (data) => {
    console.log("Submitted:", data);
  };

  return (
    <AnimationWrapper>
      <section className="w-full mt-6 px-4 pt-4 min-h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-5xl mx-auto flex flex-col gap-4"
        >
          {/* Banner Upload */}
          <div className="w-full rounded-xl overflow-hidden relative aspect-[3/1]">
            <BannerUpload
              control={control}
              handleBannerChange={handleBannerChange}
              name="banner"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Title Input */}
          <TextAreaBox
            placeholder="Blog Title"
            className="w-full text-[1.4rem] sm:text-[1.7rem] font-bold text-white resize-none leading-tight border border-gray-700 rounded-lg p-4 mt-3 focus:outline-none bg-customDark overflow-hidden"
            {...register("title")}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />

          {/* Content Editor */}
          <Controller
            control={control}
            name="content"
            render={({ field: { onChange, value } }) => (
              <Editor onChange={onChange} value={value || ""} />
            )}
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-2 mb-6">
            <Button
              type="button"
              className="btn-primary px-5 py-2 rounded-full capitalize whitespace-nowrap transition-all"
              onClick={() => navigate("/publish")} // React Router navigation
              children={"Publish"}
            />

            <Button
              type="button"
              className="btn-secondary px-5 py-2 rounded-full capitalize whitespace-nowrap transition-all md:block"
              children={"Save Draft"}
            />
          </div>
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default React.memo(BlogForm);
