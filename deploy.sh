#!/bin/bash
SYMFONY_DIR=src

YARN_DEFAULT_VERSION="1.13.0"
YARN_DIRECTORY=$SYMFONY_DIR/scripts/.yarn

COMPOSER_DEFAULT_VERSION="1.8.0"
COMPOSER_DIRECTORY=$SYMFONY_DIR/scripts/.composer

./$SYMFONY_DIR/install_yarn.sh $YARN_DEFAULT_VERSION $YARN_DIRECTORY

echo ""

./$SYMFONY_DIR/install_composer.sh $COMPOSER_DEFAULT_VERSION $COMPOSER_DIRECTORY

echo ""
echo "Copying .env.dist to .env"
cp $SYMFONY_DIR/.env.prod $SYMFONY_DIR/.env

echo ""
echo "Running composer"
./$COMPOSER_DIRECTORY/bin/composer install -d $SYMFONY_DIR

echo ""
echo "Building Front End"
./$YARN_DIRECTORY/bin/yarn --cwd=$SYMFONY_DIR install
./$YARN_DIRECTORY/bin/yarn  --cwd=$SYMFONY_DIR run build

echo ""
echo "Entering symfony directory"
cd $SYMFONY_DIR

echo ""
echo "Generating database"
bin/console doctrine:database:create

echo ""
echo "Running migrations"
echo "y" | bin/console doctrine:migrations:migrate


echo ""
echo "Return to parent directory"
cd ..

echo ""
echo "Running docker-compose build"
docker-compose build

echo ""
echo "Starting docker, visit website at http://localhost:81"
docker-compose up
