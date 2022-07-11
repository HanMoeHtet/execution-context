node ./node/node_modules/ts-node/dist/bin.js ./node &
echo "Node.js server is runnint at localhost:8000"
php -S localhost:8001 -t php &
echo "PHP server is running at localhost:8001"
python3 python/main.py &
echo "Python server is running at localhost:8002"
./java/gradlew bootRun &
echo "Java server is running at localhost:8003"
