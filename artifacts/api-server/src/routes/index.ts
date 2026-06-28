import { Router, type IRouter } from "express";
import healthRouter from "./health";
import pairRouter from "./pair";

const router: IRouter = Router();

router.use(healthRouter);
router.use(pairRouter);

export default router;
