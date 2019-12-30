import micro from './micro'

export default Http => {
  const modules = {
    micro: new Http('/micro')
  }

  return {
    micro: micro(modules.micro)
  }
}
