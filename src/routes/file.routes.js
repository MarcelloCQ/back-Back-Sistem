import { Router } from "express";
import { methods as fileController } from "../controllers/file.controller";

const router = Router();

router.post('/:userId', fileController.fileUpload.single('avatar'), (req, res) => {
  const userId = req.params.userId;
  fileController.helperImg(req.file.path, `${userId}`, 100)
  res.send({ data: 'Imagen cargada'})
});

router.get('/:userId',fileController.getProfilePhoto)

export default router;