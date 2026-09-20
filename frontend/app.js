const products=[
{id:1,name:"Chicken Nuggets",cat:"Chicken",price:850,emoji:"🍗"},
{id:2,name:"French Fries",cat:"Fries",price:550,emoji:"🍟"},
{id:3,name:"Chicken Samosa",cat:"Snacks",price:650,emoji:"🥟"},
{id:4,name:"Seekh Kebab",cat:"Kebabs",price:950,emoji:"🍢"},
{id:5,name:"Chicken Shami Kebab",cat:"Kebabs",price:900,emoji:"🥩"},
{id:6,name:"Spring Rolls",cat:"Snacks",price:600,emoji:"🥠"},
{id:7,name:"Chicken Popcorn",cat:"Chicken",price:800,emoji:"🍿"},
{id:8,name:"Masala Fries",cat:"Fries",price:650,emoji:"🍟"}
];
let cart=[];let selectedCoords=null;let lastOrder=null;

const money=n=>"Rs. "+n.toLocaleString();
function renderProducts(){
 const q=document.querySelector("#search").value.toLowerCase();
 const c=document.querySelector("#category").value;
 const list=products.filter(p=>(c==="All"||p.cat===c)&&p.name.toLowerCase().includes(q));
 document.querySelector("#products").innerHTML=list.map(p=>`<article class="card"><div class="pic">${p.emoji}</div><h3>${p.name}</h3><small>${p.cat}</small><div class="price">${money(p.price)}</div><button class="add" onclick="add(${p.id})">Add to cart</button></article>`).join("");
}
function add(id){const x=cart.find(i=>i.id===id);if(x)x.qty++;else cart.push({...products.find(p=>p.id===id),qty:1});renderCart();document.querySelector("#cartBtn").animate([{transform:"scale(1)"},{transform:"scale(1.08)"},{transform:"scale(1)"}],{duration:250})}
function total(){return cart.reduce((s,x)=>s+x.price*x.qty,0)}
function renderCart(){
 document.querySelector("#cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
 document.querySelector("#cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cartrow"><div><b>${x.name}</b><br><small>${money(x.price)} × ${x.qty}</small></div><div class="qty"><button onclick="change(${x.id},-1)">−</button> ${x.qty} <button onclick="change(${x.id},1)">+</button></div></div>`).join(""):"<p>Your cart is empty.</p>";
 document.querySelector("#cartTotal").textContent="Total: "+money(total());
}
function change(id,n){const x=cart.find(i=>i.id===id);x.qty+=n;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);renderCart()}
function toggleCart(){document.querySelector("#cartDrawer").classList.toggle("hidden");document.querySelector("#shade").classList.toggle("hidden")}
function openCheckout(){if(!cart.length)return alert("Cart is empty.");toggleCart();document.querySelector("#checkout").classList.remove("hidden");window.scrollTo({top:document.querySelector("#checkout").offsetTop-80,behavior:"smooth"});renderCheckout()}
function closeCheckout(){document.querySelector("#checkout").classList.add("hidden")}
function renderCheckout(){document.querySelector("#checkoutItems").innerHTML=cart.map(x=>`<div class="cartrow"><span>${x.name} × ${x.qty}</span><b>${money(x.price*x.qty)}</b></div>`).join("");document.querySelector("#checkoutTotal").textContent="Total: "+money(total())}
function getLocation(){
 if(!navigator.geolocation)return alert("GPS is not supported by this browser.");
 document.querySelector("#locationStatus").textContent="Getting your location...";
 navigator.geolocation.getCurrentPosition(pos=>{
 selectedCoords={lat:pos.coords.latitude,lng:pos.coords.longitude};
 document.querySelector("#coords").textContent=`GPS: ${selectedCoords.lat.toFixed(6)}, ${selectedCoords.lng.toFixed(6)}`;
 document.querySelector("#locationStatus").textContent="Location selected successfully.";
 },()=>document.querySelector("#locationStatus").textContent="GPS permission was denied. Please enter address manually.");
}
function placeOrder(){
 const name=document.querySelector("#customerName").value.trim(),phone=document.querySelector("#customerPhone").value.trim(),address=document.querySelector("#address").value.trim(),pay=document.querySelector("input[name=pay]:checked").value;
 if(!name||!phone||!address)return alert("Please enter name, phone and delivery address.");
 if(!cart.length)return alert("Cart is empty.");
 const id="MK"+Date.now().toString().slice(-6);
 lastOrder={id,name,phone,address,pay,total:total(),coords:selectedCoords,items:cart.map(x=>({name:x.name,qty:x.qty,price:x.price}))};
 document.querySelector("#orderText").textContent=`Order ${id} for ${money(lastOrder.total)} has been created.`;
 document.querySelector("#checkout").classList.add("hidden");document.querySelector("#success").classList.remove("hidden");
}
function sendWhatsAppMessage(){
 // Demo only: replace BUSINESS_WHATSAPP with your WhatsApp Business number when backend/API is configured.
 const BUSINESS_WHATSAPP="923001234567";
 const lines=[`🛒 *New MK Frozen Food Order*`,`Order: ${lastOrder.id}`,`Customer: ${lastOrder.name}`,`Phone: ${lastOrder.phone}`,`Payment: ${lastOrder.pay}`,`Total: ${money(lastOrder.total)}`,``,`Items:`,...lastOrder.items.map(x=>`• ${x.name} × ${x.qty} = ${money(x.price*x.qty)}`),``,`Address: ${lastOrder.address}`];
 if(lastOrder.coords)lines.push(`GPS: https://www.google.com/maps?q=${lastOrder.coords.lat},${lastOrder.coords.lng}`);
 const url=`https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
 window.open(url,"_blank");
}
function closeSuccess(){document.querySelector("#success").classList.add("hidden");cart=[];renderCart();window.scrollTo({top:0,behavior:"smooth"})}
document.querySelector("#search").addEventListener("input",renderProducts);
document.querySelector("#category").addEventListener("change",renderProducts);
document.querySelector("#cartBtn").addEventListener("click",toggleCart);
renderProducts();renderCart();
