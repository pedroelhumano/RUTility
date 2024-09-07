# RUTility
## Chilean RUT Validation and Formatting Library

A library for validating and formatting the Chilean RUT (Rol Único Tributario). This library provides functions to format the RUT with dots and dashes, as well as to validate its format and check digit.

## Installation

You can install the library using npm:

```sh
npm install rutility
```

## Usage

### Import in a Node.js Project
```javascript
const { format, calculateDv, isValidRut, isFormat } = require('rutility');
```

### Import in an ES6 Module
```sh
import { format, calculateDv, isValidRut, isFormat } from 'rutility';
```

## Formatting Functions
`format.dot(rut: string): string`
Formats a RUT by adding dots.

```javascript
console.log(format.dot('12345678')); // '12.345.678'
console.log(format.dot('12345678-K')); // '12.345.678-K'
```

`format.dash(rut: string): string`
Formats a RUT by adding a dash.

```javascript
console.log(format.dash('123456780')); // '12345678-0'
console.log(format.dash('12.345.6780')); // '12.345.678-0'
console.log(format.dash('12')); // '1-2'
```

`format.dotDash(rut: string): string`
Formats a RUT by adding dots and a dash.

```javascript
console.log(format.dotDash('123456780')); // '12.345.678-0'
console.log(format.dotDash('12345678-K')); // '12.345.678-K'
```

`format.notDot(rut: string): string`
Removes dots from a RUT.

```javascript
console.log(format.notDot('12.345.678-0')); // '12345678-0'
console.log(format.notDot('12.345.678')); // '12345678'
```

`format.notDash(rut: string): string`
Removes the dash and check digit from a RUT.

```javascript
console.log(format.notDash('12.345.678-0')); // '12.345.678'
console.log(format.notDash('12345678-0')); // '12345678'
```

`format.notDotDash(rut: string): string`
Removes dots and the dash from a RUT.

```javascript
console.log(format.notDotDash('12.345.678-9')); // '12345678'
console.log(format.notDotDash('12.345.678')); // '12345678'
```

## Validation Functions
`calculateDv(rut: string | number): string`
Calculates the check digit of a Chilean RUT.

```javascript
console.log(calculateDv('12.345.678')); // '5'
console.log(calculateDv('12345678')); // '5'
console.log(calculateDv(12345678)); // '5'
```

`isValidRut(rut: string): boolean`
Validates if a Chilean RUT is valid.

```javascript
console.log(isValidRut('12.345.678-5')); // true
console.log(isValidRut('12345678-5')); // true
```

### Format Validations
`isFormat.dot(rut: string): boolean`
Checks if a RUT has the correct format with dots.

``` javascript
console.log(isFormat.dot('12.345.678')); // true
```

isFormat.dash(rut: string): boolean
Checks if a RUT has the correct format with a dash.

``` javascript
console.log(isFormat.dash('12345678-9')); // true
```

`isFormat.dotDash(rut: string): boolean`
Checks if a RUT has the correct format with dots and a dash.

```javascript
console.log(isFormat.dotDash('12.345.678-9')); // true
```

## Contributing
If you wish to contribute to this project, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.

### ¡Sigueme en mis redes!

[![GitHub Followers](https://img.shields.io/github/followers/pedroelhumano?style=social)](https://github.com/pedroelhumano)
[![GitHub Followers](https://img.shields.io/github/stars/pedroelhumano?style=social)](https://github.com/pedroelhumano)
[![Youtube](https://img.shields.io/badge/Youtube-FF0000?&logo=Youtube&logoColor=white&labelColor=101010)](https://www.youtube.com/channel/UCwISu2hFg7EpOIZ8aV7iS6g?sub_confirmation=1)
[![Linkedin](https://img.shields.io/badge/Linkedin-00d8fd?&logo=linkedin&logoColor=white&labelColor=101010)](https://www.linkedin.com/in/pedroelhumano/)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?&logo=instagram&logoColor=white&labelColor=101010)](https://www.instagram.com/pedroelhumano/)
[![X](https://img.shields.io/badge/X-14171A?&logo=x&logoColor=white&labelColor=101010)](https://www.x.com/pedroelhumano)
