import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
  useDeleteCommentMutation, // Import delete mutation
} from "../../redux/api/movies";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewsToShow, setReviewsToShow] = useState(5); // Initially show 5 reviews

  const [createReview, { isLoading: loadingReview }] =
    useAddMovieReviewMutation();
  const [deleteComment] = useDeleteCommentMutation(); // Delete mutation

  // Handle Review Submission
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ id: movieId, rating, comment }).unwrap();
      refetch();
      setRating(0);
      setComment("");
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error?.message || "Failed to create review.");
    }
  };

  // Handle Review Deletion
  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteComment({ movieId, reviewId });
      toast.success("Comment Deleted");
      refetch();
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  // Handle Star Rating click
  const handleRating = (value) => setRating(value);

  // Show more reviews
  const handleShowMoreReviews = () => setReviewsToShow(reviewsToShow + 2);

  // Get limited reviews to display
  const limitedReviews = movie?.reviews?.slice(0, reviewsToShow) || [];

  return (
    <div className="container mx-auto p-4">
      {/* Back Button */}
      <div className="mb-4">
        <Link to="/" className="text-blue-600 font-semibold hover:underline">
          Go Back
        </Link>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Left Section: Movie Image */}
        <div className="w-full lg:w-1/3">
          <img
            src={movie?.image}
            alt={movie?.name}
            className="rounded-lg w-full"
          />
        </div>

        {/* Right Section: Movie Info */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-3xl font-bold mb-4">{movie?.name}</h2>
          <p className="text-gray-700 mb-4">{movie?.detail}</p>
          <p className="text-xl font-semibold">Release Date: {movie?.year}</p>

          {/* Cast Details */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Cast:</h3>
            <ul>
              {movie?.cast.map((actor, index) => (
                <li key={index} className="text-gray-600">
                  {actor}
                </li>
              ))}
            </ul>
          </div>

          {/* Rating Display and Selection */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Rate this Movie:</h3>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`text-2xl cursor-pointer ${
                    rating >= star ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <p className="mt-2 text-gray-600">Your Rating: {rating}</p>
          </div>

          {/* Review Form */}
          {userInfo ? (
            <form onSubmit={submitHandler} className="mt-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Write your review..."
              />
              <button
                type="submit"
                disabled={loadingReview}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                {loadingReview ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          ) : (
            <p>
              Please <Link to="/login">Sign In</Link> to write a review
            </p>
          )}

          {/* Movie Reviews Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold">User Reviews</h3>
            {limitedReviews.length === 0 ? (
              <p>No reviews yet. Be the first to review!</p>
            ) : (
              limitedReviews.map((review) => (
                <div key={review.id} className="mt-4 border-b pb-4">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">{review.userName}</p>
                    <div className="text-yellow-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>

                  {/* Delete Button for Admins */}
                  {userInfo?.isAdmin && (
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteComment(movieId, review._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Show More Button */}
          {movie?.reviews?.length > reviewsToShow && (
            <div className="mt-4 text-center">
              <button
                onClick={handleShowMoreReviews}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
