/**
 * This function helps you to statically check that you explicitly handle all possible values.
 * TypeScript type-checking will fail if you don't.
 *
 * It is primarily intended to be used in a `default` case when `switch`ing
 * on a [Discriminated Union](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions):
 *
 * ```ts
 * switch (processStatus.kind) {
 *   case "Exited":
 *     return processStatus.code == 0
 *   case "Signaled":
 *     return false
 *   // Forgot to handle "Stopped"
 *   default:
 *     // TypeScript type-checking will fail with the error:
 *     // Argument of type '{ kind: "Stopped"; signum: number; }' is not assignable to parameter of type 'never'.
 *     return exhaustive(processStatus)
 * }
 * ```
 *
 * ...but is similarly useful for doing the same on an [Enum](https://www.typescriptlang.org/docs/handbook/enums.html).
 * It might sometimes be useful in other conditional code too.
 *
 * See [here](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking) for where the basic idea came from.
 */
export default function(unhandled: never): never {
  // NOTE: If this function body executes at all, something has gone wrong with the
  // user's development process, because code that fails the type-checker is somehow
  // being run anyway.

  let stringRepr: string | undefined =
    // @ts-expect-error: We're in Neverland
    unhandled?.toString()
  if (
    stringRepr === undefined ||
    // The object lacks a meaningful toString() or Symbol.toStringTag
    stringRepr === "[object Object]"
  ) {
    try {
      stringRepr = JSON.stringify(unhandled)
    } catch (e) {
      stringRepr = `${stringRepr} (${e})`
    }
  }

  throw new Error(
    `Static type-checking should have made it impossible to end up on this code path at runtime (see here https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking for an explanation). The value that has somehow slipped through is: ${stringRepr}`
  )
}
