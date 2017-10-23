const hooks = {
  onBeforeEachTest: function(done) {
    cordova.plugin.http.acceptAllCerts(false, done, done);
  }
};

const helpers = {
  acceptAllCerts: function(done) { cordova.plugin.http.acceptAllCerts(true, done, done); }
};

const tests = [
  {
    description: 'should reject self signed cert (GET)',
    expected: 'rejected: {"status":-1,"error":"cancelled"}',
    func: function(resolve, reject) { cordova.plugin.http.get('https://self-signed.badssl.com/', {}, {}, resolve, reject); },
    validationFunc: function(driver, result) {
      result.type.should.be.equal('rejected');
      result.data.should.be.eql({ status: -1, error:'cancelled' });
    }
  },{
    description: 'should reject self signed cert (PUT)',
    expected: 'rejected: {"status":-1,"error":"cancelled"}',
    func: function(resolve, reject) { cordova.plugin.http.put('https://self-signed.badssl.com/', { test: 'testString' }, {}, resolve, reject); },
    validationFunc: function(driver, result) {
      result.type.should.be.equal('rejected');
      result.data.should.be.eql({ status: -1, error:'cancelled' });
    }
  },{
    description: 'should reject self signed cert (POST)',
    expected: 'rejected: {"status":-1,"error":"cancelled"}',
    func: function(resolve, reject) { cordova.plugin.http.post('https://self-signed.badssl.com/', { test: 'testString' }, {}, resolve, reject); },
    validationFunc: function(driver, result) {
      result.type.should.be.equal('rejected');
      result.data.should.be.eql({ status: -1, error:'cancelled' });
    }
  },{
    description: 'should reject self signed cert (PATCH)',
    expected: 'rejected: {"status":-1,"error":"cancelled"}',
    func: function(resolve, reject) { cordova.plugin.http.patch('https://self-signed.badssl.com/', { test: 'testString' }, {}, resolve, reject); },
    validationFunc: function(driver, result) {
      result.type.should.be.equal('rejected');
      result.data.should.be.eql({ status: -1, error:'cancelled' });
    }
  },{
    description: 'should reject self signed cert (DELETE)',
    expected: 'rejected: {"status":-1,"error":"cancelled"}',
    func: function(resolve, reject) { cordova.plugin.http.delete('https://self-signed.badssl.com/', {}, {}, resolve, reject); },
    validationFunc: function(driver, result) {
      result.type.should.be.equal('rejected');
      result.data.should.be.eql({ status: -1, error:'cancelled' });
    }
  },{
    description: 'should accept bad cert (GET)',
    expected: 'resolved: {\"status\":200, ...',
    before: helpers.acceptAllCerts,
    func: function(resolve, reject) { cordova.plugin.http.get('https://self-signed.badssl.com/', {}, {}, resolve, reject); },
    validationFunc: function(driver, result) {
      result.type.should.be.equal('resolved');
      result.data.should.include({ status: 200 });
    }
  },{
    description: 'should accept bad cert (PUT)',
    expected: 'rejected: {\"status\":405, ... // will be rejected because PUT is not allowed',
    before: helpers.acceptAllCerts,
    func: function(resolve, reject) { cordova.plugin.http.put('https://self-signed.badssl.com/', { test: 'testString' }, {}, resolve, reject); },
    validationFunc: function(driver, result) {
      result.type.should.be.equal('rejected');
      result.data.should.include({ status: 405 });
    }
  },{
    description: 'should accept bad cert (POST)',
    expected: 'rejected: {\"status\":405, ... // will be rejected because POST is not allowed',
    before: helpers.acceptAllCerts,
    func: function(resolve, reject) { cordova.plugin.http.post('https://self-signed.badssl.com/', { test: 'testString' }, {}, resolve, reject); },
    validationFunc: function(driver, result) {
      result.type.should.be.equal('rejected');
      result.data.should.include({ status: 405 });
    }
  },{
    description: 'should accept bad cert (PATCH)',
    expected: 'rejected: {\"status\":405, ... // will be rejected because PATCH is not allowed',
    before: helpers.acceptAllCerts,
    func: function(resolve, reject) { cordova.plugin.http.patch('https://self-signed.badssl.com/', { test: 'testString' }, {}, resolve, reject); },
    validationFunc: function(driver, result) {
      result.type.should.be.equal('rejected');
      result.data.should.include({ status: 405 });
    }
  },{
    description: 'should accept bad cert (DELETE)',
    expected: 'rejected: {\"status\":405, ... // will be rejected because DELETE is not allowed',
    before: helpers.acceptAllCerts,
    func: function(resolve, reject) { cordova.plugin.http.delete('https://self-signed.badssl.com/', {}, {}, resolve, reject); },
    validationFunc: function(driver, result) {
      result.type.should.be.equal('rejected');
      result.data.should.include({ status: 405 });
    }
  },{
    description: 'should fetch data from http://google.com/ (GET)',
    expected: 'resolved: {\"status\":200, ...',
    before: helpers.acceptAllCerts,
    func: function(resolve, reject) { cordova.plugin.http.get('http://google.com/', {}, {}, resolve, reject); },
    validationFunc: function(driver, result) {
      result.type.should.be.equal('resolved');
      result.data.should.include({ status: 200 });
    }
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { tests: tests, hooks: hooks };
}
