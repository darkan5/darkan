sudo pm2 delete all
sudo pm2 start /var/www/darkan/app/editors/standard/node_server/darkan_server.js --node-args="--expose-gc"
