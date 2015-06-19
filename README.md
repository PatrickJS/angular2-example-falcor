# Angular 2 FalcorJS

> Angular 2 FalcorJS

Todo:
* update readme


### Quick start
> Clone/Download the repo then edit `App.ts` inside [`/src/app/App.ts`](/src/app/App.ts)

```bash
$ npm start # then open your browser and go to http://localhost:8080
```


### With the Router
```bash
$ webpack
$ node index.js
```
wating files
```bash
$ webpack -w
$ nodemon index.js
```





## File Structure
We use the component approach in our starter. This is the new standard for developing Angular apps and a great way to ensure maintainable code by encapsulation of our behavior logic. A component is basically a self contained app usually in a single file or a folder with each concern as a file: style, template, specs, e2e, and component class. Here's how it looks:
```
angular2-webpack-starter/
 ├──public/                           * static assets are served here
 │   ├──lib/                          * static libraries
 │   │   └──traceur.min.js            * ignore this file for now as it's required by Angular 2
 │   │
 │   ├──favicon.ico                   * replace me with your own favicon.ico
 │   ├──service-worker.js             * ignore this. Web App service worker that's not complete yet
 │   ├──robots.txt                    * for search engines to crawl your website
 │   ├──human.txt                     * for humans to know who the developers are
 │   └──index.html                    * Index: where we place our script tags
 │
 ├──src/                              * our source files that will be compiled to javascript
 │   ├──app/                          * WebApp folder
 │   │   ├──bootstrap.ts              * entry file for app
 │   │   │
 │   │   ├──components/               * where most of components live
 │   │   │   ├──app.ts                * entry file for components
 │   │   │   ├──dashboard.ts          * A simple Component with a simple Directive examples
 │   │   │   │
 │   │   │   ├──home/                 * example component as a folder
 │   │   │   │   ├──home.ts           * how you would require your template and style files
 │   │   │   │   ├──home.css          * simple css file for home styles
 │   │   │   │   └──home.html         * simple html file for home template
 │   │   │   │
 │   │   │   └──todo.ts               * An example of a component using a service and forms
 │   │   │
 │   │   ├──services/                 * where we keep our services used throughout our app
 │   │   │   ├──TodoService.ts        * An example of a simple service
 │   │   │   └──services.ts           * where we gather our injectables from our services
 │   │   │
 │   │   └──directives/               * where we keep our directives used throughout our app
 │   │       ├──Autofocus.ts          * another simple directive to fix a problem with the router
 │   │       └──directives.ts         * where we gather our directives from our directives
 │   │
 │   ├──common/                       * where common files used throughout our app
 │   │   ├──shadowDomInjectables.ts   * Determind if the user is on chrome and use ShadowDom
 │   │   └──BrowserDomAdapter.ts      * ignore this. we need to set the DomAdapter to the browser
 │   │
 │   └─custom_typings/                * where we define our custom types
 │      └──ng2.d.ts                   * where we patch angular2 types with our own until it's fixed
 │
 ├──typings/                          * where tsd defines it's types definitions
 │   └─angular2/
 │      └─angular2.d.ts               * our type definitions
 │
 ├──tsconfig.json                     * config that webpack uses for typescript
 ├──tsd.json                          * config that tsd uses for managing it's definitions
 ├──package.json                      * what npm uses to manage it's dependencies
 └──webpack.config.js                 * our webpack config
```

# Getting Started
## Dependencies
What you need to run this app:
* `node` and `npm` (`brew install node`)
* Ensure you're running the latest versions Node `v0.12.2`+ and NPM `2.10.0`+

Once you have those, you should install these globals with `npm install -global`:
* `webpack` (`npm install -global webpack`)
* `webpack-dev-server` (`npm install -global webpack-dev-server`)

## Installing
* `fork` this repo
* `clone` your fork
* `npm install` to install all dependencies
* `npm run server` to start the server

## Running the app
After you have installed all dependencies you can now run the app. Run `npm server` to start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://localhost:8080`.

### server
```bash
$ npm run server
```

### build files
```bash
$ npm run build
```

### watch and build files
```bash
$ npm run watch
```

# TypeScript
> To take full advantage of TypeScript with autocomplete you would have to install it globally and use an editor with the correct TypeScript plugins.

## Use latest TypeScript compiler
TypeScript 1.5 beta includes everything you need. Make sure to upgrade, even if you installed TypeScript previously.

    $ npm install -global typescript@^1.5.0-beta

## .d.ts Typings
The typings in `typings/` are partially autogenerated, partially hand
written. All the symbols should be present, but probably have wrong paramaters
and missing members. Modify them as you go.

    $ npm install -global tsd
 > You may need to require `reference path` for your editor to autocomplete correctly
 ```
 /// <reference path="../../typings/tsd.d.ts" />
 /// <reference path="../custom_typings/ng2.d.ts" />
 ```
 Otherwise including them in `tsd.json` is prefered

## Use a TypeScript-aware editor
We have good experience using these editors:

* [Visual Studio Code](https://code.visualstudio.com/)
* [Webstorm 10](https://www.jetbrains.com/webstorm/download/)
* [Atom](https://atom.io/) with [TypeScript plugin](https://atom.io/packages/atom-typescript)
* [Sublime Text](http://www.sublimetext.com/3) with [Typescript-Sublime-Plugin](https://github.com/Microsoft/Typescript-Sublime-plugin#installation)

## Frequently asked questions
* Why we are using traceur? This is due to Angular 2 not being fully migrated to TypeScript and will be removed soon.
* Why is there an Error in Safari? This is a known issue with alpha.25 that will be fixed in the next tagged release (https://github.com/angular-class/angular2-webpack-starter/issues/17)


# Starter Kit Support and Questions
> Contact us anytime for anything about this repo

* [Gitter: angular-class/angular2-webpack-starter](https://gitter.im/angular-class/angular2-webpack-starter)
* [Twitter: @AngularClass](https://twitter.com/AngularClass)

___

enjoy — **AngularClass**

<br><br>

[![AngularClass](https://angularclass.com/images/ng-crown.svg  "Angular Class")](https://angularclass.com)
##[AngularClass](https://angularclass.com)
> Learn Angular in 2 days from the best
