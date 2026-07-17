exports.health = (req, res) => {
    res.json({
        status: "OK",
        message: "Backend Connected Successfully 🚀"
    });
};