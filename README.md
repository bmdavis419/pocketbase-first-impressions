# pocketbase-first-impressions
A simple app built to showcase pocketbase!

## USEFUL RESOURCES

- [pocketbase docs](https://docs.pocketbase.io)
- [fly.io docs](https://fly.io/docs)
- [hosting pocketbase on fly.io](https://github.com/pocketbase/pocketbase/discussions/537)

## how to run locally

1. clone this repo
2. start a local server in the root directory: ```task start```
3. cd into the ```client``` directory
4. install dependencies: ```npm install```
5. set your .env file: ```cp .env.example .env```
6. start the client: ```npm start```

## how to deploy to fly.io

1. install flyctl: https://fly.io/docs/hands-on/install-flyctl
2. init the fly app: ```flyctl launch```
3. create free storage volume: ```flyctl volumes create pb_data --size=1```
4. update fly.toml with the volume info:
    ```
        [mounts]
            destination = "/pb/pb_data"
            source = "pb_data"
    ```
5. deploy: ```flyctl deploy```
