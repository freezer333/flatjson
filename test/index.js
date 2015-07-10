expect = require('chai').expect;
should = require('chai').should;
flatten = require('..');

var test = {
    parent1: {
        child1: {
            child11: 10, 
            child12: 11
        }, 
        child2: {
            child21: 20, 
            child22: 21
        }
    }, 
    parent2 : {
        child1: {
            child11: 101, 
            child21: 102
        }
    }
}

describe("flatten json", function() {
   describe("default behavior", function() {
       it("should flatten a nested object", function(){
            var results = flatten(test);
            expect(results).to.have.a.property("parent1.child1.child11", 10);
            expect(results).to.have.a.property("parent1.child1.child12", 11);
            expect(results).to.have.a.property("parent1.child2.child21", 20);
            expect(results).to.have.a.property("parent1.child2.child22", 21);
            expect(results).to.have.a.property("parent2.child1.child11", 101);
            expect(results).to.have.a.property("parent2.child1.child21", 102);
            expect(Object.keys(results).length).to.equal(6);
       });
       it("should not crash on empty objects", function(){
            var results = flatten({});
            expect(Object.keys(results).length).to.equal(0);
       });

       it("should not serialize functions", function(){
            var results = flatten({
                value: 0, func : function() {console.log("foo")}
            });
            expect(Object.keys(results).length).to.equal(1);
       });
       it("should honor filters", function(){
            var results = flatten({
                value: 0, skip: 1, func : function() {console.log("foo")}
            }, ".", function(key, item) { 
                    if (key == "skip" || typeof(item)=='function') return false;
                    return true;
                });
            expect(Object.keys(results).length).to.equal(1);
       });
   });

   describe("behavior with custom delimiter", function() {
       it("should flatten a nested object", function(){
            var results = flatten(test, "-");
            expect(results).to.have.a.property("parent1-child1-child11", 10);
            expect(results).to.have.a.property("parent1-child1-child12", 11);
            expect(results).to.have.a.property("parent1-child2-child21", 20);
            expect(results).to.have.a.property("parent1-child2-child22", 21);
            expect(results).to.have.a.property("parent2-child1-child11", 101);
            expect(results).to.have.a.property("parent2-child1-child21", 102);
            expect(Object.keys(results).length).to.equal(6);
       });
   });


});