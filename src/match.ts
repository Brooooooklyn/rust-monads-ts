import { Option } from './option'
import { OptionSymbol } from './symbols'

interface OptionMatcher<T, U> {
  Some: (value: T) => U
  None: () => U
}

export function match<T, U>(monad: Option<T>, matcher: OptionMatcher<T, U>): U

export function match<T, U>(monad: Option<T>, matcher: OptionMatcher<T, U>) {
  if (monad[OptionSymbol]) {
    return optionMatch(monad, matcher)
  }
  throw new TypeError('Unsupport monad type')
}

function optionMatch<T, U>(option: Option<T>, matcher: OptionMatcher<T, U>) {
  if (option.isSome()) {
    return matcher.Some(option.unwrap())
  }
  return matcher.None()
}
