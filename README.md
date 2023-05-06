# Super Secret Santa

A [web application](https://super-secret-santa.vercel.app) to allow people to setup and manage secret santa events with a focus on keeping everything a mystery until the final day.

## Requirements

- Node 18
- Docker or Mysql running locally

## Installation and setup

### Dependencies

Once you've cloned the code, install dependencies. This will generate your schema and install the relevent git hooks the repository uses.

```
// using npm
npm install

// using yarn
yarn
```

### Environment variables

We can now set up the environment variables. Copy and rename the `.env.example` file to `.env`. Fill in the blank values marked as required.

As of now, only the Discord client ID and secret are required. Getting these values requires creating a discord application. More info at [Setting up DiscordProvider](https://create.t3.gg/en/usage/next-auth#setting-up-the-default-discordprovider)

```
# REQUIRED
DISCORD_CLIENT_ID=
# REQUIRED
DISCORD_CLIENT_SECRET=
```

### Database

This project uses `mysql` and so we either need to use `docker` to run a local instance or run a `mysql` instance on the local machine.

With `docker` you can simply run the following:

```
docker-compose up
```

Setting up locally is a bit more involved, a guide can be found on the [prisma documentation](https://www.prisma.io/dataguide/mysql/setting-up-a-local-mysql-database). Once installed, set up a database with the password `admin`. Alternatively set as you want and update the `DATABASE_URL` environment variable to reflect the connection string.

Once we have a working database locally the final step is to push our database schema. This can be done with the following command:

```
npx prisma db push
```

If this command causes an issue, the database connection is most likely not valid. Otherwise, you're all ready to go!

## Running locally

To run the application all you need to do is run the following

```
yarn run dev
```

You can now navigate to `http://localhost:3000` to see the app.

## Deploying

This project is set up to automatically deploy to [Vercel](https://vercel.com) whenever a push to master is made.
