process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

import { client, xml } from '@xmpp/client'
import readline from 'readline'

const username = 'user1'
const password = 'secret1'
const to = 'user2@localhost'

const xmpp = client({
  service: 'xmpps://localhost:5223',
  domain: 'localhost',
  username,
  password,
})

xmpp.on('error', (err) => {
  console.error('❌ XMPP Error:', err)
})

xmpp.on('online', async (address) => {
  console.log(`✅ Connected as ${address.toString()}`)
  await xmpp.send(xml('presence'))

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.on('line', async (line) => {
    const message = xml(
      'message',
      { type: 'chat', to },
      xml('body', {}, line)
    )
    await xmpp.send(message)
  })
})

xmpp.on('stanza', (stanza) => {
  if (stanza.is('message') && stanza.getChildText('body')) {
    const from = stanza.attrs.from
    const body = stanza.getChildText('body')
    console.log(`📨 ${from}: ${body}`)
  }
})

xmpp.start().catch(console.error)
