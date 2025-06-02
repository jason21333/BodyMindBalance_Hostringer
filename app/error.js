'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600 mb-8">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="space-x-4">
          <button
            onClick={() => reset()}
            className="bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition-colors"
          >
            Try again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="border-2 border-primary-600 text-primary-600 px-6 py-2 rounded-full hover:bg-primary-50 transition-colors"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  );
}