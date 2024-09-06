// @ts-ignore
const { n, e } = await import('data:application/javascript,function n(o){return globalThis[o]}function e(o,l){globalThis[o]=l}export{n,e};')

function readDenoGlobal<K extends keyof typeof globalThis>(key: K): (typeof globalThis)[K] {
  return n(key)
}

function writeDenoGlobal<K extends keyof typeof globalThis>(key: K, value: (typeof globalThis)[K]): void {
  e(key, value)
}

function readNodeGlobal<K extends keyof typeof globalThis>(key: K): (typeof globalThis)[K] {
  return globalThis[key]
}

function writeNodeGlobal<K extends keyof typeof globalThis>(key: K, value: (typeof globalThis)[K]): void {
  globalThis[key] = value
}

function patchGlobal<K extends keyof typeof globalThis>(
  key: K,
  patch: (value: (typeof globalThis)[K], env: 'node' | 'deno') => (typeof globalThis)[K]
): void {
  //

  const nodeGlobal = readNodeGlobal(key)
  const patchedNodeGlobal = patch(nodeGlobal, 'node')
  writeNodeGlobal(key, patchedNodeGlobal)

  const denoGlobal = readDenoGlobal(key)
  if (denoGlobal !== patchedNodeGlobal) {
    const patchedDenoGlobal = patch(denoGlobal, 'deno')
    writeDenoGlobal(key, patchedDenoGlobal)
  }
}

export { readDenoGlobal, writeDenoGlobal, readNodeGlobal, writeNodeGlobal, patchGlobal }
