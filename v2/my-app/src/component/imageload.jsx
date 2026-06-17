import '../assets/cssStyle/imagecss.css'

function Img({ src, alt }) {
  return (
    <div id="img"><img src={src} alt={alt || ''} /></div>
  )
}

export default Img
