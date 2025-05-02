import { IMovie } from "../utils/type";

export const MovieCard = ({ movie }: { movie: IMovie }) => {
    console.log(movie);
    return (
        <div className="flex flex-col rounded-xl border-white border-3 bg-black max-w-xs max-h-fit">
            <div className="flex w-full">
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    className="flex p-6 border-none"
                />
            </div>
            <div className="text-xl font-bold mb-8">{movie.title}</div>
        </div>
    );
};
