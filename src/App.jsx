import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const apiKey = 'TYpCCqTSucuKdn6+Pdng4Q==y2Q6YO1zJsf48yEH';

  const [quote, setQuote] = useState('no');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('no');

  const wordsArray = [
    "age", "alone", "amazing", "anger", "architecture", "art", "attitude", "beauty", "best",
    "birthday", "business", "car", "change", "communication", "computers", "cool", "courage",
    "dad", "dating", "death", "design", "dreams", "education", "environmental", "equality",
    "experience", "failure", "faith", "family", "famous", "fear", "fitness", "food", "forgiveness",
    "freedom", "friendship", "funny", "future", "god", "good", "government", "graduation", "great",
    "happiness", "health", "history", "home", "hope", "humor", "imagination", "inspirational",
    "intelligence", "jealousy", "knowledge", "leadership", "learning", "legal", "life", "love",
    "marriage", "medical", "men", "mom", "money", "morning", "movies", "success"
  ];

  const getQuote = () => {
    setQuote('no');
    const index = Math.floor((Math.random() * (wordsArray.length - 1) + 1))
    console.log("length : " + wordsArray.length);
    console.log("index : " + index);
    const word = wordsArray[index];
    console.log("word : " + word);
    fetch(`https://api.api-ninjas.com/v1/quotes?category=${word}`, {
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
    changeBackgroundColor();

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
  }, [])

  return (
    (quote == 'no') ? (
      <div className="flex items-center justify-center mt-52">
        <div className="border-t-8 border-black border-solid rounded-full animate-spin h-24 w-24"></div>
      </div>
    ) : (
      <section className="px-4 lg:px-0 mt-24">
      <div className="flex flex-col-reverse lg:flex-row lg:items-center">
        <div className="w-full lg:w-1/2 lg:order-last">
          <div className="lg:my-0 lg:px-4">
            <div className="text-xl font-bold mt-8 text-black sm:text-4xl lg:text-2xl">
              {quote}
            </div>
            <p className="mt-4 max-w-xl font-bold text-black leading-relaxed">
              AUTHOR: {author}
            </p>
            <form action="#" method="POST" className="mt-8 max-w-xl">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="flex w-full max-w-sm items-end space-x-2"></div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:ml-4">
          {imageUrl && (
            <img
              className="h-auto lg:h-full w-full rounded-lg object-cover"
              src={imageUrl}
              alt="Random Image from Unsplash"
              loading="lazy"
            />
          )}
        </div>
      </div>
      <button
        type="button"
        className="rounded-3xl bg-black mt-2 w-52 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        onClick={getQuote}
      >
        Next Quote
      </button>
    </section>
    )
  );

  // )
}

export default App
