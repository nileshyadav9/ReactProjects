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
        /* <> creates fragment when more than one root element needs to be returned */
        /* when fragment needs a key we use <React.Fragment key={}>*/
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from, All
            from our stone oven, all organic, all delicious
          </p>
          <ul className="pizzas">
            {pizzaList.map((pizza) => (
              <Pizza pizzData={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working on our Menu, please come back later!</p>
      )}
    </main>
  );
}
// instead of props now destructuring the props into new object
// make sure to match the object to the props passed to the tag
function Pizza({ pizzData }) {
  //console.log(props);
  let style = { disabled: pizzData.soldOut };
  return (
    <li
      className={`pizza  ${pizzData.soldOut ? "sold-out" : ""} `}
      style={style}
    >
      <img src={pizzData.photoName} alt={pizzData.name} />
      <div>
        <h3>{pizzData.name}</h3>
        <p>{pizzData.ingredients}</p>
        {/* <span>{pizzData.price}</span> */}
        <span>{pizzData.soldOut ? "Sold Out" : pizzData.price}</span>
      </div>
    </li>
  );
}

function Order(props) {
  return (
    <div className="order">
      <p>{props.message}</p>
      <button className="btn"> Order Now</button>
    </div>
  );
}

function Footer() {
  let openHour = 12;
  let closeHour = 22;
  let curretnHour = new Date().getHours();
  console.log(curretnHour);
  let isOpen = curretnHour > openHour && curretnHour < closeHour;
  let storeOpenstring = `We're Open until ${closeHour}:00. Come visit us or order Online :)`;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order message={storeOpenstring} />
      ) : (
        <p>
          Sorry, We're Closed! We are open between {openHour} and {closeHour}
        </p>
      )}
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
