const axios = require('axios');
require('dotenv').config();

let discordToken = process.env.DISCORD_TOKEN
let discordChannel = process.env.DISCORD_CHANNEL
let gpt3Token = process.env.OPENAI_TOKEN
let interval = 3000
let discordCountMessages = 15
let discordPseudo = process.env.DISCORD_PSEUDO
let gpt3Prompt = `Repond a la place de ${discordPseudo} a la derniere ligne dans cette conversation :`

let gpt3Address = 'https://api.openai.com/v1'
let gpt3Model = 'text-davinci-003'

let discordUrl = "https://discord.com/api"

let last = null

/**
 * Get n messages from a discord channel if new messages has arrived
 * @returns {Promise<string|null>}
 */
async function getDiscordConversation() {
    let url = `${discordUrl}/channels/${discordChannel}/messages?limit=${discordCountMessages}`

    let data = (await axios.get(
        url,
        {
            headers: {
                Authorization: discordToken
            }
        }
    )).data


    let message = ""

    let notMine = data.filter(m => m.author.username !== discordPseudo)
    if(last === notMine[0].id)
        return null
    if(last == null){
        last = notMine[1].id
        return null
    }
    last = notMine[0].id

    for(let m of data.reverse()){
        let content = m.author.username + ': ' + m.content
        message += content + '\n'
    }

    return message
}

/**
 * Send message to the discord channel
 * @param message
 * @returns {Promise<void>}
 */
async function sendDiscordMessage(message){
    let url = `${discordUrl}/channels/${discordChannel}/messages`

    if(!message || message.trim() === "")
        return

    await axios.post(url,
        {
            content: message
        },
        {
            headers: {
                Authorization: discordToken
            }
        }
        )
}

/**
 * Get openai answer to the lists of messages
 * @param message
 * @returns {Promise<*>}
 */
async function getOpenAIAnswer(message){
    let url = `${gpt3Address}/completions`

    message = `${gpt3Prompt} ${message}`

    let data = (await axios.post(url, {
        model: gpt3Model,
        prompt: message,
        max_tokens: 2000,
    }, {
        headers: {
            Authorization: `Bearer ${gpt3Token}`
        }
    })).data

    return data.choices[0].text
}

/**
 * Check if new messages on discord, get the openai answer and send the message
 * @returns {Promise<void>}
 */
async function check(){
    try{
        let message = await getDiscordConversation()
        if(message == null)
            return

        console.log(`Message: ${message}`)
        let answer = await getOpenAIAnswer(message)

        console.log(`ChatGPT: ${answer}`)

        await sendDiscordMessage(answer.replace('Fgdou:', ''))
    }catch(e){
        console.error(e)
    }
}

(async () => {
    setInterval(check, interval)
})()