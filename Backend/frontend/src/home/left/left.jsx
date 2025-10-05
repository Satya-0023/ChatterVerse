import React from 'react';
import Search from './search';
import Users from './Users';
export default function left() {
  return (
    <div className='w-full bg-black text-white h-screen flex flex-col'>
      <h1 className="font-bold text-3xl p-2 px-11">Chats</h1>
      <Search />
      <hr />
      <Users />
    </div>
  );
}
