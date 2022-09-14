;(function (window, document) {
  function createHttpRequest() {
    if (window.ActiveXObject) {
      return new window.ActiveXObject('Microsoft.XMLHTTP')
    } else if (window.XMLHttpRequest) {
      return new XMLHttpRequest()
    }
  }
  function AliLogTracker(host, project, logstore, config) {
    var trackerKey = config['__topic__'] + config['__source__']
    if (trackerKey in window.initedTrackers) {
      return window.initedTrackers[trackerKey]
    }

    this.uri_ = '//' + project + '.' + host + '/logstores/' + logstore + '/track?APIVersion=0.6.0'
    this.params_ = new window.Array()
    this.config = config
    this.loggerList = []
    this.flushState = null
    window.initedTrackers[trackerKey] = this
  }
  AliLogTracker.prototype = {
    push: function (key, value) {
      if (!key || !value) {
        return
      }
      this.params_.push(new String(key))
      this.params_.push(new String(value))
    },
    logger: function () {
      let log = {}
      while (this.params_.length > 0) {
        let logKey = this.params_.shift()
        let logValue = this.params_.shift()
        log[logKey] = logValue
      }

      this.loggerList.push(log)
      this.params_ = new window.Array()
      this.flush()
    },
    flush: async function () {
      if (this.loggerList.length == 0) {
        return
      }

      // if (this.flushState) {
      //   return
      // }

      var timeOutFuture = null
      try {
        let bodyStr = JSON.stringify({
          ...this.config,
          __logs__: this.loggerList,
        })

        if (bodyStr.length > 5000) {
          console.log('长度超出', bodyStr.length)
          this.loggerList = []
          return
        }

        this.flushState = 'flushing'
        var httpRequest_ = createHttpRequest()
        timeOutFuture = setTimeout(() => {
          if (httpRequest_ && httpRequest_.readyState < 4) {
            httpRequest_.abort()
          }
        }, 3000)
        // todo 上报失败的时候不会捕捉到了
        this.loggerList = []
        httpRequest_.open('POST', this.uri_, true)
        httpRequest_.setRequestHeader('x-log-apiversion', '0.6.0')
        httpRequest_.setRequestHeader('x-log-bodyrawsize', new String(bodyStr.length))
        httpRequest_.send(bodyStr)
      } catch (ex) {
        if (window && window.console && typeof window.console.log === 'function') {
          console.log('Failed to log to ali log service because of this exception:\n' + ex)
        }
      } finally {
        this.flushState = null
        if (timeOutFuture) {
          clearTimeout(timeOutFuture)
        }
      }
    },
  }
  window.Tracker = AliLogTracker
  window.initedTrackers = {}
  // setInterval(() => {
  //   Object.values(window.initedTrackers).forEach(initedTracker => {
  //     initedTracker.flush()
  //   })
  // }, 2000)
})(window, document)
