# prepare

update package.json, remove sections `devDependencies` and `dependencies`

delete `yarn.lock` and `node_modules`

run `re-install-lib.sh`

which has following commands

# re-install devDependencies

```
yarn add -D ts-node
yarn add -D typescript
```

# re-install dependencies

```
yarn add @babel/core
yarn add @babel/plugin-proposal-class-properties
yarn add @babel/plugin-transform-runtime
yarn add @babel/register
yarn add axios
yarn add date-fns
yarn add dotenv
yarn add express
yarn add http-proxy-middleware
yarn add morgan
yarn add prop-types
yarn add react
yarn add react-dom
yarn add react-helmet
yarn add react-mde
yarn add react-router-dom
yarn add react-scripts
yarn add react-text-loop
yarn add remark
yarn add remark-html
yarn add semantic-ui-react semantic-ui-css
yarn add uuid
```
