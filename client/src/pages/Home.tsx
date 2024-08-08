import { useEffect, useState } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";

type Props = {
  data: any;
  title: string;
};

function RenderCards({ data, title }: Props) {
  if (data?.length > 0) return data.map((post: any) => <Card key={post._id} {...post} />);

  return <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>;
}

function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchedResults, setSearchedResults] = useState<any[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<any>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch("https://creativize.onrender.com/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();

          setAllPosts(result.data.reverse());
        }
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(event.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchedResults(searchResults);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Community</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Browse through a collection of imaginative and visually stunning images generated by yourself and other users.
        </p>
      </div>
      <div className="mt-16">
        <input
          placeholder={"Search posts..."}
          value={searchText}
          onChange={handleSearchChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:border-indigo-500 focus:border-violet-500 outline-none block w-full p-3"
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards data={searchedResults} title="No search results found" />
              ) : (
                <RenderCards data={allPosts} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
