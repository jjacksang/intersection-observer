import { QueryCache, useInfiniteQuery } from "@tanstack/react-query";

const queryCache = new QueryCache({
    onError: (error) => {
        console.log(error);
    },
    onSuccess: (data) => {
        console.log(data);
    },
    onSettled: (data, error) => {
        console.log(data, error);
    },
});

const fetchTopMovies = async (page: number) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?page=${page}
        `,
        {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
        }
    );
    if (!res.ok) {
        throw new Error();
    }

    return res.json();
};

const useGetTopRatedMovies = () => {
    return useInfiniteQuery({
        queryKey: ["top-rated-movie"],
        queryFn: ({ pageParam }) => {
            return fetchTopMovies(pageParam);
        },
        getNextPageParam: (last) => {
            if (last.page < last.total_pages) {
                return last.page + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
    });
};

export default useGetTopRatedMovies;
