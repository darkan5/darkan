# To Install wkhtmltopdf
sudo apt-get install -y wkhtmltoimage
sudo apt-get install -y xvfb
echo 'xvfb-run --server-args="-screen 0, 1024x768x24" /usr/bin/wkhtmltopdf $*' | sudo tee /usr/bin/wkhtmltopdf.sh > /dev/null
sudo chmod a+x /usr/bin/wkhtmltopdf.sh
sudo ln -s /usr/bin/wkhtmltopdf.sh /usr/local/bin/wkhtmltopdf
sudo apt-get install libicu48
