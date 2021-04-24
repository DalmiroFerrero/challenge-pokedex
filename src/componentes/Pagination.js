import React, { useState } from 'react';
import { MdLastPage, MdFirstPage } from 'react-icons/md';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

const Pagination = ({
  // ChangePokemonsPages,
  onLeftClick,
  onRightClick,
  firstPage,
  lastPage,
  page,
  totalPages
}) => {
  // const [cantidad, setCantidad] = useState(12);
  // const handleCbo = (e) => {
  //   setCantidad(e.target.value);
  //   ChangePokemonsPages(cantidad);
  // };

  return (
    <div className="info-pagination">
      {/* <div className="left-info">
        <span>Pokemons por página</span>
        <select onChange={handleCbo}>
          <option value={12} selected>
            12
          </option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div> */}
      <div title="Primera Página" className="pagination">
        <div className="btn-pages">
          <MdFirstPage onClick={firstPage} />
        </div>
        <div
          title="Anterior Página"
          className="btn-pages"
          onClick={onLeftClick}
        >
          <GrFormPrevious />
        </div>
        <span className="current-page">
          {page} de {totalPages}
        </span>
        <div
          title="Siguiente Página"
          className="btn-pages"
          onClick={onRightClick}
        >
          <GrFormNext />
        </div>
        <div title="Ultima Página" className="btn-pages">
          <MdLastPage onClick={lastPage} />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
