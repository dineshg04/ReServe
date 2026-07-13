const quotes = [
    "Save food, save the planet, one meal at a time.",
    "Reducing food waste creates a healthier planet for everyone.",
    "Small changes in food habits make a big environmental impact.",
    "Every meal saved from waste helps protect our precious resources.",
    "Cutting food waste means fewer resources wasted and a cleaner planet.",
    "Choose wisely: save food and make a difference for the environment.",
    "Saving food reduces waste and conserves resources for a better future.",
    "Turn surplus food into opportunity and contribute to a sustainable future.",
    "Reduce food waste today and help build a greener tomorrow.",
    "Every bite saved from waste helps our planet and future generations.",
];

const Banner = () => {
    // Select a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <div className="bg-green-500 h-12 flex items-center justify-center">
            <p className="text-white font-semibold text-center">{randomQuote}</p>
        </div>
    );
};

export default Banner;