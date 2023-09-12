import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CrearBox.css";

const CrearBox = () => {
  const [cartas, setCartas] = useState([]);
  const [cartasUR, setCartasUR] = useState([]);
  const [cartasSR, setCartasSR] = useState([]);
  const [cartasR, setCartasR] = useState([]);
  const [cartasN, setCartasN] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipoDeBox, setTipoDeBox] = useState("");
  const [fechaDeLanzamiento, setFechaDeLanzamiento] = useState("");
  const [bannerLink, setBannerLink] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  const handleSearchTermChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  useEffect(() => {
    let timerId;

    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://backend-dlp-neuronube.koyeb.app/cards?page=${page}&size=50&search=${searchTerm}`
        );
        setCartas(response.data.docs);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (initialLoad) {
      fetchCards();
      setInitialLoad(false);
    } else if (searchTerm) {
      clearTimeout(timerId);
      timerId = setTimeout(fetchCards, 500);
    } else {
      fetchCards();
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [page, searchTerm, initialLoad]);

  const handleCartaSeleccionada = (carta) => {
    if (!selectedCategory) return;

    switch (selectedCategory) {
      case "UR":
        setCartasUR((prevCartasUR) => [...prevCartasUR, carta]);
        break;
      case "SR":
        setCartasSR((prevCartasSR) => [...prevCartasSR, carta]);
        break;
      case "R":
        setCartasR((prevCartasR) => [...prevCartasR, carta]);
        break;
      case "N":
        setCartasN((prevCartasN) => [...prevCartasN, carta]);
        break;
      default:
        break;
    }
  };

  const handleQuitarCarta = (index, category) => {
    switch (category) {
      case "UR":
        setCartasUR((prevCartasUR) => {
          const newCartasUR = [...prevCartasUR];
          newCartasUR.splice(index, 1);
          return newCartasUR;
        });
        break;
      case "SR":
        setCartasSR((prevCartasSR) => {
          const newCartasSR = [...prevCartasSR];
          newCartasSR.splice(index, 1);
          return newCartasSR;
        });
        break;
      case "R":
        setCartasR((prevCartasR) => {
          const newCartasR = [...prevCartasR];
          newCartasR.splice(index, 1);
          return newCartasR;
        });
        break;
      case "N":
        setCartasN((prevCartasN) => {
          const newCartasN = [...prevCartasN];
          newCartasN.splice(index, 1);
          return newCartasN;
        });
        break;
      default:
        break;
    }
  };

  const handleReset = () => {
    setCartasUR([]);
    setCartasSR([]);
    setCartasR([]);
    setCartasN([]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "nombre":
        setNombre(value);
        break;
      case "tipoDeBox":
        setTipoDeBox(value);
        break;
      case "fechaDeLanzamiento":
        setFechaDeLanzamiento(value);
        break;
      case "bannerLink":
        setBannerLink(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const boxData = {
      nombre,
      tipo_de_box: tipoDeBox,
      fecha_de_lanzamiento: new Date(fechaDeLanzamiento),
      banner: bannerLink,
      cartas_ur: cartasUR,
      cartas_sr: cartasSR,
      cartas_r: cartasR,
      cartas_n: cartasN,
    };

    axios
      .post("https://backend-dlp-neuronube.koyeb.app/boxes", boxData)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));

    setNombre("");
    setTipoDeBox("");
    setFechaDeLanzamiento("");
    setBannerLink("");

    handleReset();
  };

  if (initialLoad && loading) {
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
  let startPage = Math.max(1, page - 2);
  let endPage = Math.min(startPage + 4, numeroPaginas);

  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  const paginas = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  const Carta = ({ carta }) => (
    <div onClick={() => handleCartaSeleccionada(carta)}>
      <img src={carta.image.secure_url} alt={carta.nombre} width="65.14" height="94.91" />
    </div>
  );

  return (
    <>
      <div>
        <h1>Crear Box</h1>
      </div>
      <div className="container-crear-box">
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value={nombre} onChange={handleChange} />

            <label htmlFor="tipoDeBox">Tipo de Box:</label>
            <input
              type="text"
              id="tipoDeBox"
              name="tipoDeBox"
              value={tipoDeBox}
              onChange={handleChange}
            />

            <label htmlFor="fechaDeLanzamiento">Fecha de Lanzamiento:</label>
            <input
              type="date"
              id="fechaDeLanzamiento"
              name="fechaDeLanzamiento"
              value={fechaDeLanzamiento}
              onChange={handleChange}
            />

            <label htmlFor="bannerLink">Link del Banner:</label>
            <input
              type="text"
              id="bannerLink"
              name="bannerLink"
              value={bannerLink}
              onChange={handleChange}
            />

            <button type="submit">Crear Box</button>
          </form>
          <div className="submenu">
            <ul>
              <li>
                <button onClick={() => setSelectedCategory("UR")}>Cartas UR</button>
              </li>
              <li>
                <button onClick={() => setSelectedCategory("SR")}>Cartas SR</button>
              </li>
              <li>
                <button onClick={() => setSelectedCategory("R")}>Cartas R</button>
              </li>
              <li>
                <button onClick={() => setSelectedCategory("N")}>Cartas N</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid-container-crear-box">
          <div className="block1">
            <h2>Cartas</h2>
            <div className="buscar">
              <input
                type="text"
                id="buscar"
                placeholder="Buscar por nombre"
                onChange={handleSearchTermChange}
                value={searchTerm}
              />
            </div>

            <div className="lista-cartas-crear-box">
              {cartasPaginadas.map((carta) => (
                <Carta key={carta._id} carta={carta} onClick={() => handleCartaSeleccionada(carta)} />
              ))}
            </div>

            <div className="paginacion">
              {page > 1 && (
                <>
                  <button onClick={() => setPage(1)}>{"<<"}</button>
                  <button onClick={() => setPage(page - 1)}>{"<"}</button>
                </>
              )}

              {paginas.map((num) => (
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

          <div className="block2">
            <h2>Cartas UR</h2>
            <div className="deck-crear-box">
              {cartasUR.map((carta, index) => (
                <div key={carta._id} onClick={() => handleQuitarCarta(index, "UR")}>
                  <img src={carta.image.secure_url} alt={carta.nombre} />
                </div>
              ))}
            </div>

            <h2>Cartas SR</h2>
            <div className="deck-crear-box">
              {cartasSR.map((carta, index) => (
                <div key={carta._id} onClick={() => handleQuitarCarta(index, "SR")}>
                  <img src={carta.image.secure_url} alt={carta.nombre} />
                </div>
              ))}
            </div>

            <h2>Cartas R</h2>
            <div className="deck-crear-box">
              {cartasR.map((carta, index) => (
                <div key={carta._id} onClick={() => handleQuitarCarta(index, "R")}>
                  <img src={carta.image.secure_url} alt={carta.nombre} />
                </div>
              ))}
            </div>

            <h2>Cartas N</h2>
            <div className="deck-crear-box">
              {cartasN.map((carta, index) => (
                <div key={carta._id} onClick={() => handleQuitarCarta(index, "N")}>
                  <img src={carta.image.secure_url} alt={carta.nombre} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CrearBox;
