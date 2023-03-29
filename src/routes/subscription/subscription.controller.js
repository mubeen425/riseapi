import Stripe from "stripe";

const stripe = new Stripe("sk_test_51MeLJaIRdWhFUBPITTfTWRtaDVEbBeiA0uk9YSFHuRZWF8GqfNlrQfdcETdreBFUc81giEAzlpy41E7VR3bM5P4K00wqb1Y6xs", {
    apiVersion: "2022-11-15",
});

const httpSubscriptionHandler = async (req, res) => {
  console.log(typeof +req.body.price);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${req.body.title}`,
          },
          unit_amount: +req.body.price * 100,
        },
        quantity: 1,
      },
      
    ],
    mode: "payment",
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000",
  });

  res.send({url: session.url});
};

export { httpSubscriptionHandler };
