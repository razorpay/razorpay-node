const Razorpay = require('./dist/razorpay');

let key = 'rzp_test_k6uL897VPBz20q';
let secret = 'EnLs21M47BllR3X8PSFtjtbd';

//key_id: rzp_test_G8lBRRcxH1t9Bd
//key_secret: Iwm6wk1Wy5AnB7ahSIpfJYxP
//rzp_test_k6uL897VPBz20q EnLs21M47BllR3X8PSFtjtbd - my key
//rzp_test_1DP5mmOlF5G5ag thisissupersecret

var instance = new Razorpay({
    key_id: key,
    key_secret: secret,
  });

const param = {
  "customer_id":"cust_HwqV9X0bFjAny6",
  "account_type":"bank_account",
  "bank_account":{
    "name":"Gaurav Kumar",
    "account_number":"11214311215411",
    "ifsc":"HDFC0000053"
  }
}

const param1 = {
  "amount": "100",
  "currency": "INR",
  "email": "gaurav.kumar@example.com",
  "contact": "9123456789",
  "order_id": "order_IAnlgPD6IStIu3",
  "method": "card",
  "card": {
    "number": "4854980604708430",
    "cvv": "123",
    "expiry_month": "12",
    "expiry_year": "21",
    "name": "Gaurav Kumar"
  }
}
//const payments = instance.payments.otpSubmit('pay_IBVzMz5CLO1LDN',{'otp':'1234'})
// const payments = instance.payments.createPaymentJson({
//   "amount": "10000",
//   "currency": "INR",
//   "email": "gaurav.kumar@example.com",
//   "contact": "7000569565",
//   "order_id": "order_IDROXiVlfXaoQq",
//   "method": "card",
//   "card": {
//     "number": "4854980604708430",
//     "cvv": "123",
//     "expiry_month": "12",
//     "expiry_year": "21",
//     "name": "Gaurav Kumar"
//   }
// })

const payments = instance.orders.create({
  "amount": 10000,
  "currency": "INR",
  "receipt": "receipt#2",
  "notes": {
    "key1": "value3",
    "key2": "value2"
  }
})
//const payments = instance.payments.fetchPaymentDowntimeById('down_F1cxDoHWD4fkQt')
// const payments = instance.virtualAccounts.addReceiver('va_ICOEMIwMaYQa5j',{
//   "types": [
//     "vpa"
//   ],
//   "vpa": { 
//     "descriptor": "minlikumar"
//   }
// })
//instance.payments.all()
//const payments = instance.virtualAccounts.allowedPayer('va_IDWr2BSW3NEcYV',{'type':'bank_account','bank_account':{'ifsc':'RATN0VAAPIS','account_number':'2223331127558515'}})
//const payments = instance.virtualAccounts.deleteAllowedPayer('va_IDWr2BSW3NEcYV','ba_IDX57jfIfhD9O3')
//  const x = instance.payments.paymentVerification(
//    {'subscription_id':'sub_ID6MOhgkcoHj9I',
//    'payment_id':'pay_IDZNwZZFtnjyym',
//    'signature':'601f383334975c714c91a7d97dd723eb56520318355863dcf3821c0d07a17693'
//   },'EnLs21M47BllR3X8PSFtjtbd')
instance.subscriptions.create('sub_ID6MOhgkcoHj9I',{
  item:{
    name:"Extra appala (papadum)",
    amount:30000,
    currency:"INR",
    description:"1 extra oil fried appala with meals"
  },
  quantity:2
})
 .then((res)=>{
     console.log(x);
 }).catch(err=>{
   console.log(err);
})



/*notes*/
//subscription

// const payments = instance.invoices.all({'subscription_id':'sub_HvNIkQUz9I5GBA'}).then((res)=>{
//   console.log(res);
// }) // Fetch All Invoices for a Subscription

// const payments = instance.invoices.all({'subscription_id':'sub_HvNIkQUz9I5GBA'}).then((res)=>{
//   console.log(res);
// }) // Fetch All Invoices for a Subscription

const payments = instance.payments.bankTransfer('pay_Hux2oN40fzrVFK')
 .then((res)=>{
  console.log(res);
}).catch(err=>{
console.log(err);
})

/*
       * Create a Fund Account
       *
       * @param {String} customerId
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */


      
      // let payload = 'order_IDXcK1zmaJq9YJ|pay_IDXloHer6Enq6R';
      //  let signature = '13824e0c9464c23130d741eaaa0cdaf6c53b959337eca8535d9924ac58667331';
      //let secret = 'EnLs21M47BllR3X8PSFtjtbd';