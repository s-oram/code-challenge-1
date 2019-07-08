import fs from 'fs';

export function readScriptFile(filename: string): string[] {
    const buffer = fs.readFileSync(filename);
    // Split the string using on the new line character. The regex is to support
    // both Windows and UNIX style line endings.
    // https://stackoverflow.com/a/21895354/395461
    return buffer.toString().split(/\r?\n/);
}
