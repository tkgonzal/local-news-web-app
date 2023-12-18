#!/bin/bash

MAIN_PY_PATH=/newsscraper/newsscraper/main.py

(crontab -l ; echo "0 0 * * * python3 $MAIN_PY_PATH") | crontab