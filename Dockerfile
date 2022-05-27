FROM cl00e9ment/node.js-builder

WORKDIR /repo

COPY . .

RUN npm install

ENV PORT=3000

ENV NODE_ENV=production

ENV CI=true

RUN npm run build

CMD [ "node", "dist/." ]
