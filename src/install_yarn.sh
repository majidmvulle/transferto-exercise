#!/bin/bash
set -e

reset="\033[0m"
red="\033[31m"
green="\033[32m"
yellow="\033[33m"
cyan="\033[36m"
white="\033[37m"

YARN_DEFAULT_VERSION="$1"
YARN_DIRECTORY="$2"

printf "$green Setting up yarn"
printf "$reset\n"
read -p "Enter yarn version to install (1.13.0): " yarn_version

if ["$yarn_version" == ""];
then
	yarn_version=$YARN_DEFAULT_VERSION
fi

function install(){
	DOWNLOAD_URL="https://github.com/yarnpkg/yarn/releases/download/v$yarn_version/yarn-v$yarn_version.tar.gz"

	printf "\nDownloading yarn from $DOWNLOAD_URL"
	curl -fL $DOWNLOAD_URL > $YARN_DIRECTORY/yarn.tar.gz
	echo ""
	tar zxf $YARN_DIRECTORY/yarn.tar.gz  --strip-components=1 -C $YARN_DIRECTORY
}

if [[ -f $YARN_DIRECTORY/bin/yarn ]]; then
  CURRENT_YARN_VERSION=$(node -e 'const fs = require("fs"); console.log(JSON.parse(fs.readFileSync("'$YARN_DIRECTORY'/package.json")).version);')

  if [[ "$CURRENT_YARN_VERSION" != "$yarn_version" ]]; then
    echo "The current yarn version is $CURRENT_YARN_VERSION, but you selected $yarn_version, fetching new version"
    rm -rf $YARN_DIRECTORY/bin $YARN_DIRECTORY/lib
    install
else
	printf "$cyan The current yarn version matches your requested yarn version ($yarn_version), nothing to do"
	printf "$reset\n"
  fi
else
  printf "$green Installing yarn"
  printf "$reset\n"
  install
fi
  printf "\nyarn available at $YARN_DIRECTORY/bin/yarn\n"