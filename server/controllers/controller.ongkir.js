const request = require('request-promise')

exports.cityController = async (req, res, next) => {
  res.setHeader('Accept', 'application/json')
  res.setHeader('Content-Type', 'application/json')

  const data = await request.get(`${process.env.RO_CITY_URL}=${process.env.RO_KEY}`)
  return res.status(200).json({
    method: req.method,
    status: res.statusCode,
    data: JSON.parse(data)
  })
}

exports.provController = async (req, res, next) => {
  res.setHeader('Accept', 'application/json')
  res.setHeader('Content-Type', 'application/json')

  const data = await request.get(`${process.env.RO_PROV_URL}=${process.env.RO_KEY}`)
  return res.status(200).json({
    method: req.method,
    status: res.statusCode,
    data: JSON.parse(data)
  })
}

exports.kabController = async (req, res, next) => {
  res.setHeader('Accept', 'application/json')
  res.setHeader('Content-Type', 'application/json')

  const { cityid, provid } = req.query
  const url = `${process.env.RO_CITY_URL}=${process.env.RO_KEY}&id=${cityid}&province=${provid}`

  const data = await request.get(url)
  return res.status(200).json({
    method: req.method,
    status: res.statusCode,
    data: JSON.parse(data)
  })
}

exports.constController = async (req, res, next) => {
  res.setHeader('Accept', 'application/json')
  res.setHeader('Content-Type', 'application/json')

  const { from, to, weight, courier } = req.body
  const data = await request.post({
    url: process.env.RO_COST_URL,
    headers: { key: process.env.RO_KEY },
    form: { origin: from, destination: to, weight: weight * 1000, courier }
  })

  if (data) {
    return res.status(200).json({
      method: req.method,
      status: res.statusCode,
      data: JSON.parse(data)
    })
  }
}
