import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const apiKey = 'TYpCCqTSucuKdn6+Pdng4Q==y2Q6YO1zJsf48yEH';

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1708844897353-649da595a3f2?q=80&w=800&h=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');


  const getQuote = async () => {
    await fetch('https://api.api-ninjas.com/v1/quotes?category=success', {
      headers: {
        'X-Api-Key': apiKey
      }
    })
      .then(response => response.json())
      .then(data => {
        // Handle response data
        console.log(data);
        setQuote(data[0].quote)
        setAuthor(data[0].author)
      })
      .catch(error => {
        console.error('Error:', error);
      });

    getImage();

  }

  const changeBackgroundColor = () => {
    const hexCharacters = `1234567890abcdef`;
    let color = `#`;
    for (let i = 0; i < 6; i++) {
      const index = Math.floor(Math.random() * 15 + 1)
      color += hexCharacters.charAt(index);
    }
    document.body.style.backgroundColor = color; // Change color here
  };

  const getImage = () => {
    fetch('https://source.unsplash.com/random/800x600')
      .then(response => {
        if (response.ok) {
          return response.url;
        }
        throw new Error('Failed to fetch image');
      })
      .then(url => setImageUrl(url))
      .catch(error => console.error('Error fetching image:', error));

  }

  useEffect(() => {
    getQuote();
    changeBackgroundColor();
  }, [])

  return (
    <section >
      <button className=' bg-red-700 w-full h-10 text-red-700 mb-2'>upside</button>
      <div className="px-2 lg:flex lg:flex-row lg:items-center">
        <div className="w-full lg:w-1/2">
          <div className=" lg:my-0 lg:px-4">
            <h2 className="text-xl font-bold  text-black sm:text-4xl lg:text-5xl">
              {quote}
            </h2>
            <p className="mt-4 max-w-xl font-bold text-black leading-relaxed ">
              AUTHOR : {author} </p>

            <form action="#" method="POST" className="mt-8 max-w-xl">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="flex w-full max-w-sm items-end space-x-2">


                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full ml-32 lg:w-3/4">
          {imageUrl && (
            <img
              className="h-full w-full rounded-md object-cover"
              src={imageUrl}
              alt="Random Image from Unsplash"
              loading="lazy"

            />
          )}
        </div>
      </div>
      <button className=' bg-red-700 w-full h-10 text-red-700 mt-2'>upside</button>
      <button
        type="button"
        className="rounded-3xl bg-black mt-2  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        onClick={getQuote}
      >
        next Quote
      </button>
    </section>

  )
}

export default App
