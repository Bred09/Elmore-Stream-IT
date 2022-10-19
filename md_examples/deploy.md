
static-asset нужен чтобы задать путь к css файлу

# Деплой Node.js, с уcтановкой Nginx и SSL Let's Encrypt

[![DigitalOcean Referral Badge](https://nodejs.org/static/images/logo.svg)](https://nodejs.org)

## Установка необходимых библиотек

- Подключитесь к серверу по SSH.
- Обновите состояние пакетов:
```
sudo apt update
```
- Установите Curl:
```
sudo apt install curl
```
- Установите NVM (Node Version Manager):
```
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.profile 
```
- Установите Node:
```
# Установить последную версию
nvm install node
# Установить конкретную версию
nvm install 14.17.3
nvm use 14.17.3
# Проверить активную версию 
node -v
```
- Склонируйте Git репозиторий:
```
git clone (https ссылка на репозиторий)
```
- Зайдите в папку приложения и установите node_modules:
```
ls -l # Посмотреть список файлов
cd (имя репозитория)
npm install
```
- Установите PM2 и запустите node приложение:
```
npm install -g pm2
NODE_ENV=production pm2 start npm --name strapi -- run start # Запустить в режиме продакшн npm run start скрипт и назвать "strapi"
pm2 status # Статус процессов
pm2 logs # Показать логи приложения (Ctrl + C чтобы выйти)
pm2 startup ubuntu # Запускать pm2 при рестарте системы
pm2 save # Сохранить процесс чтобы при перезапуске сам запускался
```
## Установка firewall

```
ufw status
ufw enable # Oтвечаем 'y'
ufw allow ssh
ufw allow http
ufw allow https
```
## Установка Nginx
```
sudo apt install nginx # Отвечаем 'y'
sudo nano /etc/nginx/sites-available/default 
```
- Поля server_name и location / {} измените на:
```
server_name your-domain.com www.your-domain.com;
location / {
    proxy_pass http://localhost:5000; # Порт на котором запускается node.js приложение
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```
- Ctrl + X чтобы выйти, 'y' чтобы сохранить
- Если запущен Apache сервер, его необходимо остановить
```
service apache2 status
sudo systemctl disable apache2 && sudo systemctl stop apache2
```
- Проверьте синтаксис Nginx и перезапустите сервер
```
sudo nginx -t
sudo service nginx restart
```

## Привязка домена
В любом сервисе для подключения домена к серверу, нужны следующие действия:
- Прописать NS серверы хостинга(WebTime, FirstVDS) в регистратор домена(Reg.ru)
- Добавить DNS записи в хостинге с указанием IP адреса сервера

### Привязка домена на примере DigitalOcean
- На странице регистратора вашего домена добавьте DNS записи:
```
ns1.digitalocean.com
ns2.digitalocean.com
ns3.digitalocean.com
```
- Подождите до 48 часов (может быть и 5 минут) пока обновятся DNS записи

## Установка SSL сертфиката Let's Encrypt
```
sudo apt install certbot python3-certbot-nginx # Отвечаем 'y'
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
certbot renew --dry-run
```

**Да будет свет**
- Спасибо Неону :)

# Настройка сайта, БД и пр.
- Импортировать файл.sql в базу данных `esi`
```
mysql -u root -p esi < esi.sql
```

## Создание MySQL user для удаленного подключения

- Create user
```
CREATE USER 'login'@'%' IDENTIFIED BY 'password';
```
- Set GRANT
```
GRANT ALL PRIVILEGES ON *.* TO 'login'@'%' WITH GRANT OPTION;
```
- Upgate privileges
```
FLUSH PRIVILEGES;
```

## Полезные команды

- Переименовать все файлы по нумерации 1.mp4; 2.mp4; N.mp4
```
ls -v | cat -n | while read n f; do mv -n "$f" "$n.mp4"; done
```
