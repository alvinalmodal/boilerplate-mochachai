const chai = require("chai");
const assert = chai.assert;

const server = require("../server");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("Integration tests with chai-http", function () {
    // #1
    test("Test GET /hello with no name", function (done) {
      chai
        .request(server)
        .get("/hello")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello Guest");
          done();
        });
    });
    // #2
    test("Test GET /hello with your name", function (done) {
      chai
        .request(server)
        .get("/hello?name=alvin almodal")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello alvin almodal");
          done();
        });
    });
    // #3
    test('send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put("/travellers")
        .send({ surname: "Colombo" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.name, "Cristoforo");
          assert.equal(res.body.surname, "Colombo");
          assert.equal(res.body.dates, "1451 - 1506");
          done();
        });
    });
    // #4
    test('send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .put("/travellers")
        .send({ surname: "da Verrazzano" })
        .end(function (err, res) {
          console.log(res.body);
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.name, "Giovanni");
          assert.equal(res.body.surname, "da Verrazzano");
          assert.equal(res.body.dates, "1485 - 1528");
          done();
        });
    });
  });

  const Browser = require("zombie");

  if (process.env.DEV) {
    Browser.localhost("example.com", process.env.PORT || 3000);
  } else {
    Browser.site = "https://fcc-mochachai.herokuapp.com";
  }

  suite("Functional Tests with Zombie.js", function () {
    const browser = new Browser();
    suiteSetup(function (done) {
      return browser.visit("/", done);
    });

    suite('"Famous Italian Explorers" form', function () {
      // #5
      test('submit "surname" : "Colombo" - write your e2e test...', function (done) {
        browser.fill("surname", "Colombo");
        browser.pressButton("submit", function () {
          assert.equal(browser.query("#surname").innerHTML, "Colombo");

          done();
        });
      });
      // // #6
      // test('submit "surname" : "Vespucci" - write your e2e test...', function (done) {
      //   assert.fail();

      //   done();
      // });
    });
  });
});
