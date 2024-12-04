import { createContext,useContext,useEffect,useState } from "react";
import useAlert from "../hooks/useAlert";
import AuthContext from "./AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";

const EcomContext = createContext();

export const EcomProvider = ({children})=>{
    const [product, setProduct] = useState([]);
    const {alertInfo, showHide}=useAlert();
    const [order, setOrder] = useState(null);
    const [allOrders, setAllOrders] = useState([])
    const [user, setUser] = useState({})
    const [allUsers, setAllUsers] = useState([]);
    const [categories, setCategories] = useState([])
    const [cartItems, setCartItems]=useState([]);
    const [state, dispatch] =  useContext(AuthContext);
    const isAuthenticated = state.accessToken !== null
    const {setItem, getItem} = useLocalStorage()
    
    useEffect(()=>{
        fetchData();
        getUser()
        fetchCart()
        getAllUsers()
        getAllOrders()
        getAllCategories()
    },[])

    useEffect(() => {
    }, [cartItems])
    
    const fetchData = async ()=>{
        try {
            const response = await fetch("https://bimscollection.onrender.com/api/product");
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.log(error)
        }
    }



    const getUser = async () =>{
        try {
            const res = await fetch(`https://bimscollection.onrender.com/api/user`,{
                method: "GET",
                headers:{
                    "Content-Type":"application/json",
                    "auth-token":`${localStorage.getItem("auth-token")}`
                }}
            )
            const data = await res.json();
            setUser(data)
            console.log(data);
            
        } catch (error) {
            console.log(error)
        }
    }


    const getAllUsers = async (req,res) => {
        try {
            const res = await fetch("https://bimscollection.onrender.com/api/all-user",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "auth-token":`${localStorage.getItem("auth-token")}`
                    
                }
            })
            const data = await res.json()
            setAllUsers(data.user)
            console.log(data);
            
        } catch (error) {
            
        }
    }
    const getAllOrders = async ()=>{
        const res = await fetch("https://bimscollection.onrender.com/api/payment/allorder",{
            method:'GET',
            headers:{
                "Content-Type":"application/json",
                "auth-token":`${localStorage.getItem("auth-token")}`
            }
        })
        const data = await res.json()
        setAllOrders(data.order)
        console.log(data)
    }
   
