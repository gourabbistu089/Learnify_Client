import { apiConnector } from "../apiConnector";
import { paymentEndpoints } from "../api";
import toast from "react-hot-toast";
import rzp from "../../assets/Logo/rzp.png";
import { setPaymentLoading } from "../../redux/slices/courseSlice";
import { clearCart } from "../../redux/slices/cartSlice";
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export const buyCourse = async (
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) => {
  const toastId = toast.loading("Please wait...");
  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Unable to load Razorpay script");
      return;
    }
    // initiate the order
    const orderRes = await apiConnector(
      "POST",
      paymentEndpoints.CAPTURE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("orderRes ", orderRes);
    if (!orderRes.data.success) {
      throw new Error(orderRes.data.message);
    }

    // options
    const options = {
      // key: process.env.RAZORPAY_KEY,
      key: "rzp_test_t4LUM04KXw6wHc",
      currency: orderRes.data.currency,
      amount: orderRes.data.amount,
      order_id: orderRes.data.orderId,
      name: "CMaster",
      description: "Payment for course",
      image: rzp,
      prefill: {
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        email: `${userDetails.email}`,
      },
      handler:  async function (response) {
        // send successfull email
        sendEmailSuccessEmail(response, orderRes.data.amount, token);
        // verify payment

        verifyPayment(response, courses, token, navigate, dispatch);
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      console.log("Payment failed", response);
      toast.error("Payment failed");
      dispatch(setPaymentLoading(false));
    });
  } catch (error) {
    console.log("Payment Error", error);
    toast.error("Payment Error");
  }
  toast.dismiss(toastId);
};

async function sendEmailSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      paymentEndpoints.SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("Error in payment success email", error);
  }
}
// verify payment

async function verifyPayment(response, courses, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying payment...");
  dispatch(setPaymentLoading(true));
  try {
    const res = await apiConnector(
      "POST",
      paymentEndpoints.VERIFY_PAYMENT_API,
      {
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
        courses : courses || courses.courses,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log(res)
    if (!res.data.success) {
      throw new Error(res.data.message);
    }
    toast.success("Payment verified successfully!");
    navigate("/dashboard/enrolled-courses");
    dispatch(setPaymentLoading(false));
    dispatch(clearCart())
  } catch (error) {
    console.log("Error in verifying payment", error);
    toast.error("Error in verifying payment");
    dispatch(setPaymentLoading(false));
  }
  toast.dismiss(toastId);
  
}
