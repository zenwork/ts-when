# ts-when
kotlin-style when implemented in typescript

This function approximates the kotlin syntax for `when` which is a switch statement that can optionally support statement evaluation in each switch. It also provides an `otherwise` function to handle the default case. 

see: https://kotlinlang.org/docs/control-flow.html#when-expression

## Usage

``` typescript
import { when, otherwise } from './when.ts'

let result = when(2022)(
    [2022, () => new Date().toISOString()],
    [it => it > 2022, '9999-12-31T23:59:59.999Z'],
    otherwise('1900-01-01T00:00:00.000Z')
)

console.log(result)  // 2022-07-28T05:32:29.123Z

```
