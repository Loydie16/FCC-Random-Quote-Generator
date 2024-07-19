import { useState, useEffect } from "react";
import axios from 'axios';
import { FaTwitter, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";


interface Quote {
  content: string;
  author: string;
}

const getRandomColor = (): string => {
  const red = Math.floor(Math.random() * 128);
  const green = Math.floor(Math.random() * 128);
  const blue = Math.floor(Math.random() * 128);

  return `rgb(${red}, ${green}, ${blue})`;
};

const transition = "all 1s";

function App() {
  const [quote, setQuote] = useState<Quote>({ content: '', author: '' });
  const [randomColor, setRandomColor] = useState<string>(getRandomColor());

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote(response.data);
    } catch (error) {
      console.error("Error fetching the quote: ", error);
    }
  };

  const changeQuote = () => {
    fetchQuote();
    setRandomColor(getRandomColor());
  };

  useEffect(() => {
    fetchQuote(); // Fetch a quote when the component mounts
  }, []);

  return (
    <div
      className="flex m-0 justify-center items-center h-screen"
      style={{ backgroundColor: randomColor, transition }}
    >
      <div
        id="quote-box"
        className="flex flex-col justify-between p-8 text-left rounded-lg shadow-md mx-2 auto md:w-[500px]  bg-white"
      >
        <div
          className="flex flex-col justify-center "
          style={{ color: randomColor, transition }}
        >
          <div
            id="text"
            className="flex text-[1.75rem] font-sans font-semibold"
          >
            <i>
              <FaQuoteLeft
                size="20"
                className="mr-2"
              />
            </i>
            <span>
              {quote.content}
              <i>
                <FaQuoteRight
                  size="20"
                  className="inline-block absolute ml-2"
                />
              </i>
            </span>
          </div>
          <h4 id="author" className="text-right text-xl font-thin mt-4">
            - {quote.author}
          </h4>
        </div>
        <div className="flex flex-row justify-between mt-10">
          <a
            target="_blank"
            href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote.content}`}
            id="tweet-quote"
            className="rounded-lg border border-transparent py-4 px-3 bg-gray-900 hover:bg-gray-800 text-white font-medium cursor-pointer "
            style={{
              backgroundColor: randomColor,
              marginRight: "10px",
              transition,
            }}
          >
            <FaTwitter color="white" />
          </a>
          <button
            id="new-quote"
            onClick={changeQuote}
            className="rounded-lg border border-transparent py-3 px-6 bg-gray-900 hover:bg-gray-800 text-white font-medium cursor-pointer"
            style={{ backgroundColor: randomColor, transition }}
          >
            Change Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
