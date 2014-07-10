  var request = require('request'),
      vows = require('vows'),
      assert = require('assert');

  var suite = vows.describe('Fleetpro REST API testing');
  
  var url = "http://localhost:9010/stillclimbing/rest/";
  
  console.log("URL: "+url);

  suite.addBatch({
          "get wikipedia by title": {
              topic: function () {
                  request({
                      uri: url + 'wikipediaApi',
                      qs: {title:"EMI"},
                      method: 'GET',
                      headers: {
                          'Content-Type': 'application/json',
                          'cookie':  "sessionId=sessionId;userId=userId",
                      }
                  }, this.callback)
              },
              "should respond with 200": function (err, res, body) {
                  assert.equal(res.statusCode, 200);
              },
              "should respond with success": function (err, res, body) {
                  var result = JSON.parse(body);
                  assert.ok(result.query.pages);
              }
          },
          
          /*
          "sample post": {
              topic: function () {
                  request({
                      uri: url + 'cardAccount',
                      method: 'POST',
                      body: JSON.stringify({
                          username: "xiaomingt@telenav.com",
                          password: "801124",
                      }),
                      headers: {
                          'Content-Type': 'application/json'
                      }
                  }, this.callback)
              },
              "should respond with 200": function (err, res, body) {
                  assert.equal(res.statusCode, 200);
              },
              "should respond with success": function (err, res, body) {
                  var result = JSON.parse(body);
                  assert.ok(result.billGroups[0].customers[0].drivers);
              }
          }
          */
  });
  
  
  suite.export(module);