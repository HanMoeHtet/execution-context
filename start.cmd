@echo off
START /b node .\node\node_modules\ts-node\dist\bin.js .\node\
echo "Node.js server is running at localhost:8000"
START /b php -S localhost:8001 -t php
echo "PHP server is running at localhost:8001"
START /b python3 python/main.py
echo "Python server is running at localhost:8002"
START /b .\java\gradlew -p java bootRun
echo "Java server is running at localhost:8003"
