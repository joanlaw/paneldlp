import React, { useState } from 'react';

const CardForm = ({ card, onSubmit, onCancel }) => {
  const [updatedCard, setUpdatedCard] = useState(card);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedCard((prevCard) => ({ ...prevCard, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(updatedCard);
  };

  return (
    <div className="card-form">
      <h2>Editar carta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Imagen:</label>
          <input
            type="text"
            name="image.secure_url"
            value={updatedCard.image.secure_url}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nombre:</label>

          <input
            type="text"
            name="nombre"
            value={updatedCard.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Tipo de carta:</label>
          <select
            name="tipo_de_carta"
            value={updatedCard.tipo_de_carta}
            onChange={handleChange}
          >
          <option value=""></option>
                                        <option value="Normal">Normal</option>
                                        <option value="Ritual">Rital</option>
                                        <option value="Sincronía">Sincronía</option>
                                        <option value="Péndulo">Péndulo</option>
                                        <option value="Péndulo normal">Péndulo Normal</option>
                                        <option value="Efecto">Efecto</option>
                                        <option value="Cantante">Cantante</option>
                                        <option value="Cantante / Normal">Cantante / Normal</option>
                                        <option value="Sincronía / Cantante">Sincronía / Cantante</option>
                                        <option value="Xyz / Péndulo">Xyz / Péndulo</option>
                                        <option value="Fusion">Fusión</option>
                                        <option value="Xyz">Xyz</option>
                                        <option value="Link">Link</option>
                                        </select>
        </div>
        <div>
          <label>Atributo:</label>
          <select
            type="text"
            name="atributo"
            value={updatedCard.atributo}
            onChange={handleChange}
          >
            <option value=""></option>
                                        <option value="no">no aplica</option>
                                        <option value="LUZ">LUZ</option>
                                        <option value="OSCURIDAD">OSCURIDAD</option>
                                        <option value="AGUA">AGUA</option>
                                        <option value="FUEGO">FUEGO</option>
                                        <option value="TIERRA">TIERRA</option>
                                        <option value="VIENTO">VIENTO</option>
                                        <option value="DIVINIDAD">DIVINIDAD</option>
                                        <option value="MÁGICA">MÁGICA</option>
                                        <option value="TRAMPA">TRAMPA</option>
            </select>
        </div>
        <div>
          <label>Tipo:</label>
          <select
            type="text"
            name="tipo"
            value={updatedCard.tipo}
            onChange={handleChange}
          >
                                                    <option value=""></option>
                                        <option value="Dragon">Dragón</option>
                                        <option value="Zombi">Zombi</option>
                                        <option value="Demonio">Demonio</option>
                                        <option value="Piro">Piro</option>
                                        <option value="Serpiente marina">Serpiente Marina</option>
                                        <option value="Roca">Roca</option>
                                        <option value="Maquina">Máquina</option>
                                        <option value="Pez">Pez</option>
                                        <option value="Dinosaurio">Dinosaurio</option>
                                        <option value="Insecto">Insecto</option>
                                        <option value="Bestia">Bestia</option>
                                        <option value="Guerrero-bestia">Guerrero-Bestia</option>
                                        <option value="Planta">Planta</option>
                                        <option value="Aqua">Aqua</option>
                                        <option value="Guerrero">Guerrero</option>
                                        <option value="Bestia alada">Bestia Alada</option>
                                        <option value="Hada">Hada</option>
                                        <option value="Lanzador de conjuros">Lanzador de Conjuros</option>
                                        <option value="Trueno">Trueno</option>
                                        <option value="Reptil">Reptil</option>
                                        <option value="Psiquico">Psíquico</option>
                                        <option value="Wyrm">Wyrm</option>
                                        <option value="Ciberso">Ciberso</option>
            </select>
        </div>
        <div>
          <label>Tipo mágica/trampa:</label>
          <select
            type="text"
            name="tipo_magica_trampa"
            value={updatedCard.tipo_magica_trampa}
            onChange={handleChange}
          >
                                        <option value=""></option>
                            <option value="no">no aplica</option>
                            <option value="Normal">Normal</option>
                                        <option value="De campo">De campo</option>
                                        <option value="De equipo">De equipo</option>
                                        <option value="Continua">Continua</option>
                                        <option value="De juego rápido">De juego rapido</option>
                                        <option value="De ritual">De ritual</option>
                                        <option value="De contraefecto">De contraefecto</option>
                                        <option value="Continua">Continua</option>
            </select>
        </div>
        <div>
          <label>Nivel/Rango/Link:</label>
          <input
            type="number"
            name="nivel_rango_link"
            value={updatedCard.nivel_rango_link}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Escala:</label>
          <input
            type="number"
            name="escala"
            value={updatedCard.escala}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rareza:</label>
          <input
            type="text"
            name="rareza"
            value={updatedCard.rareza}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Limitación:</label>
          <input
            type="number"
            name="limitacion"
            value={updatedCard.limitacion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>ATK:</label>
          <input
            type="number"
            name="atk"
            value={updatedCard.atk}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>DEF:</label>
          <input
            type="number"
            name="def"
            value={updatedCard.def}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Materiales:</label>
          <input
            type="text"
            name="materiales"
            value={updatedCard.materiales}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={updatedCard.descripcion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Efecto Péndulo:</label>
          <textarea
            name="efecto_pendulo"
            value={updatedCard.efecto_pendulo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Caja:</label>
          <input
            type="text"
            name="caja"
            value={updatedCard.caja}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Estructura:</label>
          <input
            type="text"
            name="estructura"
            value={updatedCard.estructura}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Selection Box:</label>
          <input
            type="text"
            name="selection_box"
            value={updatedCard.selection_box}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Lote:</label>
          <input
            type="text"
            name="lote"
            value={updatedCard.lote}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Adicional:</label>
          <input
            type="text"
            name="adicional"
            value={updatedCard.adicional}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Actualizar</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default CardForm;