const getAllCategories = async ()=>{
    try {
        const res = await fetch("https://bimscollection.onrender.com/api/category",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                // "auth-token":`${localStorage.getItem("auth-token")}`
            }
        })
        const data = await res.json()
        setCategories(data)
        console.log(data)
    } catch (error) {
        
    }
}

    
    const featuredProduct = product.filter((product)=>product.featured===true)
    const topSellingProduct = product.filter((product)=>product.topSelling===true)

    // add to cart
    // const addToCart = async (productId, quantity, product) => {
    //     if (isAuthenticated) {
    //         try {
    //             // Add a new item to the cart
    //             const res = await fetch("https://bimscollection.onrender.com/api/addcart", {
    //               method: "POST",
    //               headers: {
    //                 "Content-Type": "application/json",
    //                 "auth-token": `${localStorage.getItem("auth-token")}`,
    //               },
    //               body: JSON.stringify({ productId, quantity }),
    //             });
    //             const data = await res.json();
    //             if (res.ok) {
    //               setCartItems(data);
    //               showHide("success", "You have successfully added item to cart");
    //               console.log(user.firstName);
    //               console.log("added");
                  
                  
    //             } else {
    //               showHide("error", "Product failed to added to cart");
    //             }
    //         } catch (error) {
    //           console.log(error);
    //           showHide("error", "An error occurred while adding the item to the cart");
    //         }  
    //     }else{
    //         //if unauthenticated
    //         const storedCart = JSON.parse(getItem("cart")) || { products:[] };
    //         const itemIndex = storedCart.products?.findIndex(
    //             (item)=> item.product._id === productId
    //         );
    //         if (itemIndex >= 0) {
    //             storedCart.products[itemIndex].quantity += 1;
    //             storedCart.products[itemIndex].amount = product.price * storedCart.products[itemIndex].quantity
    //         } else { 
    //             storedCart.products.push({
    //                 product,
    //                 quantity: 1,
    //                 amount : product.price * 1
    //             })
    //             // console.log(product)
    //             // console.log(user);
                

    //         }
    //         localStorage.setItem("cart", JSON.stringify(storedCart))
    //         showHide("success", "product added to cart successfully")
    //         setCartItems(storedCart)
    //     }
    //   };
    const addToCart = async (productId, quantity, product) => {
        try {
          if (isAuthenticated) {
            await handleAuthenticatedCart(productId, quantity);
          } else {
            handleUnauthenticatedCart(productId, product);
          }
        } catch (error) {
          console.error(error);
          showHide("error", "An unexpected error occurred while adding the item to the cart");
        }
      };
      
      // Helper function to handle authenticated cart actions
      const handleAuthenticatedCart = async (productId, quantity) => {
        try {
          const res = await fetch("https://bimscollection.onrender.com/api/addcart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
            body: JSON.stringify({ productId, quantity }),
          });
      
          const data = await res.json();
      
          if (res.ok) {
            setCartItems(data);
            showHide("success", "You have successfully added the item to the cart");
            console.log("Item added to authenticated cart");
          } else {
            showHide("error", data.message || "Failed to add product to cart");
          }
        } catch (error) {
          console.error("Error adding item to authenticated cart:", error);
          throw new Error("Failed to handle authenticated cart action");
        }
      };
      
      // Helper function to handle unauthenticated cart actions
      const handleUnauthenticatedCart = (productId, product) => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || { products: [] };
      
        // Check if product already exists in the cart
        const existingProductIndex = storedCart.products.findIndex(
          (item) => item.product._id === productId
        );
      
        if (existingProductIndex >= 0) {
          // Update quantity and amount for existing product
          storedCart.products[existingProductIndex].quantity += 1;
          storedCart.products[existingProductIndex].amount =
            product.price * storedCart.products[existingProductIndex].quantity;
        } else {
          // Add new product to the cart
          storedCart.products.push({
            product,
            quantity: 1,
            amount: product.price,
          });
        }
      
        // Save updated cart to localStorage and state
        localStorage.setItem("cart", JSON.stringify(storedCart));
        setCartItems(storedCart);
      
        showHide("success", "Product added to cart successfully");
      };
      
    
    //fetch cart
    const fetchCart = async () => {
        if (isAuthenticated) { 
            const res = await fetch("https://bimscollection.onrender.com/api/cart",{
                method: "GET",
                headers:{
                    "Content-Type":"application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`
                }
            })
            const data = await res.json();
    
            if (res.ok) {
                setCartItems(data.products && data);
            } else {
                showHide("error", "could not get cart")
            }
        } else {
            //unauthenticated user
            const localCart = getItem("cart")
            // console.log(localCart);
            if (localCart) {
                setCartItems(JSON.parse(localCart))
                
            } else {
                setCartItems([])
            }
            
        }
    }


    //remove cart items
    const removeCartItems =async (productId)=>{ 
        if (window.confirm("are you sure you want to delete?..")) {
            if (isAuthenticated) {
                try {
                    const res = await fetch("https://bimscollection.onrender.com/api/delete",{
                        method: "DELETE",
                        headers:{
                            "Content-Type":"application/json",
                            "auth-token":`${localStorage.getItem("auth-token")}`
                        },
                        body: JSON.stringify({ productId })
                    })
                    const data = await res.json();
                    if (res.ok) {
                        showHide("success" , "product successfully deleted from cart")
                        setCartItems(data || data.products)
                    }
                
                 } catch (error) {
                     console.log(error);
                     
                 }    
            } else {
             const storedCart = JSON.parse(localStorage.getItem("cart")) || {
                products:[],
             };
             const itemIndex = storedCart.products.findIndex(
                (item) => item.product._id === productId
             );

             if (itemIndex >= 0) {
                storedCart.products.splice(itemIndex, 1)
                localStorage.setItem("cart", JSON.stringify(storedCart))
                setCartItems(storedCart)
                showHide("sucess", "Product removed from cart sucessfully")
             } else {
                showHide("error","Product not found in cart")
             }
            }
        }
    }

    //calculate subtotal
    const calculateSubTotal= ()=>{
        return cartItems.products?.reduce((acc,curr)=>acc+curr.amount,0)
    }

    //calculateVat
    const calculateVat = (vat= 0.075)=>{
        const subtotal = calculateSubTotal()
        return subtotal*vat
    }
    
    //calculate total Amount
    const calculateTotalAmount = ()=>{
        const vat= calculateVat()
        const subtotal = calculateSubTotal()
        return subtotal + vat;
    }
   
    //updateCart
    const updateCartItems = async (productId, quantity) => {
       if (isAuthenticated) {
        try {
            const res = await fetch("https://bimscollection.onrender.com/api/update-cart",{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    "auth-token":`${localStorage.getItem("auth-token")}`
                },
                body: JSON.stringify({productId, quantity})
            })
            const data = await res.json()

            if (res.status === 200) {
                 const existingItems = cartItems.products?.findIndex(items=>items.product._id === productId);
                 if(existingItems !== -1) {
                     const itemsInCart = [...cartItems.products]
                     const updateCartItems = itemsInCart[existingItems]
                     updateCartItems.quantity = parseInt(quantity)
                     updateCartItems.amount = updateCartItems.product.price * updateCartItems.quantity
                     setCartItems({...itemsInCart, products:itemsInCart})
                 }
            }else{
                showHide("error","Could not update cart")
            }
        } catch (error) {
           console.log(error);
            
        }
       } else {
        //handle updating cart items in local storage for unauthenticated users
        const storedCart = JSON.parse(localStorage.getItem("cart")) || {products:[]};
        const itemIndex = storedCart.products.findIndex((item)=> item.product._id === productId);

        if (itemIndex >= 0) {
            if (quantity === 0) {
                storedCart.products.splice(itemIndex, 1)
            } else {
               //update quantity of item
               storedCart.products[itemIndex].quantity = parseInt(quantity,10);
               storedCart.products[itemIndex].amount = 
               storedCart.products[itemIndex].product.price * storedCart.products[itemIndex].quantity 
            }
            localStorage.setItem("cart", JSON.stringify(storedCart))
            setCartItems(storedCart);
            showHide("success", "Cart updated sucessfully")
        }
       }
    }

    const createOrder = async (transaction_id, orderId) => {
        try {
            const res = await fetch("https://bimscollection.onrender.com/api/payment/verify",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "auth-token":`${localStorage.getItem("auth-token")}`
                },
                body: JSON.stringify({transaction_id, orderId})
            })
            const data = await res.json()
            if (res.ok) {
                setOrder(data.order)
                setCartItems([])
            } else {
                showHide("error", "Insufficient Funds!!")
            }
        } catch (error) {
           console.log({message: error.message});
            
        }
    }

    return (
        <EcomContext.Provider value={{
            product,
            alertInfo,
            featuredProduct,
            topSellingProduct,
            order, 
            cartItems,
            isAuthenticated,
            user,
            allUsers,
            allOrders,
            categories,
            addToCart,
            getUser,
            showHide,
            calculateSubTotal,
            calculateVat,
            calculateTotalAmount,
            removeCartItems,
            updateCartItems,
            createOrder,
            fetchCart
        }}>
            {children}
        </EcomContext.Provider>
    )
}
export default EcomContext;