import { OptionSymbol } from './symbols'

export class Option<T> {
  // @internal
  static Some = <T>(value: T) => new Option(value)

  // @internal
  static None = <T>() => new Option<T>();

  [OptionSymbol] = this

  private constructor(private value?: T) {}

  [Symbol.toPrimitive]() {
    return this.valueOf()
  }

  toString() {
    return this.valueOf()
  }

  valueOf() {
    if (this.value) {
      return this.value.valueOf()
    }
    if (typeof this.value === 'undefined') {
      return 'undefined'
    }
    return 'null'
  }

  isSome() {
    return !!this.value
  }

  isNone() {
    return !this.value
  }

  expect(msg: string) {
    if (this.value) {
      return this.value
    }
    throw new TypeError(msg)
  }

  unwrap() {
    return this.expect('called `Option::unwrap()` on a `None` value')
  }

  unwrapOr(defaultValue: T) {
    return this.value || defaultValue
  }

  unwrapOrElse(f: () => T) {
    return this.value || f()
  }

  map<U>(f: (v: T) => U) {
    if (this.value) {
      return Some(f(this.value))
    }
    return None<U>()
  }

  mapOr<U>(defaultValue: U, f: (v: T) => U) {
    if (this.value) {
      return f(this.value)
    }
    return defaultValue
  }

  mapOrElse<U>(defaultFactory: () => U, mapFn: (value: T) => U) {
    if (this.value) {
      return mapFn(this.value)
    }
    return defaultFactory()
  }

  and<U>(optb: Option<U>) {
    if (!this.value) {
      return None<U>()
    }
    return optb
  }

  andThen<U>(then: (value: T) => Option<U>) {
    if (this.value) {
      return then(this.value)
    }
    return None<U>()
  }

  filter(predicate: (value: T) => boolean) {
    if (this.value && predicate(this.value)) {
      return this
    }
    return None<T>()
  }

  or(optb: Option<T>) {
    if (!this.value) {
      return this
    }
    return optb
  }

  orElse(f: () => Option<T>) {
    if (this.value) {
      return this
    }
    return f()
  }
}

export const Some = Option.Some

export const None = Option.None
