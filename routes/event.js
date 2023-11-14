var express = require("express");
var router = express.Router();

const eventSchema = require("../model/events.model");
const eventvalidation = require("../middleware/validation")
router.post("/add",eventvalidation.validateEvent, async (req, res) => {
  try {
    const newEvent = eventSchema(req.body);
    await newEvent
      .save()
      .then((saveEvent) => {
        console.log(saveEvent);
        res.status(201).json({ message: "Event Saved Successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(
          (500).json({
            message: "Cannot save the Event. Internal Server Error",
          })
        );
      });
  } catch (err) {
    console.log(err);
    res.status(
      (500).json({ message: "Cannot save the Event. Internal Server Error" })
    );
  }
});

//Get Request
router.get("/not-over", async (req, res) => {
  try {
    const currentDate = new Date();
   await  eventSchema
      .find({ on: { $gte: currentDate } })
      .then((response) => {
        console.log(response);
        res.status(200).json({ events: response, Count: response.length });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Unable to Get Event" });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to Get Event" });
  }
});

//Get Details Using id
router.get("/eventID/:id", async (req, res) => {
  try {
    const idQuery = req.params.id;
   await  eventSchema
      .findById(idQuery)
      .then((response) => {
        console.log(response);
        res.status(200).json({ events: response, Count: response.length });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Unable to Get Event" });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to Get Event" });
  }
});

//Get details for date
router.get("/between-dates", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
   await  eventSchema
      .find({ on: { $gte: startDateObj, $lte: endDateObj } })
      .then((response) => {
        console.log(response);
        res.status(200).json({ events: response, Count: response.length });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Unable to Get Event" });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to Get Event" });
  }
});

//Uppdate By ID
router.put("/update/:id", async (req, res) => {
  try {
    const idQuery = req.params.id;
    const eventUpdateData = {
      title: req.body.title,
      details: req.body.details,
      on: req.body.on,
      venue: req.body.venue,
      registrationLink: req.body.registrationLink,
    };

   await eventSchema
      .findByIdAndUpdate(idQuery, eventUpdateData, { new: true })
      .then((response) => {
        console.log(response);
        res.status(200).json({
          message: "Updated Successfully",
          events: response,
          Count: response ? 1 : 0,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Unable to Update Event" });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to Update Event" });
  }
});

//Delete By ID

router.delete('/delete', async(req, res)=> {
    try{
        const idQuery=req.query.id;
        await eventSchema.findByIdAndDelete(idQuery)
        .then((response)=>{
            console.log(response)
            res.status(200).json({events:response,message:"Deleted Sucessfully"})
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({message:"Unable to Get Event"})
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Unable to Get Event"})
    }
});

module.exports = router;
