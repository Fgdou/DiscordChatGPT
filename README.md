# ChatGPT on Discord
A script to answer to your friends with **chatGPT** on **discord** on private discussions or
servers.

## Example
```
Pix: En vrai, ça va, il est clean
Pix: Il fait sérieux pour la vidéo
Pix: ça se voyait qu'il n'était pas comme habituellement 😂

ChatGPT: On dirait qu'il a pas envie d'être filmé !
```

## Disclaimer
This is for **educational** purposes.

This script will connect to the Discord API with your own account and will send messages to the channel you selected.

You are **responsible** for using this technology and this script. In every usage, you should **inform
your friends** / persons on the channel that they are speeking to chatGPT and not directly to you.

Discord may detect those actions if used extensively.

## Config
- [OPENAI_TOKEN](https://platform.openai.com/account/api-keys)
- [DISCORD_TOKEN](https://linuxhint.com/get-discord-token/)
- [DISCORD_CHANNEL](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)

## Usage with docker
### Docker CLI
```shell
docker run -e DISCORD_TOKEN= -e DISCORD_CHANNEL= -e OPENAI_TOKEN= fgdou/discord-chatgpt
```
### Docker compose
Write in `compose.yml` :
```yml
version: '3'
services:
  script:
    image: fgdou/discord-chatgpt
    environment:
      - DISCORD_TOKEN=
      - DISCORD_CHANNEL=
      - OPENAI_TOKEN=
```
Run :
```shell
docker compose up
```

## Usage with source code
Fill the `.env` file  
Execute :
```shell
npm install # install dependencies
node index.js # run the code
```
