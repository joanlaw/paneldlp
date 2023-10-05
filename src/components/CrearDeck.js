import React, { useState, useEffect } from "react";
import axios from "axios";
//import Carta from "../../components/Carta";
//import Header from "../../components/Header";
//import Footer from "../../components/Footer";
import "./CrearDeck.css"; // Importa el archivo CSS
//import arquetiposData from "../data/arquetipos.json";


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
  const [link_deck, setLinkDeck] = useState("");
  const [engine, setEngine] = useState("");
  const [search, setSearch] = useState("");
  //const [arquetipos, setArquetipos] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  //arquetipos de api 
  const [arquetipos, setArquetipos] = useState([]);
  const [selectedArquetipo, setSelectedArquetipo] = useState('');
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [seleccion, setSeleccion] = useState("");

  const [visiblePages, setVisiblePages] = useState([]);
const maxVisiblePages = 5; // Limita a 5 páginas visibles en la paginación

const [totalEstimatedCost, setTotalEstimatedCost] = useState(0);  // Nuevo estado para el costo total estimado


  const cardsPerPage = 50; 

  useEffect(() => {
    if (busqueda.length > 0) {
      fetch(`https://api.duellinks.pro/arquetipos/?nombre_arquetipo=${busqueda}`)
        .then((response) => response.json())
        .then((data) => setResultados(data.arquetipos));
    } else {
      setResultados([]);
    }
  }, [busqueda]);

  const handleChangee = (event) => {
    setBusqueda(event.target.value);
  };

  const handleSelect = (arquetipo) => {
    setSeleccion(arquetipo.nombre_arquetipo);
    setResultados([]);
  };


  
