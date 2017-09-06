# redux-observable-expect
Test redux-observable epics with ease.

## Problem
> "I've written unit tests for my redux-observable epic(s) and have a lot of
> test boilerplate. How can I reduce this barrier-to-test?"

## API
```javascript
expectEpic(
  epic: (action$: Observable<any>, store: ReduxStore) => Observable<any>,
  condition$: Observable,
  expect$: Observable,
  assert: (a: any, b: any) => ?boolean,
  done: () => ?any,
  store: ReduxStore
)
```

* **epic:** The redux-observable 'epic' function you would like to test.
* **condition$:** The input actions for the test case.
* **expect$:** The stream of actions to be compared with the stream returned 
from **epic**.
* **assert:** A function which compares actions from the **epic** with the 
contents of **expect$**
* **done:** Completion callback (usually provided by your test runner).
* **store:** _(Optional)_ A redux store, will be needed if your epic consumes 
data from the store.

## Example
```javascript
import expectEpic from 'redux-observable-expect'

expectEpic(
  myAwesomeEpic
  of({ type: TRIGGER_TYPE }),
  of(
    { type: EXPECTED_TYPE },
    { type: ANOTHER_EXPECTED_TYPE }
    ),
  (a, b) => expect(a).toEqual(b),
  done
)
```

## Contributing
This project uses JS standard style.

Add stuff, write tests, make tests & linting pass, send a PR.
