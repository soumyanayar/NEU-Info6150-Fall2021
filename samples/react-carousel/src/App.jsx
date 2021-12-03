import './App.css';
import Carousel from './Carousel';


function App() {
  const slides = [
    { src: 'https://placekitten.com/150/150/?image=1', alt: "you should have better alt text", },
    { src: 'https://placekitten.com/150/150/?image=2', alt: "that actually describes the image", },
    { src: 'https://placekitten.com/150/150/?image=3', alt: "because useless text like this will lose points", },
  ];

  return (
    <div className="app">
      <Carousel slides={slides}/>
    </div>
  );
}

export default App;
