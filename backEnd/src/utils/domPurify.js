import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
console.log(window);
const purify = DOMPurify(window);

export const sanitizeContent = (htmlContent) => {
  console.log("htmlContent", htmlContent);

  const sanitizedContent = purify.sanitize(htmlContent, {
    ALLOWED_TAGS: [
      "b",
      "i",
      "u",
      "em",
      "strong",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "a",
      "ul",
      "ol",
      "li",
      "blockquote",
      "code",
      "pre",
      "img",
      "br",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "style", "class"],
  });
  console.log("sanitized content is", sanitizedContent);

  return sanitizedContent;
};
