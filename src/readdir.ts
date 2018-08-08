import fs from 'fs';
import joi from 'joi';
import {Request, Response, NextFunction} from 'express';

export default function (rq: Request, rs: Response, nx: NextFunction) {
    const schema = {
        dirPath: joi.string().required(),
        hiddenFiles: joi.bool().default(true),
    };
    const {error, value} = joi.validate(rq.query, schema);

    if (error) {
        rs.status(400).json(error);
        return;
    }

    const dirPath: string = value.dirPath;
    const hiddenFiles: boolean = value.hiddenFiles;
    let files: string[] = [];

    if (!fs.existsSync(dirPath)) {
        rs.status(404).end();
        return;
    }

    try {
        files = fs.readdirSync(dirPath);
    }
    catch (e) {
        rs.status(400).json(e);
        return;
    }

    if (!hiddenFiles) {
        files = files.filter((file) => !file.startsWith('.'));
    }

    rs.json(files);
};
