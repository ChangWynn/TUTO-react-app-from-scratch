# React application from scratch

This tutorial assume you already have `node` installed.

## 1. Create a new project

- Create a new folder and navigate into it.

```
mkdir <PROJECT-NAME>
cd <PROJECT-NAME>
```

- Initialize a `node` project.

```
npm init
```

## 2. Install core depedencies

- Install `webpack` depedencies.

```
npm i --save-dev webpack webpack-cli webpack-dev-server
```

- Install `babel` depedencies.

```
npm i --save-dev babel-loader @babel/preset-env @babel/core @babel/plugin-transform-runtime @babel/preset-react @babel/eslint-parser @babel/runtime @babel/cli
```

- Install `react` and `react-dom`.

```
npm i react react-dom
```

## 3. Setup core files

- Create an `index.html` file in a `public` folder in the root directory and add the following code.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="main.js"></script>
    <!-- The output file of webpack config-->
  </body>
</html>
```

- Create an `App.jsx` file in the a `src` folder in the root directory and add the following code.

```jsx
const App = () => {
  return <h1>Welcome to React</h1>;
};

export default App;
```

- Create an `index.js` in the root directory and add the following code.

```js
import reactDom from "react-dom";
import App from "./src/App";

reactDom.render(<App />, document.getElementById("root"));
```

## 4. Setup config files

- Create a `webpack.config.js` file at the root of project and add the following code.

```js
const path = require("path");

module.exports = {
  /** "mode"
   * the environment - development, production, none. tells webpack
   * to use its built-in optimizations accordingly. default is production
   */
  mode: "development",
  entry: "./index.js",
  output: {
    /** "path"
     * the folder path of the output file
     */
    path: path.resolve(__dirname, "public"),
    filename: "main.js",
  },
  /** "target"
   * setting "node" as target app (server side), and setting it as "web" is
   * for browser (client side). Default is "web"
   */
  target: "web",
  devServer: {
    port: "3000",
    /** "static"
     * This property tells Webpack what static file it should serve
     */
    static: ["./public"],
    /** "open"
     * opens the browser after server is successfully started
     */
    open: true,
    /** "hot"
     * enabling and disabling HMR. takes "true", "false" and "only".
     * "only" is used if enable Hot Module Replacement without page
     * refresh as a fallback in case of build failures
     */
    hot: true,
    /** "liveReload"
     * disable live reload on the browser. "hot" must be set to false for this to work
     */
    liveReload: true,
  },
  resolve: {
    /** "extensions"
     * If multiple files share the same name but have different extensions, webpack will
     * resolve the one with the extension listed first in the array and skip the rest.
     * This is what enables users to leave off the extension when importing
     */
    extensions: [".js", ".jsx", ".json"],
  },
  module: {
    /** "rules"
     * This says - "Hey webpack compiler, when you come across a path that resolves to a '.js or .jsx'
     * file inside of a require()/import statement, use the babel-loader to transform it before you
     * add it to the bundle. And in this process, kindly make sure to exclude node_modules folder from
     * being searched"
     */
    rules: [
      {
        test: /\.(js|jsx)$/, //kind of file extension this rule should look for and apply in test
        exclude: /node_modules/, //folder to be excluded
        use: "babel-loader", //loader which we are going to use
      },
    ],
  },
};
```

- Create a `.babelrc` file at the root and add the following code.

```json
{
  "presets": ["@babel/preset-env", ["@babel/preset-react", { "runtime": "automatic" }]],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

## 5. Final touch

- Update `package.json` with this two scripts.

```json
    "start": "webpack-dev-server .",
    "build": "Webpack ."
```

- [OPTIONAL] If you are using `git` and a version control system, create a `.gitignore` file and you can add these lines.

```
node_modules
*/main.js
```

## [OPTIONAL] - Setup testing environment

- Install `testing-library` for `react`.

```
npm i --save-dev @testing-library/react @testing-library/jest-dom
```

- Install `jest` and `jest-environment-jsdom`.

```
npm i --save-dev jest @types/jest jest-environment-jsdom

```

- Create a `jest.config.json` file at the root of your directory and add the following code.

```json
{
  "testEnvironment": "jsdom"
}
```

- Update `package.json` with this script.

```json
    "test": "jest",
```

- `[OPTIONAL]`

You can also add this line below to the `jest.config.json` file.

```json
{
  "setupFilesAfterEnv": ["<rootDir>/jest.setup.js"]
}
```

If you choose to do so, create a `jest.setup.js` (the name is arbitrary) at the root directory and add the following code.

```js
import "@testing-library/jest-dom";
```

This will avoid importing `@testing-library/jest-dom` in every test files.
