var{n:i,e:s}=await import("data:application/javascript,function n(o){return globalThis[o]}function e(o,l){globalThis[o]=l}export{n,e};");function b(o){return i(o)}function f(o,e){s(o,e)}function d(o){return globalThis[o]}function K(o,e){globalThis[o]=e}function h(o,e){let n=d(o),l=e(n,"node");K(o,l);let t=b(o);if(t!==l){let a=e(t,"deno");f(o,a)}}export{h as patchGlobal,b as readDenoGlobal,d as readNodeGlobal,f as writeDenoGlobal,K as writeNodeGlobal};