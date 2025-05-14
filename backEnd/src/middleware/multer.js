import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    console.log(file);
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log("i am in multer js");

    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});

export const fileFilter = (req, file, cb) => {
  const allowedMimes = ["image/jpg", "image/jpeg", "image/png", "image/bmp"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 },
});
