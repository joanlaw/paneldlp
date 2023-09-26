import React, { useEffect, useState } from 'react';
import { Card, Pagination, Input, Button } from 'antd';
import axios from 'axios';
import RushForm from './RushForm'; // Asegúrate de importar el componente RushForm

const RushEditor = () => {
  const [rushes, setRushes] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editRushId, setEditRushId] = useState(null);

  // Definición de la función performSearch en el mismo alcance
  const performSearch = async () => {
    try {
      let url;
      if (search) {
        url = `https://api.duellinks.pro/rushes/${search}`;
      } else {
        url = `https://api.duellinks.pro/rushes?page=${page}&size=10`;
      }

      const response = await axios.get(url);

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
    setPage(1);
    performSearch();
  };

  const showEditModal = (rushId) => {
    setEditRushId(rushId);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setEditRushId(null);
  };

  const handleUpdate = () => {
    closeEditModal();
    performSearch();
  };

  return (
    <div>
      <Input
        placeholder="Search by name or id"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Button onClick={onSearch} type="primary" style={{ marginBottom: 16 }}>
        Search
      </Button>

      {rushes.map((rush) => (
        <Card key={rush._id} style={{ marginBottom: 16 }}>
          <img
            src={rush.image?.secure_url || 'https://via.placeholder.com/150'}
            alt={rush.name.en}
          />
          <h3>{rush.name.en}</h3>
          <Button onClick={() => showEditModal(rush._id)} type="primary">
            Edit
          </Button>
        </Card>
      ))}

      <Pagination
        current={page}
        total={total}
        pageSize={10}
        onChange={(page) => setPage(page)}
      />

      <RushForm
        visible={editModalVisible}
        onCancel={closeEditModal}
        rushId={editRushId}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default RushEditor;
