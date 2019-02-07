var chai = require('chai');
var expect = chai.expect;
var assert = require('assert');
var helper = require('../crypto');

describe('test password hash', function () {
    it('when password is parsed in the hashPassword function the output should be a hash plus salt', function () {
       var password = 'newPass123';
       var callback = (response)=>console.log('res',response)
        var hash = helper.hashPassword(password,callback)
        expect(hash.length).to.eql(hash.length > password.length);
    })

});