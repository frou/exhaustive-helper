/**
 * Helps you to statically check that you explicitly handle all possible values.
 * TypeScript type-checking will fail if you don't.
 *
 * This function is primarily intended to be used in a `default` case when `switch`ing
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
 * ...but is similarly useful when dealing with an [Enum](https://www.typescriptlang.org/docs/handbook/enums.html).
 * More generally, it can sometimes be useful in other conditional code.
 *
 * See [here](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking) for where the basic idea came from.
 */
export default function(unhandled: never): never {
  // @ts-expect-error: We're in Neverland if this function body executes.
  let stringRepr: string = unhandled.toString()
  if (stringRepr == "[object Object]") {
    // Try to get to a more actionable representation to include in the error message.
    try {
      stringRepr = JSON.stringify(unhandled)
    } // deno-lint-ignore no-empty
    catch {}
  }

  throw new Error(
    `Static type-checking should have made it impossible to end up on this code path at runtime (see here https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking for an explanation). The value that has somehow slipped through is: ${stringRepr}`
  )
}
