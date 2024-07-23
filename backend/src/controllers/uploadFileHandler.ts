import { Request, Response } from "express"
import multer from "multer";
import path from "path";
import fileModel from "../models/FileModel";
import thumbsupply from "thumbsupply";

const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
// Set the path to the ffmpeg executable
ffmpeg.setFfmpegPath(ffmpegPath);

// If you also need ffprobe, use ffprobe-static
const ffprobePath = require('ffprobe-static').path;
ffmpeg.setFfprobePath(ffprobePath);


const uploadfolderpath = path.join(__dirname, '../../public/files');

const storage = multer.diskStorage({
    destination: (req, file, next) => {
        return next(null, uploadfolderpath);
    },
    filename: (req, file, callback) => {

        return callback(null, `${Date.now()}-${file.originalname}`);
        
    }
});

async function createThumbnail(filename1 : string | undefined, cb: { (f: string): void }) {
    let filename = String(filename1);
    const filepath: string = uploadfolderpath.concat('\\',filename);
    const thumbpath: string = uploadfolderpath.concat('\\thumb\\', filename,'.png')
    console.log(`${filepath} trying to save to ${thumbpath}`)

    await thumbsupply.generateThumbnail(filepath, {
        size: thumbsupply.ThumbSize.MEDIUM, // or ThumbSize.LARGE
        timestamp: "10%", // or `30` for 30 seconds
        forceCreate: true,
        cacheDir: "public/files/thumb",
        mimetype: "video/mp4"
    })
    .then((thumbnail) => {
        console.log(`${filepath} saved to ${path.parse(thumbnail).base}`);
        cb(path.parse(thumbnail).base);
    })
    .catch((err? : any) => console.error(err));
    
}

export const upload = multer({storage: storage});

export const uploadFileHandler = async (req: Request, res: Response) => {
    
    let thumb : string =  '';
    await createThumbnail(req.file?.filename, (f: string) => {
        console.log('file we got is : ', f);
        thumb = f;
    })

    await fileModel.create({
        name: req.file?.filename,
        size: req.file?.size,
        thumbnail: thumb? thumb : 'none'
    })
    .catch(e => {console.log('file upload error : ', e)})
    .then(() => console.log("file uploaded with name" + req.file?.filename));
   
    res.status(201).json({status: 'sucess'});
}