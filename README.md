# Save it

A bot to save your favorites posts at bluesky.

## Description

This bot will send you a link of the root post in your DM for you read it later

## Run locally

**1.** Clone repo

```bash
$ git clone https://github.com/Cristuker/save-to-later.git
```

**2.** Install dependecies

```bash
$ npm install
```
**3.** Run docker compose

```bash
$ docker-compose up -d
```

**4.** Set the env

```bash
API_URL='https://bsky.social/xrpc'
IDENTIFIER=
PASSWORD=
REDIS_URL=redis://localhost:6379
```

**5.** Run project

```bash
$ npm run dev
```

**6.** Build

```bash
$ npm run build 
```

## Libs

* redis
* @atproto/api
* nodemon
* TypeScript
* dotenv
* pm2
* node-cron


## Roadmap

This is the list of next implementations or refactors.

- [x] - When bot crash, reinitialize quickly.
- [x] - Save events with error to try again later.
- [ ] - Clean message [embed or link].
- [ ] - Like post when success.
- [ ] - Reply post when error.

## Contributing

Feel free to send a PR.

