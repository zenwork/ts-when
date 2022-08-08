# ts-when
kotlin `when` expression implemented in typescript.

This function approximates the kotlin syntax for `when` which is a switch statement that can optionally support single value or statement evaluations in each switch. It also provides an `otherwise` function to handle the default case. 

see: https://kotlinlang.org/docs/control-flow.html#when-expression

## Usage

``` typescript
import { when, otherwise } from './when.ts'

const year = 2022

const result = when(year)(
    [2022, () => new Date().toISOString()],
    [year => year > 2022, '9999-12-31T23:59:59.999Z'],
    otherwise('1900-01-01T00:00:00.000Z')
)

console.log(result)  // 2022-07-28T05:32:29.123Z

```
