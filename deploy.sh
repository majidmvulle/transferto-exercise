#!/bin/bash
SYMFONY_DIR=src

echo ""
echo "Copying .env.dist to .env"
cp $SYMFONY_DIR/.env.prod $SYMFONY_DIR/.env

echo ""
echo "Changing directory into Symfony to run composer"
cd $SYMFONY_DIR

echo ""
echo "Running composer"
composer install

echo ""
echo "Generating database"
bin/console doctrine:database:create

echo ""
echo "Running migrations"
echo "y" | bin/console doctrine:migrations:migrate

echo ""
echo "Building Front End"
yarn install
yarn run build

echo ""
echo "Return to parent directory"
cd ..

echo ""
echo "Running docker-compose build"
docker-compose build

echo ""
echo "Starting docker, visit website at http://localhost:81"
docker-compose up
