import React from 'react';

export default () => {
  const listItems = ['', '', '', '', '', '', '', ''];

  return (
    <div>
      <hr />
      <h4 className="text-center">Archives</h4>
      <ul className="list-unstyled text-center">
        {listItems.map(item => (
          <li className="text-secondary">Month year</li>
        ))}
      </ul>
    </div>
  );
};
