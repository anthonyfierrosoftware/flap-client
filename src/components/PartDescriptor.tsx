import React, { useEffect, useState } from 'react';

const PartDescriptor = ({ name, amount }: { name: string; amount: number }) => {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setNotes('');
  }, [name]);

  return (
    <div>
      <h3>Name: {name}</h3>
      <h3>Amount: {amount}</h3>
      <h3>Description: Lorem Ipsum dolor sit amet</h3>
      <h4>
        Notes: <input value={notes} onChange={e => setNotes(e.target.value)} />
      </h4>
    </div>
  );
};

export default PartDescriptor;
