var Razorpay = require('./razorpay/index.js');
var rzp = new Razorpay('rzp_test_QNKnswM34nBay0', 'dtDzPK9kKn70gE7VvxhEsRjt');

rzp.payment.fetch({id: 'pay_2cGrq9dHYeq5Ji'}, function(payment){payment.capture()})
rzp.payment.capture({id: 21, amount: 50000})