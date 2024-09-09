# Klinky
A URL shortener with some basic analytics.

Techstack : Nextjs, Prisma, Postgres, and nanoid (for unique hash generation)

[![logo.png](https://i.postimg.cc/d1X81JWF/logo.png)](https://postimg.cc/tZ31vGQv)

## Getting Started

```sh
$ git clone https://github.com/ppriyankuu/klinky
```

```sh
$ npm i
```

`// setup the postgres db & .env`

```sh
$ npx prisma migrate dev
```
```sh
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.