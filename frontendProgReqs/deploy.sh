#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -b main
git add -A
git commit -m "deploy"

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>.github.io/<REPO>

# if you are deploying to https://<USERNAME>.GITHUB.IO/<REPO>
# git push -f gitgithub.com:vladimirCeli/ProgReqsVC.git main:gh-pages