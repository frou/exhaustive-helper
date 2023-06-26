`exhaustive` is a function to help statically check that you explicitly handle all possible values.

See its [documentation](https://deno.land/x/exhaustive/mod.ts?s=exhaustive) for a longer explanation.

TypeScript's `never` type is the novel thing that makes this work.

---

We could copy+paste this function into a "utils" junk-drawer in each project, but why not define it centrally and reuse it?

As such, it is available from the Deno third-party module registry:

```ts
import exhaustive from "https://deno.land/x/exhaustive/mod.ts"
```

[![badge](https://shield.deno.dev/x/exhaustive)](https://deno.land/x/exhaustive)
