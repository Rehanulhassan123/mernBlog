export const baseUrl = "/api/v1";
const editorStyle = `
body {
  background-color: #181818;
  color: #f8fafc;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
}
a {
  color: #3b82f6;
  text-decoration: underline;
}
a:hover {
  color: #2563eb;
}
h1, h2, h3, h4, h5, h6 {
  color: #f8fafc;
  margin-top: 1.2em;
  margin-bottom: 0.5em;
  font-weight: 500;
}
h1 { font-size: 38px; }
h2 { font-size: 28px; }
h3 { font-size: 20px; }
h4 { font-size: 16px; }
h5 { font-size: 14px; }
h6 { font-size: 12px; }
p {
  color: #f3f3f3;
  line-height: 1.6;
  margin-bottom: 1em;
}
blockquote {
  border-left: 4px solid #3b82f6;
  padding-left: 1em;
  color: #a1a1aa;
  margin: 1em 0;
  font-style: italic;
  background-color: #1e1e1e;
}
code {
  background-color: #1e1e1e;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  color: #f8fafc;
  font-family: monospace;
}
pre {
  background-color: #1e1e1e;
  padding: 1em;
  border-radius: 6px;
  overflow-x: auto;
  color: #f8fafc;
  font-family: monospace;
}
ul, ol {
  margin: 1em 0 1em 2em;
  color: #d1d5db;
}
`;
const editorPlugins = [
  "advlist",
  "autolink",
  "lists",
  "link",
  "charmap",
  "preview",
  "anchor",
  "searchreplace",
  "visualblocks",
  "code",
  "fullscreen",
  "insertdatetime",
  "help",
  "wordcount",
];
export const editorInitialState = {
  skin: "oxide-dark",
  content_css: "dark",
  menubar: true,
  placeholder: "Start writing...",
  plugins: editorPlugins,
  toolbar:
    "undo redo | blocks fontfamily fontsize | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code fullscreen",
  fontsize_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt",
  block_formats:
    "Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6;",
  setup: (editor) => {
    editor.on("init", () => {
      editor.getBody().setAttribute("data-placeholder", "Start writing...");
    });
  },
  content_style: editorStyle,
};
