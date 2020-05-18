

# Tutorial

## Dev-Setup with WebPack + Typescript

Knowledge sources
* https://webpack.js.org/guides/getting-started/
* https://webpack.js.org/configuration/dev-server/
* https://webpack.js.org/guides/typescript/
* https://webpack.js.org/concepts/
* https://webpack.js.org/api/module-methods/
* https://decembersoft.com/posts/say-goodbye-to-relative-paths-in-typescript-imports/

Init project & install webpack dependencies

```bash
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

Install typescript + loader (plugin for compiling ts in webpack)

```bash
npm install typescript ts-loader --save-dev
```

:bulb: Rule of thumb: `--save` if this dependency should be bundles, `--save-dev` if you need for development (linter, packer, compiler...)

inital example folder structure (add `src` folder and `index.html/js`):

```diff
  webpack-demo
  |- package.json
+ |- index.html
+ |- /src
+   |- index.js
```

`index.html`

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello</title>
  </head>
  <body>
    <div>Hello World</div>
    <script src="main.js"></script>
  </body>
</html>
```

`index.js`

```javascript
console.log('Hello from script');
```

place webpack configuration file `webpack.config.js` in root folder (beside `package.json`)

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

add a build step to the npm scripts section

```json
 "scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "webpack"
 },
```

while you are there, remove the `main` parameter and add `"private": true` to the topmost configuration section (prevents accidental publishing)

```bash
npm run build
```

this results in creation of a `dist` folder that contains `main.js`, yeah... your first bundle. Move `index.html` into the dist folder so you can directly reference it without the dist folder structure

```diff
  webpack-demo
  |- package.json
+ |- /dist
+   |- main.js
+   |- index.html
- |- index.html
  |- /src
    |- index.js
```

install the webpack dev web server, add its configuration to `webpack.config.js` and add a `start` script (that triggers the build and then starts the live server):

```bash
npm install webpack-dev-server --save-dev
```

```json
const path = require('path');

module.exports = {
...
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    compress: true,
    port: 9000
  }
...
};
```

```json
...  
"start": "webpack && webpack-dev-server --open"
...
```

when running `npm run start`, a browser opens that will be reloaded, every time you change something in the .js / .html files

For typescript, add a `tsconfig.json` file to the root folder

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true
  }
}
```

extend and change `webpack.config.js` to use a .ts file as entry point and load all .ts files through the ts-loader plugin. With following configuration, webpack applies the ts-loader to any .ts file it comes across while parsing along the require / import statements: 

```js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  ...
};
```

Now you can use Typescript! 

```diff
  webpack-demo
  |- package.json
  |- /dist
    |- main.js
    |- index.html
  |- /src
-   |- index.js
+   |- index.ts
```

In order to improve debugging, configure ts to create a sourcemap and webpack to provide it with the bundle:

`tsconfig.json`

```json
{
  "compilerOptions": {
    ...
    "sourceMap": true
  }
}
```

`webpack.config.js`

```javascript

module.exports = {
  ...
  devtool: 'inline-source-map',
  ...
};
```

Modules: webpack supports ES6 module syntax natively (`import MyModule fron './my-module.ts'`). Add a new file

```diff
  webpack-demo
  |- package.json
  |- /dist
    |- main.js
    |- index.html
  |- /src
    |- index.ts
+   |- myModule.ts    
```

Add the following content (a simple class in typescript):

```typescript
export class MyClass {
  constructor(private name: string) {}
  public greet() {
    console.log('Hello, my name is ' + this.name);
  }
}
```

Import and use the class in `index.ts`

```diff
+ import { MyClass } from './myModule';
  console.log('Hello from script');
+ const c = new MyClass('Bob');
+ c.greet();
```

If you want simpler include paths (so no more ../../../something), extend your `tsconfig.json`

```json
"baseUrl": "src",
"paths": {
    "_something/*": [ "app/stuff/other-stuff/something/*" ],
    ...
}
```

:bulb: You could use '_' to make clear, that this a path mapping and not an actual path. Typically you would use '@', but this does not work with the alias configuration of `webpack` (see below).

Also add aliases to the `resolve` section of `webpack.config.js` file, as typescript does not translate the paths in the transpiled `.js` code:

```js
module.exports = {
    ...
    resolve: {
        ...
        alias: {
            _something: path.join(__dirname, 'src', 'app/stuff/other-stuff/something'),
        	...
        },
        ...
    },
```

