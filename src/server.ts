import express, { NextFunction, Request, Response } from 'express'
import "express-async-errors"
import mainRoutes from './routes/index'
import firebase from 'firebase-admin'
import * as serviceAccount from './server_key.json';
import { BadRequestError, UnathorizedError } from './utils/custom_error';
import { response } from './utils/response';

const app = express();

app.use(express.json());

const PORT = 5050;

const params = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
}

firebase.initializeApp({
    credential: firebase.credential.cert(params)
})

app.use(mainRoutes);

app.use('/', (req: Request, res: Response) => {
    res.json('Firebase Propx test').status(200);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof BadRequestError || err instanceof UnathorizedError) {
        res.status(err.statusCode).send(response(false, err.message));
    } 
    res.status(500).send(response(false, 'An error occur'));
});

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
});