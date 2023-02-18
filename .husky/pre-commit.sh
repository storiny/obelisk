#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

yarn install
yarn clean
yarn lint:fix
yarn test
yarn doc
yarn build

echo
touch .commit
exit
