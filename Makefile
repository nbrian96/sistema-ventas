FRONTEND_DIR=resources/js
BACKEND_DIR=app

.PHONY: format format-check lint types check

# Ejecuta Prettier y reescribe los archivos mal formateados
format:
	@echo "\033[1;34m🧹 Formateando código con Prettier...\033[0m"
	- npx prettier --write $(FRONTEND_DIR) $(BACKEND_DIR)

# Verifica formato sin modificar archivos
format-check:
	@echo "\033[1;33m🔍 Verificando formato con Prettier...\033[0m"
	- npx prettier --check $(FRONTEND_DIR) $(BACKEND_DIR)

# Ejecuta ESLint y corrige errores automáticamente
lint:
	@echo "\033[1;34m🧽 Corriendo ESLint...\033[0m"
	- npx eslint $(FRONTEND_DIR) --fix

# Verifica los tipos TypeScript
types:
	@echo "\033[1;36m🧠 Verificando tipos con TypeScript...\033[0m"
	- npx tsc --noEmit

# Corre todo junto y muestra errores si hay
check:
	@echo "\033[1;35m🚨 Ejecutando chequeos de código...\033[0m"
	@$(MAKE) format-check
	@$(MAKE) lint
	@$(MAKE) types
	@echo "\033[1;32m✅ Chequeos completados (con o sin errores).\033[0m"

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