import { Router } from "express";
import {uploadFileHandler, upload} from "../controllers/uploadFileHandler";
import getFilesHandler from "../controllers/getFilesHandler";
import dowloadFileHandler from "../controllers/downloadFileHandler";

const fileRouter = Router();

fileRouter.get('/',getFilesHandler);
fileRouter.get('/download/:filename', dowloadFileHandler);
fileRouter.post('/upload',upload.single('file'), uploadFileHandler);


export default fileRouter;