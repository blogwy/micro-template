export default http => ({
  // example
  microList: {
    permission: 'GET,/micro/info/',
    request: (data, success, fail) =>
      http.getRes('/micro/info/', data, success, fail)
  }
})
