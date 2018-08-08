import express, {Request, Response, NextFunction} from 'express';
import readdir from './readdir';
import homedir from './homedir';

const port = 3000;
const app = express();

app.use(express.json());
app.use((rq: Request, rs: Response, nx: NextFunction) => {
    rs.set('Content-Type', 'application/json');
    nx();
});

app.get('/homedir', homedir);
app.get('/readdir', readdir);

app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});
