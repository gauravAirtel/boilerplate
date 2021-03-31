require('../../index');
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const mongoUserDao = new (require('../../app/lib/dao/mongo/userDao'));
const userService = require("../../app/lib/modules/user/userService");
const Data = require('../data');
describe("userService", function () {
    const signupData = Data.USER_SIGNUP_DATA;

    describe("signup", function () {
        it("should add a new user to the db", async function () {
            const stub = sinon.stub(mongoUserDao, "signup").returns(signupData);
            const user = await userService.signup(signupData);
            expect(stub.calledOnce).to.be.true;
            expect(user.name).to.equal(signupData.name);
            expect(user.email).to.equal(signupData.email);
            expect(user.countryCode).to.equal(signupData.countryCode);
            expect(user.mobileNo).to.equal(signupData.mobileNo);
            expect(user.createdAt).to.equal(signupData.createdAt);
            expect(user.updatedAt).to.equal(signupData.updatedAt);
        });
    });
});