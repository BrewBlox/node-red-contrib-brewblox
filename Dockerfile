FROM nodered/node-red

COPY --chown=node-red ./package*.json /node-red-contrib-brewblox/
COPY --chown=node-red ./dist/ /node-red-contrib-brewblox/dist
COPY --chown=node-red ./deployment/settings.js node_modules/node-red/settings.js

RUN npm install --save /node-red-contrib-brewblox
