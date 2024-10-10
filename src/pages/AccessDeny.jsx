import React from 'react';
import '../css/AccessDeny.css';

export default function AccessDeny() {
  return (
    <>
      <section style={{ 'backgroundColor': '#27292f', 'color': 'white' }}>
        <div className="w3-display-middle">
          <h3 className="w3-center w3-animate-zoom">🚫🚫🚫🚫</h3>
          <h1 className="w3-jumbo w3-animate-zoom w3-center"><code style={{ fontSize: '3.5rem' }}>拒絕訪問</code></h1>
          <hr className="w3-border-white w3-animate-zoom" style={{ margin: 'auto', width: '50%' }} />
          <h3 className="w3-center w3-animate-zoom" style={{ margin: '10px 0px' }}>您不是此系統之被照護者，請洽系統管理員</h3>
          <h3 className="w3-center w3-animate-zoom" style={{ width: 'auto' }}>error code:403 Access Denied</h3>
        </div>
      </section>
    </>
  );
}