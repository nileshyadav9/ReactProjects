import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      {/* <h1>This is fresh new React App</h1> */}
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  /* let style = { color: "orange", fontSize: "48px", textTransform: "uppercase" };
  return <h1 style={style}> Fast Pizza resto </h1>; */
  return (
    <header className="header">
      <h1> Fast Pizza resto </h1>
    </header>
  );
}
function Menu() {
  let pizzaList = pizzaData;
  return (
    <main className="menu">
      <h2>Menu</h2>

      {pizzaList.length > 0 ? (
        <ul className="pizzas">
          {pizzaList.map((pizza) => (
            <Pizza pizzData={pizza} key={pizza.name} />
          ))}
        </ul>
      ) : (
        <p>We're still working on our Menu, please come back later!</p>
      )}
    </main>
  );
}

function Pizza(props) {
  //console.log(props);
  let style = { disabled: props.pizzData.soldOut };
  return (
    <li className="pizza" style={style}>
      <img src={props.pizzData.photoName} alt={props.pizzData.name} />
      <div>
        <h3>{props.pizzData.name}</h3>
        <p>{props.pizzData.ingredients}</p>
        <span>{props.pizzData.price}</span>
        <span>{props.pizzData.soldOut ? "Sold Out" : ""}</span>
      </div>
    </li>
  );
}
function Footer() {
  let openHour = 12;
  let closeHour = 22;
  let curretnHour = new Date().getHours();
  console.log(curretnHour);
  let isOpen = curretnHour > openHour && curretnHour < closeHour;
  let storeOpenstring = isOpen
    ? `We're Open until ${closeHour}:00. Come visit us or order Online :)`
    : `Sorry, We're Closed! We are open between ${openHour} and ${closeHour}`;

  return (
    <footer className="footer">
      <div className="order">
        <p>{storeOpenstring}</p>
        <button className="btn"> Order Now</button>
      </div>
    </footer>
  );
}
let root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {" "}
    <App></App>{" "}
  </React.StrictMode>
);
