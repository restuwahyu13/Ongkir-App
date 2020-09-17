const zlib = require('zlib')

/**
 * @description custom compression content encoding
 */

module.exports = () => {
  return (req, res, next) => {
    const compressType = req.headers['accept-encoding'].replace(/[,]/g, '').split(' ')

    if (compressType[0] !== undefined && compressType[0] !== null) {
      zlib.createGzip({
        level: zlib.constants.Z_BEST_COMPRESSION,
        strategy: zlib.constants.Z_RLE,
        flush: zlib.constants.Z_FULL_FLUSH
      })
      return next()
    }

    if (compressType[1] !== undefined && compressType[1] !== null) {
      zlib.createDeflate({
        level: zlib.constants.Z_BEST_COMPRESSION,
        strategy: zlib.constants.Z_RLE,
        flush: zlib.constants.Z_FULL_FLUSH
      })
      return next()
    }

    if (compressType[2] !== undefined && compressType[2] !== null) {
      zlib.createBrotliCompress({
        flush: zlib.constants.BROTLI_OPERATION_FLUSH
      })
      return next()
    }
  }
}
