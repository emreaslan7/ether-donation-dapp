const { expect } = require("chai");

const { ethers, waffle } = require("hardhat");

describe("Donation", () => {

    beforeEach( async () => {
        [signer1, signer2, signer3] = await ethers.getSigners();

        Donation = await ethers.getContractFactory("Donation",signer1);
        donation = await Donation.deploy();
    });


    describe('receive', function () {

        it('transfer ethers to the contract', async function () {
            const provider = waffle.provider;
            
            await signer2.sendTransaction({
                to: donation.address,
                value: "100"
            })

            expect(await provider.getBalance(donation.address)).to.equal('100');

        })
    });

    describe('getTotalDonations', function () {

        it('returns the total donations from contract', async function () {

            const provider = waffle.provider;
            
            await signer2.sendTransaction({
                to: donation.address,
                value: "100"
            })

            await signer1.sendTransaction({
                to: donation.address,
                value: "200"
            })

            await signer3.sendTransaction({
                to: donation.address,
                value: "400"
            }) 
            
            expect(await donation.connect(provider).getTotalDonations()).to.equal('700');


        })
    });

    describe('getDonations', function () {

        it('returns the donations from contract', async function () {

            const provider = waffle.provider;
            
            await signer2.sendTransaction({
                to: donation.address,
                value: "100"
            })

            await signer3.sendTransaction({
                to: donation.address,
                value: "200"
            })

            const donations = await donation.connect(provider).getDonations()
            
            expect(donations[0].donor).to.equal(signer2.address);
            expect(donations[1].donor).to.equal(signer3.address);
            expect(donations[0].amount).to.equal("100");
            expect(donations[1].amount).to.equal("200");
        })
    });


});    