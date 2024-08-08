import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomPrompt } from "../utils";
import Loader from "../components/Loader";

function Create() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function generateImage() {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("https://creativize.onrender.com/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch("https://creativize.onrender.com/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        await response.json();
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  }

  function handleRandom() {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Create imaginative and visually stunning images through DALLE-AI and share them with the community
        </p>
      </div>
      <form className="mt-8 max-w-3xl bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-900">
              {"Your Name"}
            </label>
            <input
              id="name"
              name="name"
              placeholder="Arnav Patel"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none block w-full p-3"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-900">
                Prompt
              </label>
              <button
                type="button"
                onClick={handleRandom}
                className="font-semibold text-xs bg-gray-200 py-1 px-2 rounded text-black"
              >
                Surprise me
              </button>
            </div>
            <textarea
              id="prompt"
              name="prompt"
              placeholder="Placeholder"
              value={form.prompt}
              onChange={(event) => setForm({ ...form, prompt: event.target.value })}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none block w-full p-3"
            />
          </div>
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" />
            ) : (
              <img src="preview" alt="preview" className="w-9/12 h-9/12 object-contain opacity-40" />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-indigo-600 font-semibold rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-6">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created the image you want, you can share it with others in the community
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-purple-600 font-semibold rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Create;
