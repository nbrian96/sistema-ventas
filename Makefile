# Comandos Laravel
key:
	php artisan key:generate

artisan:
	php artisan

migrate:
	php artisan migrate

seed:
	php artisan db:seed

fresh:
	php artisan migrate:fresh --seed

tinker:
	php artisan tinker

test:
	php artisan test

# Composer
dev:
	composer run dev

spatie:
	composer require spatie/laravel-permission
	php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"

composer-install:
	composer install

composer-update:
	composer update

composer-autoload:
	composer dump-autoload

# Node
npm-install:
	npm install

npm-dev:
	npm run dev

npm-watch:
	npm run watch

npm-build:
	npm run build

# Cache
clear:
	php artisan optimize:clear
	php artisan config:clear
	php artisan route:clear
	php artisan cache:clear

cache:
	php artisan config:cache && php artisan route:cache

stop-all:
	docker stop $(docker ps -q)

# Permisos (Linux)
fix-permissions:
	sudo chown -R $$USER:www-data . && sudo chmod -R 775 storage bootstrap/cache

# Por unica vez
ready: npm-install composer-install fix-permissions spatie fresh key clear cache composer-autoload