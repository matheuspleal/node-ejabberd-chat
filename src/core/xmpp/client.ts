import { client, xml } from '@xmpp/client'

export const xmpp = client({
  service: 'xmpps://ejabberd:5223',
  domain: 'localhost',
  username: 'user',
  password: 'secret',
})

xmpp.on('error', err => {
  console.error('❌ XMPP Error:', err)
})

xmpp.on('online', async address => {
  console.log(`✅ Connected as ${address.toString()}`)
  await xmpp.send(xml('presence'))
  const message = xml(
    'message',
    { type: 'chat', to: 'user2@localhost' },
    xml('body', {}, 'Olá de Node.js com TypeScript!')
  )
  await xmpp.send(message)
})
