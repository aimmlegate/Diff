install:
	npm install

start:
	npm run babel-node -- src/bin/brain-games.js

calc:
	npm run babel-node -- src/bin/brain-calc.js

even:
	npm run babel-node -- src/bin/brain-even.js

gcd:
	npm run babel-node -- src/bin/brain-gcd.js

balance:
	npm run babel-node -- src/bin/brain-balance.js

prime:
	npm run babel-node -- src/bin/brain-prime.js

progression:
	npm run babel-node -- src/bin/brain-progression.js

lint:
	npm run eslint ".js" "src/"

flow:
	flow

publish:
	npm publish

build:
	npm run build