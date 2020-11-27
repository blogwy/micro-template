export default http => ({
  // example
  microList: {
    permission: 'GET,/micro/info/',
    request: data =>
      http.get('/micro/info/', data)
  }
})
