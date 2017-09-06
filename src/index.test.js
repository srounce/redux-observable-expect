import 'rxjs/add/operator/mergeMap'
import { of } from 'rxjs/observable/of'
import expectEpic from '.'

const { round, random } = Math
const mockStore = state => ({ getState: () => state })

describe('expectEpic(epic, condition$, expect$, assert, done, store)', () => {
  const simpleEpic = action$ => action$
    .ofType(1)
    .mergeMap(() => of(
      { type: 2 },
      { type: 3 }
    ))

  const storeEpic = (action$, store) => action$
    .ofType(1)
    .mergeMap(() => of(
      { type: 2 * store.getState() },
      { type: 3 * store.getState() }
    ))

  let store

  beforeEach(() => {
    store = mockStore(round(random() * 20))
  })

  it('compares the observable `$expect` with the observable returned by `epic` using the function `assert`', done => expectEpic(
    simpleEpic,
    of({ type: 1 }),
    of(
      { type: 2 },
      { type: 3 }
    ),
    (a, b) => expect(a).toEqual(b),
    done
  ))

  it('passes the provided store to the epic', done => expectEpic(
    storeEpic,
    of({ type: 1 }),
    of(
      { type: 2 * store.getState() },
      { type: 3 * store.getState() }
    ),
    (a, b) => expect(a).toEqual(b),
    done,
    store
  ))

  it('throws an AssertionError when provided `expect$` observable does not match the contents of the observable returned by epic', done => {
    expect(() => {
      expectEpic(
        storeEpic,
        of({ type: 1 }),
        of(
          { type: 2 * store.getState() + 1 },
          { type: 3 * store.getState() }
        ),
        (a, b) => expect(a).toEqual(b),
        done,
        store
      )
    }).toThrow(jest.AssertionError)
  })
})
