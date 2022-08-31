export const capitalizeText = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

// check string if valid url
export const isValidUrl = (url: string) => {
  return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
    url,
  )
}
