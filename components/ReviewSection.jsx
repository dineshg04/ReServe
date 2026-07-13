import { useState } from 'react';

const ReviewSection = () => {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');

    // Default reviews
    const [reviews, setReviews] = useState([
        { id: 1, rating: 4, description: 'Absolutely love this concept! Great way to save money and reduce waste!' },
        { id: 2, rating: 5, description: 'I was pleasantly surprised by how good the food was. Everything was packaged nicely, and the restaurant followed through on their commitment to sustainability. Highly recommend!' },
        { id: 3, rating: 4, description: 'Great value for money! The food was just as good as if I’d paid full price.' }
    ]);

    const handleAddClick = () => {
        setShowReviewForm(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (rating > 0 && description.trim()) {
          
            setReviews([
                ...reviews,
                { rating, description, id: Date.now() }, 
            ]);

            setRating(0);
            setDescription('');
            setShowReviewForm(false);
        }
    };

    return (
        <div className="p-4 mx-20 mb-16">
            <button
                className="bg-green-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-600"
                onClick={handleAddClick}
            >
                Add Review
            </button>

            {showReviewForm && (
                <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-medium">Rating:</label>
                        <div className="flex space-x-1 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`text-2xl cursor-pointer ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                    onClick={() => setRating(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Description:</label>
                        <textarea
                            className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Write your review here..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-600"
                    >
                        Submit
                    </button>
                </form>
            )}

            <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-800">Reviews</h2>
                <ul className="space-y-4 mt-4">
                    {reviews.map((review) => (
                        <li key={review.id} className="p-4 border border-gray-200 rounded-md bg-white shadow-md">
                            <div className="flex items-center mb-2">
                                <div className="flex space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`text-xl ${review.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-700">{review.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ReviewSection;
