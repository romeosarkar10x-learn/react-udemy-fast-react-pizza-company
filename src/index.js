import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

function getTime() {
  return new Date().toLocaleTimeString();
}

function Pizza(props) {
  console.log(props);
  return (
    <div className={`pizza ${props.soldOut ? "sold-out" : ""}`}>
      <img src={props.photoName} alt={props.name} />
      <h3>{props.name}</h3>
      <p>{props.ingredients}</p>
      <span>{props.price}</span>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Company</h1>
    </header>
  );
}

function Order(props) {
  const [time, setTime] = React.useState(getTime());

  React.useEffect(function () {
    setInterval(function () {
      setTime(getTime());
    }, 20);
  }, []);

  return (
    <>
      <p>
        [<time>{time}</time>] We're open from {props.openHour}:00 until{" "}
        {props.closeHour}:00! Come visit us, or order online.
      </p>
      <button className="btn">Order</button>
    </>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12,
    closeHour = 24;

  const isOpen = openHour <= hour && hour <= closeHour;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order openHour={openHour} closeHour={closeHour} />
      ) : (
        <p>
          We're happy to serve you between {openHour}:00 and {closeHour}:00.
          Thank you for visiting us!
        </p>
      )}
    </footer>
  );
}

function Menu() {
  const [pizzas, setPizzas] = React.useState([]);

  React.useEffect(function () {
    fetch("/data.json", {
      method: "GET",
    }).then(function (res) {
      res.json().then((data) => {
        setPizzas(data.data);
      });
    });
  }, []);

  return (
    <main className="menu">
      <h2>Our menu</h2>
      {pizzas.length > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. {pizzas.length} creative dishes to choose
            from. All from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzas.map(function (pizza) {
              return (
                <Pizza
                  name={pizza.name}
                  ingredients={pizza.ingredients}
                  price={pizza.price}
                  photoName={pizza.photoName}
                  soldOut={pizza.soldOut}
                />
              );
            })}
          </ul>
        </>
      ) : (
        <p>
          We're still working on our menu. Please come back after some time.
        </p>
      )}
    </main>
  );
}

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
