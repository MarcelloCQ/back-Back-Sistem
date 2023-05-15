import multer from 'multer'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const helperImg = (filePath, fileName, size = 300) => {
  const ext = path.extname(filePath);
  return sharp(filePath).resize(size).toFile(`./src/optimize/${fileName}${ext}`)
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploads')
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `${Date.now()}-user.${ext}`)
  }
});

const fileUpload = multer({ storage });

const getProfilePhoto = (req, res) => {
  const { userId } = req.params;
  const imageUrl = `http://localhost:4000/optimize/${userId}.jpg`;
  res.send({ imageUrl });
};

export const methods = {
  fileUpload,
  helperImg,
  getProfilePhoto
};