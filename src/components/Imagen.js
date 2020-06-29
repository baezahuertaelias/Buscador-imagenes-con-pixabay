import React from 'react';

const Imagen = ({imagen}) => {
    /* Extrar variables */
    
    const {largeImageURL, likes, previewURL, tags, views} = imagen;

    return ( 
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
                <img src={previewURL} alt={tags} className="card-img-top" />

                <div className="card-body">
                    <p className="card-text">Me gusta: {likes}</p>
                    <p className="card-text">Vistas: {views}</p>
                </div>

                <div className="card-footer">
                    <a 
                        href={largeImageURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-block"
                    >Ver imagen</a>
                </div>
            </div>
        </div>
     );
}
 
export default Imagen;