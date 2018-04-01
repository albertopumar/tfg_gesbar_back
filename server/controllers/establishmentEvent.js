var Establishment = require("../data/establishment");

var router = require("express").Router();
router.route("/establishment").get(eventsEstablishments);


function eventsEstablishments(req, res) {

    Establishment.find({_id: { $in : req.user.establishments }}, function(err, establishments) {
        if (err)
            res.send(err);
        else {
            const data = JSON.stringify(establishments);

            res.set({
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-store",
                "Access-Control-Allow-Origin": "*"
            });

            res.write("retry: 5000\n");

            let timeoutId = 0;
            let f = function () {
                res.write("data: " + data + "\n\n");
                timeoutId = setTimeout(f, 5000);
            };

            f();

            res.on("close", function () {
                clearTimeout(timeoutId);
            });
        }
    });
}

module.exports = router;