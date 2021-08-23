function download(url, name) {
  let tmp = document.createElement('a')
  tmp.href = url
  tmp.download = name
  tmp.click()
}

export { download }
