# life4weeks

![Firebase project](https://img.shields.io/badge/firebase-project-orange?style=flat&logo=firebase)
![Angular webapp](https://img.shields.io/badge/angular-webapp-red?style=flat&logo=angular)
![GitHub repo size](https://img.shields.io/github/repo-size/davide97g/life4weeks)

![GitHub](https://img.shields.io/github/license/davide97g/life4weeks)
![GitHub contributors](https://img.shields.io/github/contributors/davide97g/life4weeks)

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/davide97g/life4weeks/build-webapp)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/davide97g/life4weeks/build-functions)

![Firebase Functions](https://github.com/davide97g/life4weeks/workflows/deploy-functions/badge.svg?branch=master) ![Firebase Hosting](https://github.com/davide97g/life4weeks/workflows/deploy-hosting/badge.svg?branch=master)

## Website

[Life4weeks webapp](https://life-4-weeks.web.app/)

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
