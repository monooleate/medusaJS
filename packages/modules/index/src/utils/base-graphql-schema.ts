export const baseGraphqlSchema = `
    scalar DateTime
    scalar Date
    scalar Time
    scalar JSON
    directive @enumValue(value: String) on ENUM_VALUE
`
