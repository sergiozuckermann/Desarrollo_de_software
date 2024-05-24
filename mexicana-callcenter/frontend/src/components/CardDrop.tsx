// src/components/CardDrag.tsx
import React from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 200px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.9); /* Añadir opacidad constante */
  padding: 1em;
  margin: 1em;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; /* Para el título fijo */
  overflow: hidden; /* Para ocultar el scroll bar */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;

  &.isOver {
    background-color: lightgreen;
  }
`;

const CardTitle = styled.h3`
  margin-bottom: 10px;
  text-align: center;
  position: sticky; /* Mantener el título fijo */
  top: 0;
  background: rgba(255, 255, 255, 0.9); /* Añadir opacidad constante */
  width: 100%;
  padding: 0.5em 0;
  border-bottom: 1px solid #ccc;
  z-index: 1;
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  border-top-left-radius: 8px; /* Esquinas redondeadas arriba */
  border-top-right-radius: 8px;
`;

const AgentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100% - 40px); /* Ajustar para el título fijo */
  overflow-y: auto; /* Habilitar desplazamiento vertical */
  scrollbar-width: none; /* Ocultar barra de desplazamiento en Firefox */
  -ms-overflow-style: none;  /* Ocultar barra de desplazamiento en IE y Edge */
  
  &::-webkit-scrollbar {
    width: 0;
    height: 0; /* Ocultar barra de desplazamiento en Chrome, Safari y Opera */
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px; /* Altura del fondo transparente */
    background: linear-gradient(to top, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0));
    z-index: 1; /* Colocar por encima del contenido */
  }
`;

const CardDrop = ({ profileName, routingProfileId, onAgentDrop, children }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'AGENT',
    drop: (item) => onAgentDrop(item.id, routingProfileId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  console.log('Profile Name:', profileName);
  console.log('Routing Profile Id:', routingProfileId);
  console.log('isOver:', isOver);

  return (
    <CardContainer ref={drop} className={isOver ? 'isOver' : ''}>
      <CardTitle>{profileName}</CardTitle>
      <AgentsContainer>
        {children}
      </AgentsContainer>
    </CardContainer>
  );
};

export default CardDrop;
