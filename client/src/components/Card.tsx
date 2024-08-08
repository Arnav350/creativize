import { downloadImage } from "../utils/index.js";

type TProps = {
  _id: string;
  name: string;
  prompt: string;
  photo: string;
};

function Card({ _id, name, prompt, photo }: TProps) {
  return (
    <div className="rounded-xl group relative shadow-lg hover:shadow-2xl card transition-shadow duration-300">
      <img src={photo} alt={prompt} className="w-full h-auto object-cover rounded-t-xl" />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 m-2 p-4 rounded-b-xl">
        <p className="text-white text-md overflow-y-auto prompt">{prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-indigo-600 flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button
            type="button"
            className="outline-none bg-transparent border-none"
            onClick={() => downloadImage(_id, photo)}
          >
            <img src="download" alt="download" className="w-6 h-6 object-contain invert" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
