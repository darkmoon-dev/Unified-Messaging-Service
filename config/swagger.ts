import path from "node:path";
import url from "node:url";
import fs from "node:fs";
import env from "#start/env";

const direname = path.dirname(url.fileURLToPath(import.meta.url))

const data  = JSON.parse(fs.readFileSync(path.resolve(direname, '..', 'package.json'), 'utf-8'));

const info = {
    title: env.get('APP_NAME').replaceAll('_', ' '),
    version: data.version,
    description: env.get('APP_NAME'),
}


export default {
    path: direname + "/../",
    ...info,
    tagIndex: 1,

    info,

    snakeCase: true,

    debug: false,
    ignore: ["/", "/swagger", "/docs", "/docs/swagger"],

    preferredPutPatch: "PUT",

    common: {
        parameters: {},
        headers: {},
    },

    securitySchemes: {
        BearerAuth: {
            type: "http",
            scheme: "bearer"
        }
    },
    authMiddlewares: ["auth", "auth:api"],
    defaultSecurityScheme: "BearerAuth",

    persistAuthorization: true,
    showFullPath: false, 
}