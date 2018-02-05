#!/usr/bin/env bash

set -e;

##
## check for pull request against master
##
if [ "$TRAVIS_BRANCH" == "dev" ]; then


    gulp deploy --beta;


##
## check for master push which is no pull request
##
elif [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ]; then

    #gulp deploy --live;
    gulp deploy --live;

else

    tput setaf 64 # green
    echo "---------------------------------------------"
    echo "      ✓ deploy locally"
    echo "---------------------------------------------"
    tput sgr0 # reset
    

    gulp deploy --beta;

fi;

tput setaf 64 # green
echo "---------------------------------------------"
echo "         ✓ done deployment "
echo "---------------------------------------------"
tput sgr0 # reset

exit;
