# Brewblox nodes for Node-RED

Basic setup for Typescript nodes.
Based on https://github.com/alexk111/node-red-node-typescript-starter/.
The original template carries an MIT license.


## Adding Nodes

You can quickly scaffold a new node and add it to the node set. Use the following command to create `my-new-node-type` node:

```
yarn add-node my-new-node-type
```

The node generator is based on mustache templates.
To generate a node using a template called `my-template`, enter this command:

```
yarn add-node my-new-node-type my-template
```

To make your custom-made template available, add it to `./dev/templates/`.

## Developing Nodes

Build & Test in Watch mode:

```
yarn dev
```

## Building Node Set

Create a production build:

```
yarn build
```
