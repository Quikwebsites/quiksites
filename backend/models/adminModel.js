const mongoose = require('mongoose')
const Schema = mongoose.Schema

const request = {
    email: {
        type: String,
        default: "",
    },
    active: {
        type: Boolean,
        default: false,
    }   
}

// User pages must contain the email and the password
const adminSchema = new Schema({
    adminIdentifier: {
        type: String,
        required: true,
        default: "admin-identifier"
    },
    websiteTraffic: {
        type: [Number], // Array of time stamps
        default: []
    }, 
    lifetimeValue: { // Value by month
        type: [{}], // Array of key-value pair objects {month/year, value}
        default: []
    },
    subscriptionActivations: { // Keeps track of every time a subscription was added
        type: [Number], // Array of time stamps
        default: []
    },
    subscriptionCancellations: { // Tracks every time a subscription was cancelled
        type: [Number], // Array of time steps
        default: []
    },
    conversionRates: {
        type: {},
        default: {
            "Only Visited": 0,
            "Created Account": 0,
            "Basic Subscription": 0,
            "Premium Subscription": 0,
        }
    },
    requests: {
        type: [request],
        default: [],
    },
})

// Creates an empty admin data block within the mongo db
adminSchema.statics.createAdminData = async function() 
{
    // Only one admin can be created at a time
    const adminCount = await this.countDocuments();
    if (adminCount >= 1) {
        throw new Error('An admin object already exists.');
    }

    const admin = await this.create({})
    return admin
}

// Adds website traffic data to the admin document
// The date should be in the format 7/1/2024 and it should be a string
// The trafficAmount is an integer representing the number of active users for that date
adminSchema.statics.addTrafficData = async function(timestamp)
{
    const updatedAdmin = await this.findOneAndUpdate(
        { adminIdentifier: "admin-identifier" }, // Find the single admin document
        { $push: {websiteTraffic: timestamp} }, // Push web traffic data
        { new: true } // Return the updated admin object
    )

    return updatedAdmin
}

// Adds lifetime value data to the admin document
// The date should be in the format November 2022 and it should be a string
// The value is an integer representing the value for that month
// This data is used to render a line chart on the admin page
adminSchema.statics.addLifetimeValueData = async function(date, value)
{
    const updatedAdmin = await this.findOneAndUpdate(
        { adminIdentifier: "admin-identifier" }, // Find the single admin document
        { $push: {lifetimeValue: {date, value}} }, // Push lifetime value data
        { new: true } // Return the updated admin object
    )

    return updatedAdmin
}


adminSchema.statics.addSubscriptionActivation = async function(timestamp)
{
    const updatedAdmin = await this.findOneAndUpdate(
        { adminIdentifier: "admin-identifier" }, // Find the single admin document
        { $push: {subscriptionActivations: timestamp} }, // Push time stamp
        { new: true } // Return the updated admin object
    )

    return updatedAdmin
}

adminSchema.statics.addSubscriptionCancellation = async function(timestamp)
{
    const updatedAdmin = await this.findOneAndUpdate(
        { adminIdentifier: "admin-identifier" }, // Find the single admin document
        { $push: {subscriptionCancellations: timestamp} }, // Push churn rate data
        { new: true} // Return the updated admin object
    )

    return updatedAdmin
}

// Increments the conversion rate of a specified user conversion category
// The 'category' value should be one of the following strings
//  - Only Visited
//  - Created Account
//  - Basic Subscription
//  - Premium Subscription
// The value is an integer representing the number to update the category with
// This data is used to render a pie chart on the admin page
adminSchema.statics.incrementConversionRate = async function(category)
{
    const updatedAdmin = await this.findOneAndUpdate(
    { adminIdentifier: "admin-identifier"},
    { 
        $inc: { [`conversionRates.${category}`]: 1 } 
    },
    { new: true }
    )

    return updatedAdmin
}

// Decrements conversion rate of a specified user conversion category
adminSchema.statics.decrementConversionRate = async function(category)
{
    const updatedAdmin = await this.findOneAndUpdate(
    { adminIdentifier: "admin-identifier"},
    { 
        $inc: { [`conversionRates.${category}`]: -1 } 
    },
    { new: true }
    )

    return updatedAdmin
}

// This function adds a request tracker to the admin db
// This tracker will track the request state of the user with the given email
adminSchema.statics.addUserRequestTracker = async function(email)
{
    const request = {
        email: email,
        active: false,
    }

    const updatedAdmin = await this.findOneAndUpdate(
        { adminIdentifier: "admin-identifier" }, // Find the single admin document
        { $push: {requests: request} }, // Push churn rate data
        { new: true} // Return the updated admin object
    )

    return updatedAdmin
}

// This marks a user request as active within the admin db
adminSchema.statics.activateUserRequest = async function(email)
{
    const updatedAdmin = await this.findOneAndUpdate(
        { adminIdentifier: "admin-identifier", "requests.email": email }, // Find the single admin document
        { 
            $set: { "requests.$.active": true} }, // Activate request
        { new: true} // Return the updated admin object
    )

    return updatedAdmin
}

adminSchema.statics.resolveUserRequest = async function(email)
{
    const updatedAdmin = await this.findOneAndUpdate(
        { adminIdentifier: "admin-identifier", "requests.email": email }, // Find the single admin document
        { 
            $set: { "requests.$.active": false} }, // Activate request
        { new: true} // Return the updated admin object
    )

    return updatedAdmin
}

module.exports = mongoose.model('Admin', adminSchema)