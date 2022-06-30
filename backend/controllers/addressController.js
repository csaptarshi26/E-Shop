import asyncHandler from "express-async-handler";
import Address from "../models/addressModel.js";

//@desc Fetch user address
//@route GET /api/address
//@access private
const getMyAddress = asyncHandler(async (req, res) => {
  const address = await Address.find({ user: req.user._id });
  res.json(address);
})


//@desc Fetch user address by id
//@route GET /api/address/:id
//@access private
const getMyAddressById = asyncHandler(async (req, res) => {
  const address = await Address.findById(req.params.id);
  res.json(address);
})


//@desc Create user address
//@route POST /api/address
//@access private
const createMyAddress = asyncHandler(async (req, res) => {
  const {
    name,
    mobileNum,
    locality,
    address,
    city,
    state,
    landmark,
    postalCode,
    country
  } = req.body;

  if (!name || !mobileNum || !address || !city || !postalCode || !country) {
    res.status(400);
    throw new Error('Name, Mobile Number, Address, City,Pin Code, Country is required');
  } else {
    const newAddress = new Address({
      user: req.user._id,
      name,
      mobileNum,
      locality,
      address,
      city,
      state,
      landmark,
      postalCode,
      country
    })
    const createdAddress = await newAddress.save();
    res.status(201).json(createdAddress)
  }

})




export {
  getMyAddress,
  createMyAddress,
  getMyAddressById
}