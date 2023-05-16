const FULLSCREEN = 'fullscreen'
const EXIT_FULLSCREEN = 'exitfullscreen'
const END_SESSION = 'END_CHAT_CLOSE_WINDOW'

const chatWindow = document.querySelector('#iframe-div')
const chatIframe = document.querySelector('#chat-iframe')

window.addEventListener('message', message => {
  console.log(message)
  if (message.data.task === FULLSCREEN) handleToggleFullScreen(true)
  if (message.data.task === EXIT_FULLSCREEN) handleToggleFullScreen()
})

const handleToggleFullScreen = isFullScreen => {
  chatWindow.style.width = isFullScreen ? '55vw' : '30vw'
  chatWindow.style.height = isFullScreen ? '80%' : '60%'
  chatIframe.style.width = isFullScreen ? '55vw' : '30vw'
}

const endSession = () => {
  isMute = true
  chatIframe.contentWindow.postMessage({ action: 'event', payload: { type: 'end-trigger', channel: 'web', payload: { text: END_SESSION } } }, '*')
}
