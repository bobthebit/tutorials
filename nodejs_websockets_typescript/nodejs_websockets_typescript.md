# Tutorial

## Setup Node.js with Websockets and Typescript

Knowledge sources

* https://levelup.gitconnected.com/getting-started-with-node-js-and-websockets-f22dd0452105
* https://medium.com/create-a-server-with-nodemon-express-typescript/create-a-server-with-nodemon-express-typescript-f7c88fb5ee71
* https://medium.com/factory-mind/websocket-node-js-express-step-by-step-using-typescript-725114ad5fe4

Create a folder, navigate there. Then init project & install ws (Websockets) library:

```bash
npm init -y
npm i ws --save
```

Install typescript and typing for ws as well as ts-node, which allows us to directly run typescript code with node.js (and save it as dev dependency `-D`):

```bash
npm i typescript @types/ws ts-node -D
```

For convience, install `nodemon`, which enables automatic restart of a node application if files change:

```bash
npm i nodemon -D
```

add a minimal typescript configuration file `tsconfig.json`:

```json
{
    "compilerOptions": {
        "target": "es6",
        "module": "es5",
        "outDir": "./dist/server",
        "strict": true,
        "sourceMap": true,
        "typeRoots": [
            "node_modules/@types"
        ]
    },
    "include": [
		"src/**/*.ts"
	],
    "exclude": [
        "dist",
        "node_modules",
        ".vscode"
    ]
}
```

create a file `src/server.ts:`

```typescript
import * as WebSocket from 'ws';

// express code 
const socketServer = new WebSocket.Server({port: 3030});
socketServer.on('connection', (socketClient) => {
  console.log('connected');
  console.log('Number of clients: ', socketServer.clients.size);
  socketClient.on('close', (socketClient) => {
    console.log('closed');
    console.log('Number of clients: ', socketServer.clients.size);
  });
});
```

add start and build scripts to `package.json`.

- `start` will run node.js with an inspection port for debugging and will use `ts-node` to enable running typescript code from node.js 
- `start:watch` will run start through `nodemon`, thus restarting the app if files change. In order for this to work, we will also add an `nodemon` configuration (see below).
- `build` will build a distributable :construction:

```json
{
...
  "scripts": {
    "start": "node --inspect=5858 -r ts-node/register ./src/server.ts",
    "start:watch": "nodemon",
    "build": "tsc"
  },
...
}
```

add `nodemon.json` configuration file. Using this, `nodemon` will watch for changes in the src folder and runs the npm start script:

```json
{
	"ignore": [
		"**/*.test.ts",
		"**/*.spec.ts",
		".git",
		"node_modules"
	],
	"watch": [
		"src"
	],
	"exec": "npm start",
	"ext": "ts"
}
```

You can now run your server (e.g. with `npm run start:watch` if you want to reload the application if files change). A quick way to test the server, without implementing client code, is using a chrome extension. You could use WebSocket King, which allows to start multiple websocket clients. If you connect to `ws://127.0.0.1:3030`, you will a console output that shows the number of connected clients.