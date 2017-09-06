import { sequenceEqual } from 'rxjs/operator/sequenceEqual'
import { ActionsObservable } from 'redux-observable'

export default (epic, condition$, expect$, assert, done, store) => {
  const inputAction$ = new ActionsObservable(condition$)
  epic(inputAction$, store)
    ::sequenceEqual(expect$, (a, b) => {
      const equal = assert(a, b)
      if (equal !== undefined) return equal
      return true
    })
    .subscribe(done())
}
