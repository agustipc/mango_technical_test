# TECHNICAL TEST MANGO

## Table of Contents

1. [Description of the Exercise](#description-of-the-exercise)
2. [Technologies](#technologies)
3. [Getting Started](#getting-started)
4. [Getting Started](#getting-started)
   - [Installation](#installation)
   - [Running the Tests](#running-the-tests)
5. [Requirements](#requirements)
   - [Normal Range](#normal-range)
   - [Fixed Values Range](#fixed-values-range)

## Description of the Exercise

- You have to create the following component: `<Range />`
- You have to use React to create the solution.
- You do NOT have to use any CLI to create structure and architecture of your application.
- This component has two use modes:
  - Normal range from min to max number
  - Fixed number of options range

## Technologies

- Next.js
- React
- TypeScript
- SASS
- Jest

## Getting Started

Install the dependencies and run the project:

```bash
npm install
npm run dev
```

To run the the tests use:

```bash
npm test
```

## Requirements

### Normal range:

Provide a localhost:8080/exercise1 route with the following:

- [ x ] The component CAN'T be a HTML5 input range. It has to be a custom one.
- [ x ] The user can drag two bullets through the range line.
- [ x ] The user can click on both currency number label values (min or max) and set a
  new value.
- [ x ] The value will never be less than min or greater than max input values.
- [ x ] When some bullet is on hover, this bullet has to be bigger and change cursor's type
  into draggable.
- [ x ] Dragging a bullet turns cursor to dragging
- [ x ] Min value and max value can't be crossed in range
- [ ] For this example, provide a mocked http service returning min and max values
      that have to be used in the component. Example: {min: 1, max: 100}. Use
      https://www.mockable.io/ or a custom mocked
      server.
- [ x ] Do as many unit tests as you can.

### Fixed values range:

Provide a localhost:8080/exercise2 route with the following:

- [ ] The component CAN'T be a HTML5 input range. It has to be a custom one.
- [ ] Given a range of values: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] the user will only
      be able to select those values in range
- [ ] Provide a mocked http service that returns the array of numbers: [1.99, 5.99,
      10.99, 30.99, 50.99, 70.99]. Use h ttps://www.mockable.io/ or a custom mocked
      server.
- [ ] For this type of range, currency values are not input changable. They have to be
      only a label
- [ ] The user can drag two bullets through the range line.
- [ ] Min value and max value can't be crossed in range
- [ ] For this example, provide a mocked service returning min and max values that
      have to be used in the component. Example: {rangeValues: []}
- [ ] Do as many unit tests as you can.
