Pacman Simulator
================

This repository contains my answer to the coding challenge detailed
in `PROBLEM.md`.

The examples listed in the problem document have been extracted to:

* ./pacman-scripts/Example-A.txt
* ./pacman-scripts/Example-B.txt
* ./pacman-scripts/Example-C.txt

The examples can be executed by running:

1. `npm install`
2. `npm test`

The examples are executed by the test cases in `./src/app.spec.ts`.

Additional examples can be added to the `robot-scripts` directory. When doing so
the `./src/app.spec.ts` file will need to be updated to execute the additional
examples.


About the Solution
------------------

The solution assumes it is a module to be used in another application. As such
it doesn't provide a user interface.


#### Script Extension: Comments

Pacman Simulator scripts can contain comments. Lines beginning with a double
forward slash `//` will be interpreted as a comment and ignored.


#### Script Errors

The Pacman Simulator will not run scripts with unknown commands or syntax
errors. All errors will be reported by the application with a line number.


#### Invalid Place Commands

The Pacman Simulator will ignore any PLACE commands if the specified location
is outside the bounds of the table.


Exploring the Source
--------------------

The best place to start reading from might be the `App.executeScript()` function in
`./src/app.ts`.

The `executeScript()` function:
1. Reads the script.
2. Parses the script into an array of statements.
3. Checks for errors, returning a error message if found.
4. Processes the script, returning when a `REPORT` command is encountered.
