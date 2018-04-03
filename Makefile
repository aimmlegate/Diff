install:
	npm install

make run:
	npm run babel-node dist/bin/gendiff.js

lint:
	npm run eslint ".js" "src/"

flow:
	flow

publish:
	npm publish

build:
	npm run build

test:
	npm test