import React from 'react';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Categorias = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#DDC5A1',
      }}
    >
      {/* Botón Desayunos/Meriendas */}
      <Button
        component={Link}
        to="/desayunos-meriendas"
        sx={{
          backgroundColor: '#A39986',
          color: '#000',
          width: '650px',
          height: '70px',
          marginBottom: '15px',
          fontWeight: 'bold',
          fontSize: '20px',
          '&:hover': {
            backgroundColor: '#8D7F6F',
          },
        }}
        aria-label="Ir a Desayunos/Meriendas"
      >
        Desayunos/Meriendas
      </Button>

      {/* Botón Comidas */}
      <Button
        component={Link}
        to="/comidas"
        sx={{
          backgroundColor: '#A39986',
          color: '#000',
          width: '650px',
          height: '70px',
          marginBottom: '15px',
          fontWeight: 'bold',
          fontSize: '20px',
          '&:hover': {
            backgroundColor: '#8D7F6F',
          },
        }}
        aria-label="Ir a Comidas"
      >
        Comidas
      </Button>

      {/* Botón Bebidas */}
      <Button
        component={Link}
        to="/bebidas"
        sx={{
          backgroundColor: '#A39986',
          color: '#000',
          width: '650px',
          height: '70px',
          marginBottom: '0px',
          fontWeight: 'bold',
          fontSize: '20px',
          '&:hover': {
            backgroundColor: '#8D7F6F',
          },
        }}
        aria-label="Ir a Bebidas"
      >
        Bebidas
      </Button>
    </Box>
  );
};

export default Categorias;
