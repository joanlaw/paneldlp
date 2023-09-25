import React, { useEffect, useState } from 'react';
import { Card, Pagination, Input, Button } from 'antd';
import axios from 'axios';

const RushEditor = () => {
  const [rushes, setRushes] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState(''); // Estado para el valor de búsqueda
  
  // Función para realizar la búsqueda
  const performSearch = async () => {
    try {
      let url;
      if (search) {
        // Si hay un término de búsqueda, usa la ruta /rushes/:value
        url = `https://api.duellinks.pro/rushes/${search}`;
      } else {
        // Si no hay término de búsqueda, usa la ruta /rushes para obtener la lista paginada
        url = `https://api.duellinks.pro/rushes?page=${page}&size=10`;
      }
      
      const response = await axios.get(url);
      
      // Si se realizó una búsqueda específica, ajusta el estado para mostrar solo el resultado encontrado
      if (search) {
        setRushes([response.data]);
        setTotal(1);
      } else {
        setRushes(response.data.docs);
        setTotal(response.data.totalDocs);
      }
      
    } catch (error) {
      console.error('There was an error fetching the rushes!', error);
    }
  };

  useEffect(() => {
    // Realizar la búsqueda cuando cambia la página o el valor de búsqueda
    performSearch();
  }, [page, search]);
  
  
const onSearch = () => {
  setPage(1); // Reinicia la página a 1 cuando se realiza una nueva búsqueda
  performSearch(); // Realiza la búsqueda al presionar el botón "Search"
};

  
  return (
    <div>
     <Input 
        placeholder="Search by name or id" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        style={{ marginBottom: 16 }}
      />
      <Button onClick={onSearch} type="primary" style={{ marginBottom: 16 }}>Search</Button>
      
      {rushes.map(rush => (
        <Card key={rush._id} style={{ marginBottom: 16 }}>
          <img src={rush.image?.secure_url || 'https://via.placeholder.com/150'} alt={rush.name.en} />
          <h3>{rush.name.en}</h3>
        </Card>
      ))}
      <Pagination
        current={page}
        total={total}
        pageSize={10}
        onChange={(page) => setPage(page)}
      />
    </div>
  );
};

export default RushEditor;
