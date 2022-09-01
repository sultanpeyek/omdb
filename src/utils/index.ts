export const capitalizeText = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const isValidUrl = (url: string) => {
  return (
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
      url,
    ) && !url.includes('data:')
  )
}

export const addToLocalStorage: any = (newData: any) => {
  const oldLocaleStorageData: any = localStorage.getItem('movies')
  const oldLocaleStorageDataParsed: any = JSON.parse(oldLocaleStorageData) || []
  const newLocaleStorageData: any = oldLocaleStorageDataParsed.concat(newData)

  const newLocaleStorageDataUnique: any = newLocaleStorageData.filter(
    (item: any, index: any) =>
      newLocaleStorageData.findIndex(
        (item2: any) => item2.imdbID === item.imdbID,
      ) === index,
  )

  const newLocaleStorageDataSanitized: any = newLocaleStorageDataUnique.filter(
    (item: any) => item !== null,
  )

  localStorage.setItem('movies', JSON.stringify(newLocaleStorageDataSanitized))
}

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export const shimmer = (w: number, h: number) =>
  'data:image/svg+xml;base64,' +
  toBase64(`
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`)
