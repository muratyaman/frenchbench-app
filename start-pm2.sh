#!/bin/sh

pm2 start yarn --name "test-app" --interpreter bash -- start
