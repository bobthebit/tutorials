# Tutorial

## Testing in Node.js with Mocha

Knowledge sources
* https://42coders.com/testing-typescript-with-mocha-and-chai/

This tutorial assumes, you have already set up a dev environment that supports Typescript in Node.js. [see: `nodejs_websockets_typescript.md` in this line of tutorials]

Install mocha (test framework) and chai (assertion library)

```bash
npm i chai mocha @types/chai @types/mocha -D
```

Add a test script to the scripts section of `package.json`:

```json
"scripts": {
...
  "test": "mocha -r tsconfig-paths/register -r ts-node/register tests/**/*.spec.ts"
...
},
```

This configuration assumes, that you place your tests in a separate `tests` folder that lies beside `src`. Make sure, you add this folder in the include section of `tsconfig.json`:

```diff
    "include": [
        "src/**/*.ts",
+       "tests/**/*.ts"        
	],
```

I suggest you make use of path aliases, to make file includes in your tests easier (see `nodejs_websockets_typescript.md`)

Example test (this assumes there is a `testTheTest` module somewhere, I used a path alias in this example):

```typescript
import { add } from '@sandbox/testTheTest'
import { expect } from 'chai';
import 'mocha';
 
describe('First test', () => {
 
  it('should return true', () => {
    const result = add(1,2);
    expect(result).to.equal(3);
  });
 
});

```

We use mocha as test framework (e.g. test definition etc.) and chai as assertion library (e.g. expect, ...).

To run the test:

```bash
npm run test
```

