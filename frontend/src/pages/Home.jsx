import { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import ReviewResult from "../components/ReviewResult";
import { reviewCode } from "../services/api";


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(null);
  const [error, setError] = useState(null);

  const handleReview = async (payload) => {
    setLoading(true);
    setError(null);
    setReview(null);

    try {
      const response = await reviewCode(payload);
      setReview(response.review);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">

        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              CodeSage <span className="text-blue-600">AI</span>
            </h1>
          </div>

          <p className="mt-2 text-sm text-gray-500 text-center">
            AI-powered code review for cleaner, smarter code
          </p>
        </div>

        <CodeEditor onSubmit={handleReview} loading={loading} />

        {error && (
          <p className="text-red-600 mt-4 text-center">{error}</p>
        )}

        <ReviewResult review={review} />
      </div>
    </div>
  );
}
