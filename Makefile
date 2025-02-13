# Makefile
#
# A Makefile provides convenient commands to be able to get the project up
# and running on your local machine.
#
# Usage:
#   make build  - Install project dependencies and setup project
#   make run    - Start the development server
#   make nuke   - Clean up cache and all generated and installed files
#
# It is always possible to do:
#   $ make nuke
#   $ make build
#   $ make run
# (useful when switching branches)
#
# The Makefile is meant for local development and each target should be verbose and
# read like a step-by-step manual and only contain
# build, run, nuke and test targets.
# Or targets that are used in support of these four.

BASE_DIR:=$(shell pwd)

build:
	@echo "-- Building project --"
	@make build-cms
	@make build-frontend

build-cms:
	@echo "-- Building CMS --"
	cd $(BASE_DIR)/backend && \
		echo "Installing backend composer dependencies" && \
		composer install --no-scripts && \
		./craft setup/php-session-table && \
		echo "Setting up Craft CMS" && \
		./craft migrate/all --interactive 0 && \
		echo "Applying project config" && \
		./craft project-config/apply --interactive 0 && \
		echo "Clearing caches" && \
		./craft clear-caches/all

build-frontend:
	@echo "-- Building Frontend --"
	@echo "Installing frontend NPM dependencies"
	npm install --prefix $(BASE_DIR)/frontend

run:
	@echo "-- Running project --"
	cd $(BASE_DIR)/frontend && \
		npm run dev

nuke:
	@echo "-- Nuking project --"
	cd $(BASE_DIR)/frontend && \
		echo "Removing frontend node_modules" && \
		rm -rf ./node_modules && \
		echo "Removing backend vendor"  && \
		cd $(BASE_DIR)/backend && \
		rm -rf ./vendor

rebuild:
	@echo "-- Rebuilding project --"
	make nuke
	make build
	make run

.PHONY: build build-cms build-frontend run nuke rebuild

