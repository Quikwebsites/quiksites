
exports.ping = (req, res) => {
    res.status(200).json({mssg: "Server OK"})
}

exports.protectedPing = (req, res) => {
    console.log("Request for protected ping access: ", req)
    res.status(200).json({mssg: "Protected Ping"})
}

exports.adminPing = (req, res) => {
    res.status(200).json({mssg: "Admin Ping"})
}

