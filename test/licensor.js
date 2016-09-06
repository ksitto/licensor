var assert = require('assert')

describe('Licensor', function() {
    var Licensor = require('../licensor.js');
    var l = new Licensor('super secret'); 
    
    describe('#generateLicense', function() {
        it('should create a license', function() {
            l.generateLicense( { foo: 'bar' }, function( license ) {
                assert.equal('55308138209b2dce38b0e84539ada544918c74405ca702e06fd869689f9e1a8b', license.key);
            } )                        
        })
    })

    describe('#verifyLicense', function() {
        it('should verify a license', function() {
            l.generateLicense( { foo: 'bar' }, function( license ) {
                l.verifyLicense(license, function(result) {
                    assert.equal(true, result);
                })
            })
        }),
        it('should verify a license with a future expiration', function() {
            l.generateLicense( { foo: 'bar', expiration: "2525-01-01" }, function( license ) {
                l.verifyLicense(license, function(result) {
                    assert.equal(true, result);
                })
            })
        }),
        it('should reject a license with a past expiration', function() {
            l.generateLicense( { foo: 'bar', expiration: "2000-01-01" }, function( license ) {
                l.verifyLicense(license, function(result) {
                    assert.equal(false, result);
                })
            })
        })
    })    

})