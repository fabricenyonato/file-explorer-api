import os from 'os';
import {Request, Response} from 'express';

export default function (rq: Request, rs: Response) {
    rs.json({home: os.homedir()});
};
