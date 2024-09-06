# `@brc-dd/globals`

Deno has segregated Node.js global objects from the Deno ones ([denoland/deno#19307](https://github.com/denoland/deno/pull/19307)), which
makes it difficult to patch Node.js global objects from Deno. This module provides
[a workaround](https://github.com/denoland/deno/issues/20826#issuecomment-1752701765) to access and modify Node.js global objects from Deno.

## Usage

Unified API for both Node.js and Deno packages:

```ts
import { patchGlobal } from 'npm:@brc-dd/globals'
import { log } from 'npm:@brc-dd/console-error@0.0.2' // just for testing

patchGlobal('console', (console, env) => {
  const originalError = console.error
  console.error = function (...args) {
    originalError.call(console, `[${env}]`, ...args)
  }
  return console
})

/*

Proxies also work:

patchGlobal('console', (console, env) => new Proxy(console, {
  get(target, prop, receiver) {
    if (prop === 'error') {
      return function (...args) {
        target.error(`[${env}]`, ...args)
      }
    }
    return Reflect.get(target, prop, receiver)
  }
}))

*/

log() // should log '[node] error from npm:@brc-dd/console-error'
console.error('test') // should log '[<node|deno>] test' (depending on the environment)
```

There are also fine-grained functions to read and write global objects:

```ts
import {
  readDenoGlobal, // will be same as Node.js global in Node.js
  writeDenoGlobal, // will be same as Node.js global in Node.js
  readNodeGlobal,
  writeNodeGlobal
} from '@brc-dd/globals'
```
