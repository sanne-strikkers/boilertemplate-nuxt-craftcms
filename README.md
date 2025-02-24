# Craft CMS + Nuxt Starter
A minimal starter for [Nuxt 3](https://nuxt.com/) and [Craft CMS](https://craftcms.com/) projects.

## Prerequisites
- PHP development environment: Laravel Valet or Herd (most commonly used).
- MySQL GUI: Tableplus, Sequal Ace, DBeaver are all fine.
- SQL-dump of the production/staging database
- `$ cp -n .env.example .env` - setup your .env file in `/frontend` AND `/backend`

## Quick Start
We made the setup for the project very simple. `.nvmrc` shows the npm version of the project. The `Makefile` is doing everything for you.
To get the project up and running, execute: 

```bash
make build
```

### Craft CMS
To open the cms of the project go to `https://backend.boilertemplate-nuxt-craftcms.test/admin/`.

## Project Structure

We’ve split the project directory into two folders, `backend/` and `frontend/`, to better demonstrate the boundaries of Craft and Nuxt, respectively. Some configuration needs to be transcribed between the spaces to ensure each half understands where the other lives!

> [!WARNING]
> The front- and back-end `.env` files are separate! Make sure you are updating configuration in the correct file.

There is no `.gitignore` at the root of the project—instead, each system maintains its own relatively-vanilla file (`backend/.gitignore` and `frontend/.gitignore`).

### Back End

The `backend/` directory is predominantly a standard Craft installation, so [its structure](https://craftcms.com/docs/5.x/system/directory-structure.html) should be familiar. Craft is configured to run in [headless mode](https://craftcms.com/docs/5.x/reference/config/general.html#headlessmode), which means it doesn’t perform any element routing, nor template rendering—in fact, it will only respond to _control panel_, _action_, and static asset requests (like any images you might upload).

Craft uses the `PRIMARY_SITE_URL` environment variable to generate fully-qualified URLs for front-end pages (and assets), and `CRAFT_BASE_CP_URL` to build control panel URLs.

### Front End

Nuxt lives in the `frontend/` directory.
See `frontend/nuxt.config.js` to [customize Nuxt](https://nuxt.com/docs/getting-started/configuration), or read about the rest of its [directory structure](https://nuxt.com/docs/guide/directory-structure).

Routing is handled primarily via the [`pages/`](https://nuxt.com/docs/guide/directory-structure/pages) directory, and GraphQL queries are centralized in `queries/`.

Open the local front-end website with the following link: `https://backend.boilertemplate-nuxt-craftcms.test:3000`

## Run Project

### Makefile
Run project with the Makefile

```bash
make run
```

### Manually
Run project manually

```bash
npm run dev
```

## Styling

### BEM naming convention
The project prefers component based styling with utility classes sprinkled in. [BEM methodology](https://getbem.com/introduction/) is used for naming classes.
Here's [a helpful cheat-sheet](https://bem-cheat-sheet.9elements.com/).
