const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server"); // Ensure server is exported in server.js
const Cat = require("../models/cat");

chai.use(chaiHttp);
const { expect } = chai;

describe("Cat API", () => {
    beforeEach(async () => {
        // Clean DB before each test
        await Cat.deleteMany({});
    });

    it("should GET all cats", (done) => {
        chai.request(app)
            .get("/api/cat")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object");
                expect(res.body.data).to.be.an("array");
                done();
            });
    });

    it("should POST a new cat with rollback on failure", (done) => {
        const cat = { title: "Test Cat", path: "path/to/image" };

        chai.request(app)
            .post("/api/cat")
            .send(cat)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(201);

                // Rollback logic: Delete created cat
                Cat.findOneAndDelete({ title: "Test Cat" }, (err) => {
                    if (err) done(err);
                    done();
                });
            });
    });

    it("should DELETE a cat", (done) => {
        const cat = new Cat({ title: "Cat to Delete", path: "path/to/image" });
        cat.save().then(() => {
            chai.request(app)
                .delete(`/api/cat/${cat._id}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});
