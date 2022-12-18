#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm install
npm run clean
npm run lint:fix
npm run test
npm run doc
npm run build

echo
touch .commit
exit
