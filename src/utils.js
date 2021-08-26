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

function getLocation(ipAddress, setAddress) {
  fetch('https://restapi.amap.com/v5/ip?type=4&ip=' + ipAddress + '&key=0ced8e61a15e78d5ec9fb5142d6823ab').then((res) => {
    res.json().then((data) => {
      console.log(data);
      setAddress(data.province + data.district)
    }) 
  })
}

export { download, getLocation }