/*  useEffect(() => {
    setArquetipos(arquetiposData.arquetipos);
  }, []); */

  useEffect(() => {
    const fetchCards = async () => {
      try {
        let response;
        if (searchTerm) {
          response = await axios.get('https://api.duellinks.pro/cards/', {
            params: {
              search: searchTerm,
              page: currentPage - 1,
              size: cardsPerPage
            }
          });
        } else {
          response = await axios.get('https://api.duellinks.pro/cards/', {
            params: {
              page: currentPage - 1,
              size: cardsPerPage
            }
          });
        }
  
        setCartas(response.data.docs);
        setCurrentPage(response.data.page + 1);
        setTotalPages(response.data.totalPages);
  
        // Actualizar las páginas visibles
        let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
        let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
        if (endPage - startPage < maxVisiblePages - 1) {
          startPage = Math.max(endPage - maxVisiblePages + 1, 1);
        }
        setVisiblePages(Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i));
      } catch (error) {
        console.log('Error al obtener las cartas:', error);
      }
    };
  
    fetchCards();
  }, [searchTerm, currentPage, cardsPerPage, maxVisiblePages, totalPages]);
  
  const updateCardCost = async (cardId, operation) => {
    try {
      const response = await axios.get(`https://api.duellinks.pro/cards/${cardId}/costo`);
      const cardCost = response.data.estimatedCost; // Asume que el costo estimado viene en este campo
      setTotalEstimatedCost(prevTotal => operation === 'add' ? prevTotal + cardCost : prevTotal - cardCost);
    } catch (error) {
      console.error('Error al obtener el costo de la carta:', error);
    }
  };


  

  const handleAgregarCarta = async (carta) => {
    if (deck.length < 30) {
      await updateCardCost(carta._id, 'add');
      setDeck([...deck, carta]);
    }
  };

  const handleAgregarCartaDeckExtra = async (carta) => {
    if (deckextra.length < 8) {
      await updateCardCost(carta._id, 'add');
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
      carta.tipo_de_carta === "Link"  ||
      carta.tipo_de_carta === "Link Monster" ||
      carta.tipo_de_carta === "Fusion Monster" ||
      carta.tipo_de_carta === "XYZ Monster" ||
      carta.tipo_de_carta === "XYZ Péndulo Monster" ||
      carta.tipo_de_carta === "XYZ Pendulum Effect Monster" ||
      carta.tipo_de_carta === "Synchro Monster" ||
      carta.tipo_de_carta === "Synchro Tuner Monster"
    ) {
      handleAgregarCartaDeckExtra(carta);
    } else {
      handleAgregarCarta(carta);
    }
  };

  const handleQuitarCarta = async (index) => {
    const newDeck = [...deck];
    const cardToRemove = newDeck.splice(index, 1)[0];
    await updateCardCost(cardToRemove._id, 'subtract');
    setDeck(newDeck);
  };

  const handleQuitarCartaExtra = async (index) => {
    const newDeckExtra = [...deckextra];
    const cardToRemove = newDeckExtra.splice(index, 1)[0];
    await updateCardCost(cardToRemove._id, 'subtract');
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
        case "link_deck":
        setLinkDeck(value); // 2. Actualiza el valor del estado 'link_deck' cuando el usuario ingresa algo
        break;
        case "engine":
          setEngine(value);
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
        acc[carta._id] = {
          cardId: carta._id,
          quantity: 1,
          _id: carta._id,
          nombre: carta.nombre,
          name_english: carta.name_english
        };
      }
      return acc;
    }, {});
  
    const extraDeckObject = deckextra.reduce((acc, carta) => {
      if (acc[carta._id]) {
        acc[carta._id].quantity += 1;
      } else {
        acc[carta._id] = {
          cardId: carta._id,
          quantity: 1,
          _id: carta._id,
          nombre: carta.nombre,
          name_english: carta.name_english
        };
      }
      return acc;
    }, {});
  
    const mainDeck = Object.values(mainDeckObject);
    const extraDeck = Object.values(extraDeckObject);

    axios
      .post("https://backend-dlp-neuronube.koyeb.app/mazos/", {
        jugador,
        habilidad,
        arquetipo: seleccion,
        top,
        puesto,
        mainDeck,
        extraDeck,
        link_deck,
        engine,
      })
      .then((response) => {
        alert("Mazo creado exitosamente");
        setJugador("");
        setHabilidad("");
        setArquetipo(seleccion);
        setTop("");
        setPuesto("");
        setLinkDeck("");
        setEngine("");
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

  const results = !searchTerm
  ? cartas
  : cartas.filter((carta) => {
      // Verificar que la carta no sea nula y que las propiedades nombre y name_english existan
      if (carta && carta.nombre && carta.name_english) {
        return (
          carta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          carta.name_english.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return false; // Si la carta es nula o las propiedades no existen, no la incluyas en los resultados
    });


  const cartasPorPagina = 25;
  const paginaInicio = (page - 1) * cartasPorPagina;
  const paginaFinal = paginaInicio + cartasPorPagina;
  const cartasPaginadas = results.slice(paginaInicio, paginaFinal);

  const numeroPaginas = Math.ceil(results.length / cartasPorPagina);
  const paginas = Array.from({length: numeroPaginas}, (_, i) => i + 1);


  const Carta = ({ carta, onClick }) => (
    <div onClick={onClick}>
      <img src={carta.image.secure_url} alt={carta.nombre} width="65.14" height="94.91" />
    </div>
  );

  //const maxPaginas = 5; // Limita a 5 páginas visibles en la paginación


  
  return (
    <>
   <div className="container">
  <header>
  </header>

  <div className="deck-builder">
    <div className="form-section">
      <h2>Crear Mazo</h2>
      <form className="deck-form" onSubmit={handleSubmit}>
      <label htmlFor="jugador">Jugador:</label>
        <input type="text" name="jugador" value={jugador} onChange={handleChange} />

        <label htmlFor="habilidad">Habilidad:</label>
        <input type="text" name="habilidad" value={habilidad} onChange={handleChange} />

        <div className="autocompletado-container">
      <input className="autocompletado-input" type="text" value={seleccion || busqueda} onChange={handleChangee} placeholder="Busca un arquetipo" />
      {resultados.length > 0 && (
        <ul className="autocompletado-resultados">
          {resultados.map((resultado) => (
            <li key={resultado._id} onClick={() => handleSelect(resultado)}>{resultado.nombre_arquetipo}</li>
          ))}
        </ul>
      )}
    </div>

    <label htmlFor="top">Top:</label>
<select name="top" value={top} onChange={handleChange}>
<option value="">Selecciona una opcion</option>
  <option value="Rey de duelos">Rey de duelos</option>
  <option value="Torneo LHC #1">Torneo LHC #1</option>
  <option value="Torneo LHC #2">Torneo LHC #2</option>
  <option value="Torneo LHC #3">Torneo LHC #3</option>
  <option value="Torneo LHC #4">Torneo LHC #4</option>
  <option value="Torneo LHC #5">Torneo LHC #5</option>
  <option value="Rogue Pro #3">Rogue Pro #3</option>
  <option value="Rogue Pro #4">Rogue Pro #4</option>
  <option value="Rogue Pro #5">Rogue Pro #5</option>
  <option value="Rogue Pro #6">Rogue Pro #6</option>
  <option value="Rogue Pro #7">Rogue Pro #7</option>
  <option value="Meta Pro #1">Meta Pro #1</option>
  <option value="Meta Pro #2">Meta Pro #2</option>
  <option value="Meta Pro #3">Meta Pro #3</option>
  <option value="Meta Pro #4">Meta Pro #4</option>
  <option value="ND Max">ND Max</option>
  <option value="Ensalada">Ensalada</option>

  <option value="Fun">Fun</option>
  <option value="Farmeo">Farmeo</option>
</select>

        <label htmlFor="puesto">Puesto:</label>
        <input type="text" name="puesto" value={puesto} onChange={handleChange} />
                  {/*...*/}
          <label htmlFor="link_deck">Link del Deck:</label> {/* 4. Agrega un nuevo campo en el formulario para 'link_deck' */}
          <input type="text" name="link_deck" value={link_deck} onChange={handleChange} />
          {/*...*/}
          <label htmlFor="motor">Motor:</label>
        <input type="text" name="engine" value={engine} onChange={handleChange} />

        <button type="submit">Crear mazo</button>
      </form>
    </div>

    <div className="card-section">
      <h2>Cartas</h2>
      <div className="buscar-input">
      <input
        type="text"
        id="buscar"
        placeholder="Buscar por nombre"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </div>
      <div className="card-list">
      {cartasPaginadas.map((carta) => (
            <Carta key={carta.id} carta={carta} onClick={() => onClick(carta)} />
          ))}
        </div>

        <div className="paginacion">
          {currentPage > 1 && (
            <>
              <button onClick={() => setCurrentPage(1)}>{"<<"}</button>
              <button onClick={() => setCurrentPage(currentPage - 1)}>{"<"}</button>
            </>
          )}

          {visiblePages.map((num) => (
            <button
              key={num}
              className={num === currentPage ? "activo" : ""}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
      </div>
    </div>

    <div className="deck-section">
  <h2>Deck</h2>
  <h3>Costo total estimado: {totalEstimatedCost}</h3>  {/* Aquí se muestra el costo total estimado */}
  <div className="deck">
    {deck.map((carta, index) => (
      <div key={index} className="deck-card" onClick={() => handleQuitarCarta(index)}>
        <img src={carta.image.secure_url} alt={carta.nombre} />
      </div>
    ))}
  </div>
</div>


    <div className="extra-deck-section">
      <h2>Extra Deck</h2>
      <div className="extra-deck">
      {deckextra.map((carta, index) => (
            <div key={index} className="deck-card" onClick={() => handleQuitarCartaExtra(index)}>
              <img src={carta.image.secure_url} alt={carta.nombre} />
            </div>
          ))}
      </div>

    </div>
    <div class="side-deck-section">
      <h2>Side Deck</h2>
      <div class="side-deck">
       
      </div>
    </div>
  </div>
</div>


    </>
  );
};

export default CrearDeck;