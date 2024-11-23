import React from 'react'
import './Structure.css'

// Importando as imagens
import img1 from '../assets/estrutura-01.jpg'
import img2 from '../assets/estrutura-02.jpg'
import img3 from '../assets/estrutura-03.jpg'
import img4 from '../assets/estrutura-04.jpg'
import img5 from '../assets/estrutura-05.jpg'
import img6 from '../assets/estrutura-06.jpg'
import img7 from '../assets/estrutura-07.jpg'
import img8 from '../assets/estrutura-08.jpg'
import img9 from '../assets/estrutura-09.jpg'
import img10 from '../assets/estrutura-10.jpg'

const Structure = () => {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]

  return (
    <div className="structure-container">
      <h1>Nossa Estrutura</h1>
      <div className="grid">
        {/* Renderizando as imagens */}
        {images.map((image, index) => (
          <div className="grid-item" key={index}>
            <img
              src={image}
              alt={`Imagem ${index + 1}`}
              className="image-placeholder"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Structure
