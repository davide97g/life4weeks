# life4weeks

![Firebase Functions](https://github.com/davide97g/life4weeks/workflows/Firebase%20Deploy%20Functions/badge.svg?branch=master) ![Firebase Hosting](https://github.com/davide97g/life4weeks/workflows/Firebase%20Deploy%20Hosting/badge.svg?branch=master&event=push)

Webapp for life4weeks project

## Setup

-   [Node.js](https://nodejs.org/it/download/)

    _test_

    -   `$ node -v --> v12.16.2`
    -   `$ npm -v --> 6.14.4`

-   [VSCode](https://code.visualstudio.com/download) _with extensions_ :
    -   Prettier - Code formatter _(highly recommended)_
    -   Angular Language Service _(highly recommended)_
    -   Bracket Pair Colorizer 2 _(recommended)_
    -   Better Comments _(recommended)_
    -   GitLens -- Git supercharged _(recommended)_

## Build

### Build Webapp

-   `$ cd webapp`
-   > first time only `$ npm i`
-   `$ npm run build`

### Build Functions

-   `$ cd functions`
-   > first time only `$ npm i`
-   > > first time only and with **admin** privileges `$ npm run link`
-   `$ npm run build`

## Test

### Test Webapp

-   `$ cd webapp`
-   > first time only `$ npm i`
-   `$ npm run start`

### Test Functions

-   `$ cd functions`
-   > first time only `$ npm i`
-   > > first time only and with **admin** privileges `$ npm run link`
-   `$ npm run start`

## Deploy

Just `push` your `commit` with github and the `github workflow` _(inside `.github\workflows` folder)_ will **automagically** handle it.
