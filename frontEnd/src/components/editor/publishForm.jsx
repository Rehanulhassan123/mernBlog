import React, { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { updateDraft } from "../../redux/feature/draftSlice";
import { Button, TextAreaBox, InputBox, AnimationWrapper } from "../common";
import { debounce } from "lodash";

const PublishForm = React.memo(() => {
  const dispatch = useDispatch();
  const draft = useSelector((state) => state.draft);
  const [preview, setPreview] = useState(draft.description || "");
  const [titlePreview, setTitlePreview] = useState(draft.title || "");
  const [charRemaining, setCharRemaining] = useState(
    200 - (draft.description?.length || 0)
  );
  const [tagRemaining, setTagRemaining] = useState(
    10 - (draft.tags?.filter((t) => t.trim()).length || 0)
  );

  const processTags = useCallback((tagString) => {
    return tagString
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);
  }, []);

  const { handleSubmit, register, watch, setValue } = useForm({
    defaultValues: {
      title: draft.title || "",
      description: draft.description || "",
      tags: draft.tags || "",
      banner: draft.banner || null,
    },
  });

  const handleTagsChange = useCallback(
    (e) => {
      const inputValue = e.target.value;
      const tags = processTags(inputValue);

      if (tags.length > 10) {
        const limitedValue = tags.slice(0, 10).join(",");
        setValue("tags", limitedValue, { shouldValidate: true });
        setTagRemaining(0);
        return;
      }
      setValue("tags", inputValue, { shouldValidate: true });
      setTagRemaining(10 - tags.length);
    },
    [processTags, setValue]
  );

  const debouncedSave = useCallback(
    debounce((values) => {
      const processedTags = processTags(values.tags).slice(0, 10); // Enforce limit here
      dispatch(
        updateDraft({
          ...values,
          tags: processedTags,
        })
      );
    }, 500),
    [dispatch, processTags]
  );
  useEffect(() => {
    const subscription = watch((values, { name }) => {
      if (name === "title") setTitlePreview(values.title);
      debouncedSave(values);
    });
    return () => {
      subscription.unsubscribe();
      debouncedSave.cancel();
    };
  }, [watch]);
  const submit = (data) => {
    console.log("Submitted:", data);
    console.log("draft", draft.content);
  };

  return (
    <AnimationWrapper>
      <div className="w-full px-4 py-8 bg-[var(--bg-color)]">
        <form onSubmit={handleSubmit(submit)} className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Preview Column  */}
            <div className="lg:w-1/2">
              <h2 className="text-lg font-medium mb-6 text-[var(--color-text-primary)]">
                Preview
              </h2>
              <div className="border border-[var(--color-border)] p-6 rounded-lg bg-[var(--color-primary)]">
                {draft.banner?.base64 && (
                  <img
                    src={draft.banner.base64}
                    alt="Post banner"
                    className="w-full h-64 object-contain rounded-lg mb-4"
                  />
                )}
                <h3 className="title-preview text-xl font-bold mb-3 break-words text-[var(--color-main-heading)]">
                  {titlePreview ? titlePreview : "Your post title"}
                </h3>
                <p className="desc-preview text-[var(--color-paragraph)] break-words whitespace-pre-wrap">
                  {preview ? preview : "Your post description"}
                </p>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:w-1/2 space-y-6">
              <InputBox
                {...register("title", { required: true })}
                placeholder="Title *"
                className="w-full bg-[var(--color-input-bg)] rounded px-4 py-3 text-lg text-[var(--color-input-text)] placeholder-[var(--color-input-placeholder)]"
              />

              <div>
                <TextAreaBox
                  className="w-full bg-[var(--color-input-bg)] rounded px-4 py-2 min-h-[120px] text-[var(--color-input-text)] placeholder-[var(--color-input-placeholder)]"
                  {...register("description", {
                    onChange: (e) => {
                      const val = e.target.value;
                      const truncated =
                        val.length > 200 ? val.substring(0, 200) : val;
                      setValue("description", truncated);
                      setPreview(truncated);
                      setCharRemaining(200 - truncated.length);
                    },
                  })}
                />
                <div
                  className={`text-xs mt-1 ${
                    charRemaining === 0
                      ? "text-[var(--validation-error)]"
                      : "text-[var(--color-text-secondary)]"
                  }`}
                >
                  {charRemaining} characters remaining
                </div>
              </div>

              <div className="space-y-1">
                <InputBox
                  {...register("tags")}
                  onChange={handleTagsChange}
                  placeholder="Tags (comma separated, max 10)"
                  className="w-full bg-[var(--color-input-bg)] rounded px-4 py-2 text-[var(--color-input-text)] placeholder-[var(--color-input-placeholder)]"
                />
                <div
                  className={`text-xs ${
                    tagRemaining === 0
                      ? "text-[var(--validation-error)]"
                      : "text-[var(--color-text-secondary)]"
                  }`}
                >
                  {tagRemaining} tags remaining
                </div>
              </div>

              <Button
                type="submit"
                className="btn-primary px-5 py-2 rounded-full capitalize whitespace-nowrap transition-all w-full"
                children={"  Publish Now"}
              />
            </div>
          </div>
        </form>
      </div>
    </AnimationWrapper>
  );
});

export default PublishForm;
