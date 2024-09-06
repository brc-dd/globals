declare function readDenoGlobal<K extends keyof typeof globalThis>(key: K): (typeof globalThis)[K];
declare function writeDenoGlobal<K extends keyof typeof globalThis>(key: K, value: (typeof globalThis)[K]): void;
declare function readNodeGlobal<K extends keyof typeof globalThis>(key: K): (typeof globalThis)[K];
declare function writeNodeGlobal<K extends keyof typeof globalThis>(key: K, value: (typeof globalThis)[K]): void;
declare function patchGlobal<K extends keyof typeof globalThis>(key: K, patch: (value: (typeof globalThis)[K], env: 'node' | 'deno') => (typeof globalThis)[K]): void;

export { patchGlobal, readDenoGlobal, readNodeGlobal, writeDenoGlobal, writeNodeGlobal };
