import { Router } from "express";
import { methods as workerController } from "../controllers/worker.controller";

const router =  Router();

router.get('/', workerController.getWorkers);
router.get('/:codigo', workerController.getWorker);
router.post('/', workerController.insertWorker);
router.delete('/:codigo', workerController.deleteWorker);
router.put('/:codigo', workerController.updateWorker);

export default router;
