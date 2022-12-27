import React from 'react';

import Side from "../Side/Side";
import Main from "../Main/Main";


export default function Home() {
  return (
    <div className="w-full h-full flex overflow-hidden relative">
      <Side />
      <Main />
    </div>
  );
}
