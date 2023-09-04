const getUploadURL = src => {
  try {
    const data = typeof src === 'string' ? JSON.parse(src) : src
    // return `${ data.metadata.host }/${ data.id }`
    // const prefix = data.storage === 'store' ? '/' : '/_cache/'
    // return `${ data.metadata.host }${ prefix }${ data.id }`
    // return `https://ignota-archives-scenic-tundra-4052.s3.amazonaws.com/ignota-production-uploads/${ data.id }`
    return `${ __STRUCTUR_URI__ }/shrine/${ data.id }`
  } catch (err) {
    return undefined
  }
}

export default getUploadURL
