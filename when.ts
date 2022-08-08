type When<TARGET> = (target: TARGET) => boolean
type Do<THEN> = () => THEN
type Statement<TARGET, THEN> = [(When<TARGET>) | TARGET, (Do<THEN> | THEN)]

function when<WHEN, THEN>(target: WHEN): (...statements: Array<Statement<WHEN, THEN>>) => THEN {
    return (...statements: Array<Statement<WHEN, THEN>>) => {
        let then: any = null

        function extracted<THEN>(getThen: (() => THEN) | THEN | (THEN & Function)) {
            then = (typeof getThen === 'function') ? (getThen as Do<THEN>)() : getThen as THEN
            return true
        }

        statements.some(statement => {
            let condition = statement[0]
            if (typeof condition === 'function') {
                if ((condition as When<WHEN>)(target)) return extracted(statement[1])
            } else {
                if (condition === target) return extracted(statement[1])
            }
            return false
        })
        if (then) return then
        throw Error('rule set does not cover all cases')
    }
}

let otherwise: <WHEN, THEN>(t: (() => THEN) | THEN) => Statement<WHEN, THEN> = (t) => [() => true, t]

// usage
let result = when(2022)(
    [2022, () => new Date().toISOString()],
    [it => it > 2022, '9999-12-31T23:59:59.999Z'],
    otherwise('1900-01-01T00:00:00.000Z')
)

console.log(result)  // 2022-07-28T05:32:29.123Z
