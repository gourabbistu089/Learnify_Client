import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? localStorage.getItem("totalItems") : 0,
    cart: JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
};

const cartSlice = createSlice({ 
    name : "cart",  
    initialState,
    reducers : {
        setTotalItems : (state, action) => {
            state.totalItems = action.payload;
            localStorage.setItem("totalItems", action.payload);
        },
        addToCart : (state, action) => {
          const course = action.payload;
          console.log("course", course);
          const index = state.cart.findIndex((item) => item._id === course._id);
          if (index === -1) {
            state.cart.push(course);
            state.total+= course.price;
            state.totalItems++;
            console.log(typeof state.total , state.total);
            console.log(typeof course.price, course.price);
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            toast.success("Item added to cart");
          } else {
            toast.error("Item already in cart");
            return;
          }
        },
      
        removeFromCart : (state, action) => {
            const course = action.payload;
            console.log("course", course);
            const index = state.cart.findIndex((item) => item.id === course.id);
            if (index !== -1) {
              state.cart.splice(index, 1);
              console.log(typeof state.total);
              console.log(typeof course.price);
              state.total = state.total - course.price;
              state.totalItems = state.totalItems - 1;
              localStorage.setItem("cart", JSON.stringify(state.cart));
              localStorage.setItem("total", JSON.stringify(state.total));
              localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
              toast.success("Item removed from cart");
            } else {
              toast.error("Item not found in cart");
            }
        },
        clearCart : (state) => {
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            toast.success("Cart cleared");
        },
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer