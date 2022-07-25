import express from 'express';
import { router } from '.';

const app = express();

app.use(express.json());
app.use(router)

export { app }