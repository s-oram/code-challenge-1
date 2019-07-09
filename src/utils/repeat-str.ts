
// Returns a string with `value` repeated `count` number of times.
// Source: https://stackoverflow.com/a/35635633/395461
export const repeatStr = (value: string, count: number): string => {
    const array: string[] = [];
    for (let index = 0; index < count; index++) {
        array[index] = value;
    }
    return array.join('');
};
