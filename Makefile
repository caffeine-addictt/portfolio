NAME:=portfolio

NPM:=npm
CARGO:=cargo
RUSTUP:=rustup
DOCKER:=docker

ifeq ($(OS),Windows_NT)
RM_CMD:=rd /s /q
NULL:=/dev/nul
else
RM_CMD:=rm -rf
NULL:=/dev/null
endif


# =================================== DEFAULT =================================== #

default: all

## default: Installs dependencies and prints this help message
.PHONY: default
all: install help

# =================================== HELPERS =================================== #

## help: print this help message
.PHONY: help
help:
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Commands:'
	@sed -n 's/^## //p' ${MAKEFILE_LIST} | column -t -s ':' |  sed -e 's/^/ /'
	@echo ''
	@echo 'Extra:'
	@sed -n 's/^### //p' ${MAKEFILE_LIST} | column -t -s ':' |  sed -e 's/^/ /'


## dev: Start client and server in development mode
.PHONY: dev
dev:
	${DOCKER} compose up --watch --build


## prod: Run client server in production mode
.PHONY: prod
prod:
	${DOCKER} compose up --build


## down: Kill client and server
.PHONY: down
down:
	${DOCKER} compose down 2> ${NULL}


## gen: Generates css styles
gen:
	npx tailwindcss -i ./public/globals.css -o ./public/css/main.css -m


## install: Install dependencies
.PHONY: install
install: install/npm install/cargo
	@echo "Installed dependencies!"

### install/npm: Install node stuff
.PHONY: install/npm
install/npm:
	${NPM} i

### install/cargo: Install cargo stuff
.PHONY: install/cargo
install/cargo:
	${RUSTUP} component add clippy
	${RUSTUP} component add rustfmt


## test: Runs tests
.PHONY: test
test:
	${CARGO} test
	@echo "Test passing!"


## lint: Lint code
.PHONY: lint
lint:
	${CARGO} clippy
	@echo "Linting passing!"


## format: Format code
.PHONY: format
format:
	${CARGO} fmt
	@echo "Formatted code!"


## clean: Clean up build artifacts
.PHONY: clean
clean: clean/npm clean/cargo clean/docker
	@echo "Cleaned up build artifacts!"

### clean/npm: Clean up node_modules
.PHONY: clean/npm
clean/npm:
	${RM_CMD} node_modules

### clean/cargo: Clean up cargo
.PHONY: clean/cargo
clean/cargo:
	 ${CARGO} clean

### clean/docker: Runs docker system prune
.PHONY: clean/docker
clean/docker:
	${DOCKER} system prune -f


## tidy: Clean up code artifacts
.PHONY: tidy
tidy: tidy/docker
	@echo "Cleaned up code artifacts!"

### tidy/docker: Clean up docker
.PHONY: tidy/docker
tidy/docker: down
	${DOCKER} compose rm -f 2> ${NULL}
	${DOCKER} rmi ${NAME} 2> ${NULL}
