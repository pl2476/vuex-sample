import React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';

export interface Item {
  id: number;
  desc: string | undefined;
  x: number;
  y: number;
  h: number;
}

export interface DndItemProps {
  data: Item;
  style?: object;
  hideSourceOnDrag?: false | true;
}

const DndItem: React.FC<DndItemProps> = props => {
  const [{ isDragging }, drag] = useDrag({
    item: { data: props.data, type: 'box' },
    end: (item: { data: Item } | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        const { data } = item;
        console.log(`You dropped ${data.desc} into ${dropResult.name}!`);
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.4 : 0.6;

  if (isDragging && props.hideSourceOnDrag) {
    return <div ref={drag} />;
  }

  const { data } = props;
  return (
    <div ref={drag} style={{ ...props.style, opacity }}>
      {data.desc}
    </div>
  );
};

export default DndItem;
