#!/usr/bin/env bash
set -e

PLATFORM=$([[ "${@#--android}" = "$@" ]] && echo "ios" || echo "android")
TARGET=$([[ "${@#--device}" = "$@" ]] && echo "emulator" || echo "device")
ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"/..
CDV=$ROOT/node_modules/.bin/cordova

rm -rf $ROOT/temp
mkdir $ROOT/temp
cp -r $ROOT/test/app-template/ $ROOT/temp/
cp $ROOT/test/app-test-definitions.js $ROOT/temp/www/
cd $ROOT/temp
$CDV prepare
$CDV plugins add $ROOT
$CDV build $PLATFORM --$TARGET
