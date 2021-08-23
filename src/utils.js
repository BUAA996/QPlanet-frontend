function download(url, name) {
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob)
      let tmp = document.createElement('a')
      tmp.href = url
      tmp.download = name
      tmp.click()
    })
}

export { download }
