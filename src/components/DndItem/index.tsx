import React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';

export interface DndItemProps {
  name: string;
  style?: object;
  hideSourceOnDrag?: false | true;
}

const DndItem: React.FC<DndItemProps> = props => {
  const [{ isDragging }, drag] = useDrag({
    item: { name: props.name, type: 'box' },
    end: (item: { name: string } | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        console.log(`You dropped ${item.name} into ${dropResult.name}!`);
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

  return (
    <div ref={drag} style={{ ...props.style, opacity }}>
      {props.name}
    </div>
  );
};

export default DndItem;
