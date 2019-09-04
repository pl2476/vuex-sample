import React from 'react';
import { useDrop } from 'react-dnd';

export interface DndBoxProps {
  style?: object;
  content?: string | number;
  activeContent?: string;
}

const DndBox: React.FC<DndBoxProps> = props => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'box',
    drop: item => item,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver;
  let backgroundColor = '#fff';
  if (isActive) {
    backgroundColor = '#9FCC43';
  } else if (canDrop) {
    backgroundColor = '#fff';
  }

  return (
    <div ref={drop} style={{ ...props.style, backgroundColor }}>
      {isActive ? props.activeContent : props.content}
    </div>
  );
};

export default DndBox;
