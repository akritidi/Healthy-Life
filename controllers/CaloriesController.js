const User = require("../models/User");

const addCal = (req, res, next) => {
  //var name = "alex";
  var name = req.cookies.healthylifesession;
  date = new Date();
  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();
  var cals = 0;
  const fullDate = `${day}/${month}/${year}`;
  User.findOne({ name })
    .then((user) => {
      if (user) {
        let flag = false;
        let flag2 = false;
        for (const calory of user.calories) {
          if (calory.date === fullDate) {
            calory.total = 0;
            for (i of calory.inputs) {
              if (i.foods == req.body.food && i.timezone == req.body.time) {
                i.calPerFood =
                  i.calPerFood +
                  req.body.foodsCal * parseFloat(req.body.quantity);
                i.quantity =
                  parseFloat(i.quantity) + parseFloat(req.body.quantity);
                flag2 = true;
              }
            }
            if (!flag2) {
              calory.inputs.push({
                foods: req.body.food,
                calPerFood: req.body.foodsCal * parseFloat(req.body.quantity),
                quantity: req.body.quantity,
                timezone: req.body.time,
              });
            }
            for (i of calory.inputs) {
              calory.total = calory.total + i.calPerFood;
              cals = calory.total;
            }
            flag = true;
            break;
          }
        }
        if (!flag) {
          user.calories.push({
            date: fullDate,
            total: req.body.foodsCal * parseFloat(req.body.quantity),
            inputs: [
              {
                foods: req.body.food,
                calPerFood: req.body.foodsCal * parseFloat(req.body.quantity),
                quantity: req.body.quantity,
                timezone: req.body.time,
              },
            ],
          });
          cals = req.body.foodsCal * parseFloat(req.body.quantity);
        }

        user.save();
        res.json({ calories: cals });
      }
    })
    .catch((err) => {
      res.json({
        message: "An error occured",
      });
    });
};

const delCal = (req, res, next) => {
  //var name = "alex";
  var name = req.cookies.healthylifesession;
  date = new Date();
  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();
  const foodDel = req.body.foodDel;
  const timeDel = req.body.timeDel;
  const fullDate = `${day}/${month}/${year}`;
  User.findOne({ name })
    .then((user) => {
      if (user) {
        for (const calory of user.calories) {
          if (calory.date === fullDate) {
            for (i of calory.inputs) {
              if (i.foods == foodDel && i.timezone == timeDel) {
                calory.total = calory.total - i.calPerFood;
                cals = calory.total;
                i.calPerFood = 0;
                i.quantity = 0;
              }
            }
          }
        }
        user.save();
        res.json({ calories: cals });
      }
    })
    .catch((err) => {
      res.json({
        message: "An error occured",
      });
    });
};

const giveTable = (req, res, next) => {
  //var name = "alex";
  var name = req.cookies.healthylifesession;
  date = new Date();
  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();
  const fullDate = `${day}/${month}/${year}`;
  User.findOne({ name })
    .then((user) => {
      if (user) {
        for (const calory of user.calories) {
          if (calory.date === fullDate) {
            var array = calory.inputs;
            res.json({
              table: array,
            });
          }
        }
        user.save();
      }
    })
    .catch((err) => {
      res.json({
        message: "An error occured",
      });
    });
};

const takeDate = (req, res, next) => {
  const askedDate = req.body.askedDate;
  //var name = "alex";
  var name = req.cookies.healthylifesession;
  User.findOne({ name })
    .then((user) => {
      if (user) {
        for (var i of user.calories) {
          if (JSON.stringify(i.date) === askedDate) {
            res.json({
              status: true,
              calories: i.total,
            });
            return;
          }
        }
        res.json({
          status: false,
          message: "No calories found",
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "An error occured",
      });
    });
};

const showCal = (req, res, next) => {
  Calories.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured",
      });
    });
};
module.exports = {
  addCal,
  showCal,
  takeDate,
  delCal,
  giveTable,
};
