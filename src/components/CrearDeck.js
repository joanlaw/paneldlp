import React, { useState, useEffect } from "react";
import axios from "axios";
//import Carta from "../../components/Carta";
//import Header from "../../components/Header";
//import Footer from "../../components/Footer";
import "./CrearDeck.css"; // Importa el archivo CSS

const CrearDeck = () => {
  const [cartas, setCartas] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deck, setDeck] = useState([]);
  const [deckextra, setDeckextra] = useState([]);
  const [jugador, setJugador] = useState("");
  const [habilidad, setHabilidad] = useState("");
  const [arquetipo, setArquetipo] = useState("");
  const [top, setTop] = useState("");
  const [puesto, setPuesto] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://back-render-cloud-dlp.onrender.com/cards?page=${page}&limit=10`)
      .then((response) => {
        setCartas(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [page]);

  const handleAgregarCarta = (carta) => {
    if (deck.length < 30) {
      setDeck([...deck, carta]);
    }
  };

  const handleAgregarCartaDeckExtra = (carta) => {
    if (deckextra.length < 8) {
      setDeckextra([...deckextra, carta]);
    }
  };

 

  const onClick = (carta) => {
    if (
      carta.tipo_de_carta === "Fusion" ||
      carta.tipo_de_carta === "Sincronía" ||
      carta.tipo_de_carta === "Xyz" ||
      carta.tipo_de_carta === "Sincronía / Cantante" ||
      carta.tipo_de_carta === "Xyz / Péndulo" ||
      carta.tipo_de_carta === "Link"
    ) {
      handleAgregarCartaDeckExtra(carta);
    } else {
      handleAgregarCarta(carta);
    }
  };

  const handleQuitarCarta = (index) => {
    const newDeck = [...deck];
    newDeck.splice(index, 1);
    setDeck(newDeck);
  };

  const handleQuitarCartaExtra = (index) => {
    const newDeckExtra = [...deckextra];
    newDeckExtra.splice(index, 1);
    setDeckextra(newDeckExtra);
  };

  const handleReset = () => {
    setDeck([]);
    setDeckextra([]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "jugador":
        setJugador(value);
        break;
      case "habilidad":
        setHabilidad(value);
        break;
      case "arquetipo":
        setArquetipo(value);
        break;
      case "top":
        setTop(value);
        break;
      case "puesto":
        setPuesto(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validaciones para limitar la cantidad de cartas en el deck
    if (deck.length < 20 || deck.length > 30) {
      alert("El deck debe contener entre 20 y 30 cartas principales");
      return;
    }
    if (deckextra.length < 0 || deckextra.length > 8) {
      alert("El deck extra debe contener entre 0 y 8 cartas");
      return;
    }

    handleReset();

    const mainDeckObject = deck.reduce((acc, carta) => {
      if (acc[carta._id]) {
        acc[carta._id].quantity += 1;
      } else {
        acc[carta._id] = { cardId: carta._id, quantity: 1 };
      }
      return acc;
    }, {});

    const extraDeckObject = deckextra.reduce((acc, carta) => {
      if (acc[carta._id]) {
        acc[carta._id].quantity += 1;
      } else {
        acc[carta._id] = { cardId: carta._id, quantity: 1 };
      }
      return acc;
    }, {});

    const mainDeck = Object.values(mainDeckObject);
    const extraDeck = Object.values(extraDeckObject);

    axios
      .post("https://back-render-cloud-dlp.onrender.com/mazos/", {
        jugador,
        habilidad,
        arquetipo,
        top,
        puesto,
        mainDeck,
        extraDeck,
      })
      .then((response) => {
        alert("Mazo creado exitosamente");
        setJugador("");
        setHabilidad("");
        setArquetipo("");
        setTop("");
        setPuesto("");
      })
      .catch((error) => {
        alert("Hubo un error al crear el mazo");
        console.error(error);
      });
  };

  if (loading) {
    return <p>Cargando cartas...</p>;
  }

  if (error) {
    return <p>Hubo un error al cargar las cartas</p>;
  }

  const results = !search
    ? cartas
    : cartas.filter(
        (carta) =>
          carta.nombre.toLowerCase().includes(search.toLowerCase()) ||
          carta.name_english.toLowerCase().includes(search.toLowerCase())
      );

  const cartasPorPagina = 25;
  const paginaInicio = (page - 1) * cartasPorPagina;
  const paginaFinal = paginaInicio + cartasPorPagina;
  const cartasPaginadas = results.slice(paginaInicio, paginaFinal);

  const numeroPaginas = Math.ceil(results.length / cartasPorPagina);
  const paginas = Array.from({ length: numeroPaginas }, (_, index) => index + 1);

  const Carta = ({ carta, onClick }) => (
    <div onClick={onClick}>
      <img src={carta.image.secure_url} alt={carta.nombre} width="65.14" height="94.91" />
    </div>
  );

  const maxPaginas = 5; // Limita a 5 páginas visibles en la paginación


  
  return (
    <>
            <div className="container">
        <h1>Creador de mazos DLP</h1>
        <div className="deck-builder">
          <div className="cartas-container">
            <h2>Cartas</h2>
            <div className="buscar">
  <div className="buscar-input">
    <label htmlFor="buscar">Buscar por nombre:</label>
    <input
      type="text"
      id="buscar"
      placeholder="Buscar por nombre"
      onChange={(e) => setSearch(e.target.value)}
      value={search}
    />
  </div>
</div>

            <div className="lista-cartas">
              {cartasPaginadas.map((carta) => (
                <Carta key={carta.id} carta={carta} onClick={() => onClick(carta)} />
              ))}
            </div>
            <div className="paginacion">
  {page > 1 && (
    <>
      <button onClick={() => setPage(1)}>{"<<"}</button>
      <button onClick={() => setPage(page - 1)}>{"<"}</button>
    </>
  )}

  {paginas
    .slice(Math.max(0, page - maxPaginas), page + maxPaginas)
    .map((num) => (
      <button
        key={num}
        className={num === page ? "activo" : ""}
        onClick={() => setPage(num)}
      >
        {num}
      </button>
    ))}

  {page < numeroPaginas && (
    <>
      <button onClick={() => setPage(page + 1)}>{">"}</button>
      <button onClick={() => setPage(numeroPaginas)}>{">>"}</button>
    </>
  )}
</div>


          </div>

          <div className="deck-container">
            <h2>Deck</h2>
            <div className="deck">
              {deck.map((carta, index) => (
                <div key={index} className="deck-card" onClick={() => handleQuitarCarta(index)}>
                  <img src={carta.image.secure_url} alt={carta.nombre} />
                </div>
              ))}
            </div>

            <h2>Extra Deck</h2>
            <div className="deck">
              {deckextra.map((carta, index) => (
                <div key={index} className="deck-card" onClick={() => handleQuitarCartaExtra(index)}>
                  <img src={carta.image.secure_url} alt={carta.nombre} />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <form className="deck-form" onSubmit={handleSubmit}>
          <label htmlFor="jugador">Jugador:</label>
          <input
            type="text"
            name="jugador"
            value={jugador}
            onChange={handleChange}
          />

          <label htmlFor="habilidad">Habilidad:</label>
          <input
            type="text"
            name="habilidad"
            value={habilidad}
            onChange={handleChange}
          />

          <label htmlFor="arquetipo">Arquetipo:</label>
          <input
            type="text"
            name="arquetipo"
            value={arquetipo}
            onChange={handleChange}
          />

          <label htmlFor="top">Top:</label>
          <input
            type="text"
            name="top"
            value={top}
            onChange={handleChange}
          />

          <label htmlFor="puesto">Puesto:</label>
          <input
            type="text"
            name="puesto"
            value={puesto}
            onChange={handleChange}
          />

          <button type="submit">Crear mazo</button>
        </form>
      </div>
    </>
  );
};

export default CrearDeck;
