const app = require('./server/app')
const http = require('http').createServer(app)
const cluster = require('cluster')
const coreThread = require('os').cpus()

/**
 * @description this method for use many core cpu in my local machine, for increase
 *  performance in Nodejs application, because Nodejs is running in single threads mode
 */

// run cluster mode
if (cluster.isMaster) {
  // get core many cpu in my local machine
  for (let i = 0; i < coreThread.length; i++) {
    cluster.fork()
  }

  // extract many cpu in local machine
  const workersTread = []
  for (const id in cluster.workers) {
    workersTread.push(id)
  }

  // send message to worker master if any worker died based on process id
  workersTread.forEach(async (pid, _) => {
    await cluster.workers[pid].send({
      from: 'isMaster',
      type: 'SIGKILL',
      message: 'cleanup is worker dead and change to new worker'
    })
  })

  // notify worker active and worker dead
  if (process.env.NODE_ENV !== 'production') {
    cluster.on('online', (worker) => {
      if (worker.isConnected()) {
        console.log(`worker active pid: ${worker.process.pid}`)
      }
    })

    cluster.on('exit', (worker, code, signal) => {
      if (worker.isDead()) {
        console.log(`worker dead pid: ${worker.process.pid}`)
      }
      cluster.fork()
    })

    cluster.on('message', (worker, { from, message }) => {
      console.log(`From: ${from} - Worker: ${worker.process.pid} - Message: ${message}`)
    })
  }
} else {
  // if the worker dies, execute this process and create new worker
  if (cluster.isWorker) {
    process.on('message', (msg) => {
      if (msg.from === 'isMaster' && msg.type === 'SIGKILL') {
        process.send({
          from: 'isWorker',
          message: `yes my lord ${msg.from}`
        })
      }
    })
    process.on('exit', () => {
      process.exit(process.exitCode)
    })
  }
  // listening server port
  http.listen(process.env.PORT, () => console.log(`server is running on ${process.env.PORT}`))
}
