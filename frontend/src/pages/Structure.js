import React from 'react'
import './Structure.css'

const Structure = () => {
  return (
    <div className="structure-container">
      <h1>Nossa Estrutura</h1>
      <div className="grid">
        {/* Placeholder para as imagens */}
        {Array.from({ length: 15 }).map((_, index) => (
          <div className="grid-item" key={index}>
            <div className="image-placeholder">Imagem {index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Structure
