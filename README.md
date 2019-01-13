# rust-monads-ts
> Rust style monads in TypeScript

## Example

```ts
import { Some, Option, None, match } from 'rust-monads-ts'

function getValue(): Option<number> {
  if (random() > 0.5) {
    return Some(100)
  }
  return None<number>()
}

const result = match(getValue(), {
  Some: (value) => value,
  None: () => 1,
})

console.log(result) // 100 or 1
```

## Option
Sometimes called `Maybe` in other languages.
```ts
class Option<T> { }
```

### API lists
- `unwrap() -> T | never`
    
    `throw` when `Option<T>` is `None`, or return the `T`
- `expect(msg: string) -> T | never`
    
    `throw` msg when `Option<T>` is `None`, or return the `T`
- `unwrapOr(defaultValue: T)`

    return the `defaultValue` when `Option<T>` is `None`
