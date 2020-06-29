import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  /* State de la app */
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {

    /* Evitar que haga consultas vacias */
    if (busqueda === '') return;

    const consultarAPI = async () => {
      const imagenesPorPagina = 30;
      const key = 'xxxxxxxxxx';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      /* Calcular la cantidad de paginas */
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      /* Mover la pantalla hacia arriba */
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'});
    };

    consultarAPI();

  }, [busqueda, paginaactual]);

  /* Definir pagina anterior */
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    /* Validar que no vaya a numeros negativos */
    if (nuevaPaginaActual === 0) return;
    /* Retrocede una pagina */
    guardarPaginaActual(nuevaPaginaActual)
  };

  /* Definir pagina Siguiente */
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    /* Valida no exceder el total de paginas */
    if (nuevaPaginaActual > totalpaginas) return;

    /* Avanza una pagina */
    guardarPaginaActual(nuevaPaginaActual)
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imágenes</p>
        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />

        {(paginaactual === 1) ? null : (
          <button type="button" className="btn btn-info mr-1" onClick={paginaAnterior}>&laquo; Anterior</button>
        )}
        
        {paginaactual === totalpaginas ? null : (
          <button type="button" className="btn btn-info mr-1" onClick={paginaSiguiente}>Siguiente &raquo;</button>
        )}

      </div>
    </div>
  );
}

export default App;