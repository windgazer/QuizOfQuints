###
# node.command
# Start a node instance based on 'app.js' out of the parent directory
# 
# Simply double-click the .command file...

cd "`dirname "$0"`"
cd ..
node app.js
