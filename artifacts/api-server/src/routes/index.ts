import { Router, type IRouter } from "express";
import healthRouter from "./health";
import reservationsRouter from "./reservations";
import availabilityRouter from "./availability";
import menuRouter from "./menu";

const router: IRouter = Router();

router.use(healthRouter);
router.use(reservationsRouter);
router.use(availabilityRouter);
router.use(menuRouter);

export default router;
