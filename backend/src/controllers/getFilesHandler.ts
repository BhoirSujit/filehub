import { Request, Response } from "express"
import fileModel from "../models/FileModel"


export default async function getFilesHandler(req: Request, res: Response) {
    let data = await fileModel.find()
    .catch(e => console.log('error while getting file'));
    console.log(data);

    res.status(200).json(data);
}