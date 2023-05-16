// add the chat iframe
const injectBot = config => {
  let isChatIframeLoaded = false
  //
  const toggleChat = () => {
    const chatWindow = document.querySelector('#iframe-div')
    const chatIframe = document.querySelector('#chat-iframe')
    const isChatOpen = chatWindow.style.display === 'block'
    chatWindow.style.display = isChatOpen ? 'none' : 'block'
    chatWindow.style.width = '30vw'
    chatWindow.style.height = '60%'
    chatIframe.style.width = '30vw'
    if (!isChatOpen) startChat()
  }
  //
  const startChat = () => {
    const chatIframe = document.querySelector('#chat-iframe')
    chatIframe.contentWindow.postMessage({ action: 'event', payload: { type: 'proactive-trigger', channel: 'web', payload: { text: 'START_CHAT' } } }, '*')
  }
  // botpressIframeDiv
  const botpressIframeDiv = document.createElement('div')
  botpressIframeDiv.style.display = 'none'
  botpressIframeDiv.setAttribute('id', 'iframe-div')
  document.body.append(botpressIframeDiv)

  // iframe
  const iframe = document.createElement('iframe')
  iframe.setAttribute('id', 'chat-iframe')
  iframe.setAttribute('frameBorder', 0)
  iframe.src = config.botpressIframeSrc
  botpressIframeDiv.append(iframe)

  // chatToggle
  const chatToggle = document.createElement('div')
  chatToggle.style.display = 'block'
  chatToggle.setAttribute('id', 'chat-icon-toggle')
  document.body.append(chatToggle)

  // chatIconOpenImg
  const chatIcon = document.createElement('img')
  chatIcon.src = config.icon
  chatIcon.style.height = '80px'
  chatIcon.style.width = '80px'
  chatIcon.style.display = 'none'
  chatIcon.addEventListener('click', toggleChat)
  chatToggle.append(chatIcon)

  window.addEventListener('message', message => {
    //console.log(message)
    // make the bot auto start the conversation when the webchat is ready
    if (message.data.name && message.data.name.includes('webchatReady')) {
      setTimeout(() => {
        chatIcon.style.display = 'block'
      }, 300)
    }
    // on clicking restart button, we need to reload the iframe
    if (message.data.message_type === 'session_reset') {
      var iframe = document.getElementById('chat-iframe')
      iframe.src = iframe.src
    }
    // close the iframe and teaser on click of close button in the chat iframe
    if (message.data?.payload?.payload === 'END_CHAT_CLOSE_WINDOW') {
      chatIconOpenImg.style.display = 'none'
      isChatIframeLoaded = false
      var iframe = document.getElementById('chat-iframe')
      iframe.src = iframe.src
    }
    if (message.data.task) {
      if (message.data.task === 'endchatendbutton') {
        chatIconOpenImg.style.display = 'none'
        isChatIframeLoaded = false
        var iframe = document.getElementById('chat-iframe')
        iframe.src = iframe.src
      }
    }
  })
}

