#!/bin/bash

set -e

reset="\033[0m"
red="\033[31m"
green="\033[32m"
yellow="\033[33m"
cyan="\033[36m"
white="\033[37m"

COMPOSER_DEFAULT_VERSION="$1"
COMPOSER_DIRECTORY="$2"

printf "$green Setting up composer"
printf "$reset\n"
read -p "Enter composer version to install ($COMPOSER_DEFAULT_VERSION): " composer_version

if ["$composer_version" == ""];
then
	composer_version=$COMPOSER_DEFAULT_VERSION
fi

function install(){
    DOWNLOAD_URL="https://getcomposer.org/download/$composer_version/composer.phar"

	printf "\nDownloading composer from $DOWNLOAD_URL"

	if [[ ! -d $COMPOSER_DIRECTORY/bin ]];
	then
	    mkdir $COMPOSER_DIRECTORY/bin
	fi

	curl -fL $DOWNLOAD_URL > $COMPOSER_DIRECTORY/composer.phar
	mv $COMPOSER_DIRECTORY/composer.phar $COMPOSER_DIRECTORY/bin/composer
	chmod +x $COMPOSER_DIRECTORY/bin/composer
	echo ""
}

if [[ -f $COMPOSER_DIRECTORY/bin/composer ]]; then
  $COMPOSER_DIRECTORY/bin/composer --version | grep "Composer version $composer_version" > /dev/null

  if [[ $? -eq 0 ]]
  then
  	printf "$cyan The current composer version matches your requested composer version ($composer_version), nothing to do"
	printf "$reset\n"
  else
      echo "The current composer version is not the same as your selected ($composer_version), fetching new version"
      rm -rf $COMPOSER_DIRECTORY/bin/*
    install
  fi
else
  printf "$green Installing composer"
  printf "$reset\n"
  install
fi
  printf "\ncomposer available at $COMPOSER_DIRECTORY/bin/composer\n"
