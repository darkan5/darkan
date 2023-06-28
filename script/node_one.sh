pm2 delete all
pm2 start /var/www/darkan/app/editors/standard/node_server/darkan_server.js --node-args="--expose-gc" --no-autorestart
pm2 logs 
