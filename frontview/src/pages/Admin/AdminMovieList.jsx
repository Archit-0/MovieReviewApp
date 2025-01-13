// import { Link } from "react-router-dom";
// import { useGetAllMoviesQuery } from "../../redux/api/movies";

// const AdminMoviesList = () => {
//   const { data: movies, isLoading, isError } = useGetAllMoviesQuery();

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error loading movies.</div>;
//   if (!movies || movies.length === 0) {
//     return <div className="text-center text-gray-500">No movies found.</div>;
//   }

//   return (
//     <div className="container mx-[9rem]">
//       <div className="flex flex-col md:flex-row">
//         <div className="p-3">
//           <div className="ml-[2rem] text-xl font-bold h-12">
//             All Movies ({movies?.length})
//           </div>

//           <div className="flex flex-wrap justify-around items-center p-[2rem]">
//             {movies?.map((movie) => (
//               <div
//                 key={movie._id}
//                 className="max-w-sm m-[2rem] rounded overflow-hidden shadow-lg"
//               >
//                 {/* Outer Link for the movie card */}
//                 <Link to={`/admin/movies/update/${movie._id}`}>
//                   <img
//                     src={movie.image}
//                     alt={movie.name}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="px-6 py-4 border border-gray-400">
//                     <div className="font-bold text-xl mb-2">{movie.name}</div>
//                     <p className="text-gray-700 text-base">{movie.detail}</p>
//                   </div>
//                 </Link>

//                 {/* Separate button for updating */}
//                 <div className="mt-[2rem] mb-[1rem]">
//                   <button
//                     onClick={() =>
//                       navigate(`/admin/movies/update/${movie._id}`)
//                     }
//                     className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
//                   >
//                     Update Movie
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminMoviesList;

// // import { Link } from "react-router-dom";
// // import { useGetAllMoviesQuery } from "../../redux/api/movies";

// // const AdminMoviesList = () => {
// //   const { data: movies } = useGetAllMoviesQuery();

// //   return (
// //     <div className="container mx-[9rem]">
// //       <div className="flex flex-col md:flex-row">
// //         <div className="p-3">
// //           <div className="ml-[2rem] text-xl font-bold h-12">
// //             All Movies ({movies?.length})
// //           </div>

// //           <div className="flex flex-wrap justify-around items-center p-[2rem]">
// //             {movies?.map((movie) => (
// //               <Link
// //                 key={movie._id}
// //                 to={`/admin/movies/update/${movie._id}`}
// //                 className="block mb-4 overflow-hidden"
// //               >
// //                 <div className="flex">
// //                   <div
// //                     key={movie._id}
// //                     className="max-w-sm  m-[2rem] rounded overflow-hidden shadow-lg"
// //                   >
// //                     <img
// //                       src={movie.image}
// //                       alt={movie.name}
// //                       className="w-full h-48 object-cover"
// //                     />
// //                     <div className="px-6 py-4 border border-gray-400">
// //                       <div className="font-bold text-xl mb-2">{movie.name}</div>
// //                     </div>

// //                     <p className="text-gray-700 text-base">{movie.detail}</p>

// //                     <div className="mt-[2rem] mb-[1rem]">
// //                       <Link
// //                         to={`/admin/movies/update/${movie._id}`}
// //                         className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
// //                       >
// //                         Update Movie
// //                       </Link>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </Link>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminMoviesList;

import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();

  return (
    <div className="container mx-[9rem]">
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <div className="ml-[2rem] text-xl font-bold h-12">
            All Movies ({movies?.length})
          </div>

          <div className="flex flex-wrap justify-around items-center p-[2rem]">
            {movies?.map((movie) => (
              <Link
                key={movie._id}
                to={`/admin/movies/update/${movie._id}`}
                className="block mb-4 overflow-hidden"
              >
                <div className="flex">
                  <div
                    key={movie._id}
                    className="max-w-sm  m-[2rem] rounded overflow-hidden shadow-lg"
                  >
                    <img
                      src={movie.image}
                      alt={movie.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="px-6 py-4 border border-gray-400">
                      <div className="font-bold text-xl mb-2">{movie.name}</div>
                    </div>

                    <p className="text-gray-700 text-base">{movie.detail}</p>

                    <div className="mt-[2rem] mb-[1rem]">
                      <Link
                        to={`/admin/movies/update/${movie._id}`}
                        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Update Movie
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMoviesList;
