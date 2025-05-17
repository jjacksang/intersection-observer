import { useInView } from "react-intersection-observer";
import "./App.css";
import { MovieCard } from "./components/movie-card";
import useGetTopRatedMovies from "./hooks/useGetTopRatedMovie";
import { IMovie } from "./utils/type";
import { useCallback, useEffect, useRef } from "react";

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
    const observerElem = useRef(null);

    console.log(data);
    // const { ref, inView } = useInView();

    // useEffect(() => {
    //     if (inView && hasNextPage && !isFetchingNextPage) {
    //         fetchNextPage();
    //     }
    // }, [inView]);

    const handleObserver = useCallback(
        (entries: any) => {
            const [target] = entries;
            if (target.isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        },
        [fetchNextPage, hasNextPage]
    );

    useEffect(() => {
        const element = observerElem.current;

        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 1,
        };
        const observer = new IntersectionObserver(handleObserver, options);
        if (element) {
            observer.observe(element);
            console.log("mount");
        }
        return () => {
            if (element) {
                observer.unobserve(element);
                console.log("unmount");
            }
        };
    }, [fetchNextPage, hasNextPage, handleObserver]);

    return (
        <>
            <h2>무한 스크롤 구현 연습 with react-query</h2>
            <div className="grid grid- grid-cols-4 gap-4">
                {data?.pages.map((page, idx) =>
                    page.results.map((movie: IMovie) => <MovieCard movie={movie} />)
                )}
            </div>
            <div className="loader" ref={observerElem}>
                {isFetchingNextPage && hasNextPage ? "Loading..." : "No search left"}
            </div>
        </>
    );
}

export default App;
