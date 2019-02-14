# Family

## About

This is an example of a simple factory in which a Parent contract deploys two children contracts within its constructor.

## Run Tests

Install node modules:
```
$ npm install
```

Run `ganache`:
```
ganache-cli --gasLimit=8000029 --gasPrice=30000000000
```

Run tests:
```
$ truffle test test/Contracts.test.js
```

#### *** DISCLAIMER: Contracts are not thoroughly tested or audited. ***