import { useInView } from "react-intersection-observer";
import "./App.css";
import { MovieCard } from "./components/movie-card";
import useGetTopRatedMovies from "./hooks/useGetTopRatedMovie";
import { IMovie } from "./utils/type";
import { useEffect } from "react";

type Data = {
    pages: {
        page: number;
        results: IMovie[];
        total_pages: number;
        total_results: number;
    };
};

function App() {
    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useGetTopRatedMovies();
    console.log(data);

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView]);
    return (
        <>
            <h2>무한 스크롤 구현 연습 with react-query</h2>
            <div className="grid grid- grid-cols-4 gap-4">
                {data?.pages.map((page, idx) =>
                    page.results.map((movie: IMovie) => <MovieCard movie={movie} />)
                )}
            </div>
            <h2 ref={ref}>Load More!</h2>
        </>
    );
}

export default App;
