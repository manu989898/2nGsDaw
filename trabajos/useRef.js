import React, { useRef, useState } from 'react';
import { produce } from 'immer';

function UseRefImmerExample() {
  const inputRef = useRef(null); // Referencia al input
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ]);

  const addItem = () => {
    const newItemName = inputRef.current.value; // Usar el valor del input
    if (!newItemName.trim()) {
      alert('Please enter a valid item name.');
      return;
    }

    // Usar immer para actualizar el estado de forma inmutable
    setItems((currentItems) =>
      produce(currentItems, (draft) => {
        draft.push({
          id: currentItems.length + 1,
          name: newItemName,
        });
      })
    );

    // Limpiar el input
    inputRef.current.value = '';
  };

  const deleteItem = (id) => {
    setItems((currentItems) =>
      produce(currentItems, (draft) => {
        const index = draft.findIndex((item) => item.id === id);
        if (index !== -1) draft.splice(index, 1);
      })
    );
  };

  return (
    <div>
      <h1>useRef & immer Example</h1>
      <div>
        <input ref={inputRef} type="text" placeholder="Enter item name" />
        <button onClick={addItem}>Add Item</button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}{' '}
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UseRefImmerExample;
