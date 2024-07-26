### 1.0.5 delete types: lib in package.json

### 1.0.4 Fix build for browser
- Fix build for browser.
- Add `package.json` to `.npmignore`.

### 1.0.3 Add .npmignore

### 1.0.2 Add MIT licence

### 1.0.1 Update package.json for npm documentation"

### 1.0.0 Initial release
- Add a new file `validations.ts` to contain functions for validating RUT (Rol Único Tributario):
    - `calculateDv`: Calculates the verification digit of a Chilean RUT (Rol Único Tributario).
    - `isValidRut`: Validates if a Chilean RUT (Rol Único Tributario) is valid.
    - Add `isFormat` object with functions to validate the format of the RUT (Rol Único Tributario):
        - `isFormat.dot`: Checks if a Chilean RUT has the correct format with dots and optional dash.
        - `isFormat.dash`: Checks if a Chilean RUT has the correct format with dash at the end.
        - `isFormat.dotDash`: Checks if a Chilean RUT has the correct format with dots and dash, regardless of their order.

- Add `format` object with functions for RUT formatting, located within the `format.ts` file:
    - `format.dot`: Function to format a RUT by adding dots.
    - `format.dash`: Function to format a RUT by adding a dash.
    - `format.dotDash`: Function to format a RUT by adding dots and a dash.
    - `format.notDot`: Function to remove dots from a RUT.
    - `format.notDash`: Function to remove the dash from a RUT.
    - `format.notDotDash`: Function to remove dots and the dash from a RUT.
- Add Utils:
    - `formatValidations`: Basic validations of the format of a Chilean RUT (Rol Único Tributario).
    - `isValidFormatWithOutDash`: Validates the format of a Chilean RUT (Rol Único Tributario).
- Add test:
    - Validations:
        - `calculateDv`
        - `isValidRut`
        - `isFormat`:
            - `isFormat.dot`
            - `isFormat.dash`
            - `isFormat.dotDash`
    - `format`:
        - `format.dot`
        - `format.dash`
        - `format.dotDash`
        - `format.notDot`
        - `format.notDash`
        - `format.notDotDash`
    - `Utils`:
        - `formatValidations`
        - `isValidFormatWithOutDash`
- Add config files and base files:
    - `package.json`
    - `.gitignore`
    - `changelog.md`
    - `jest-config.js`
    - `tsconfig.json`
    - `tsconfig.browser`
    - `README.md`
- Add npm scripts in `package.json`:
    - `test:unit`: Runs unit tests using Jest.
    - `test:coverage`: Runs Jest to generate a test coverage report, collecting coverage from all TypeScript files in the src directory.
    - `test:lint`: Runs ESLint to automatically fix linting issues in the codebase.
    - `test`: Runs unit tests, generates a coverage report, and fixes linting issues by running the test:unit, test:coverage, and test:lint scripts in parallel.
    - `build-browser`: Compiles TypeScript code for the browser, outputting to the dist-browser directory, using ES6 modules and the es2015 and dom libraries.
    - `build-node`: Compiles TypeScript code for Node.js, outputting to the dist-node directory, using the es2015 library.
    - `build`: Runs both build-browser and build-node scripts in parallel to compile the TypeScript code for both browser and Node.js environments.
- Add dev dependencies:
    - `typescript: ^5.5.4`
    - `eslint: ^8.57.0`
    - `@eslint/js: ^9.7.0`
    - `typescript-eslint: ^7.17.0`
    - `jest: ^29.7.0`
    - `ts-jest: ^29.2.3`
    - `coverage: ^0.4.1`
    - `globals: ^15.8.0`