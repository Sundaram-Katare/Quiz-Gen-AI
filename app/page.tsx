import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-green-50 text-green-900">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-700">AI Quiz Generator</h1>
        <nav className="flex gap-6 text-sm font-medium">
          <a href="#features" className="hover:text-green-700">Features</a>
          <a href="#how" className="hover:text-green-700">How it works</a>
          <a href="#pricing" className="hover:text-green-700">Pricing</a>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Get Started
          </button>
        </nav>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight">
              Generate Smart Quizzes with AI in Seconds
            </h2>
            <p className="mt-6 text-lg text-green-800">
              Create personalized quizzes from any topic, document, or syllabus using AI-powered intelligence.
            </p>
            <div className="mt-8 flex gap-4">
              <Link 
               href={"/form"}
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700">
                Create Quiz
              </Link>
              <button className="px-6 py-3 border border-green-600 text-green-700 rounded-xl font-semibold hover:bg-green-100">
                View Demo
              </button>
            </div>
          </div>
          {/* <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
            <div className="space-y-4">
              <div className="h-4 w-3/4 bg-green-100 rounded"></div>
              <div className="h-4 w-full bg-green-100 rounded"></div>
              <div className="h-4 w-5/6 bg-green-100 rounded"></div>
              <div className="h-10 w-40 bg-green-600 rounded mt-6"></div>
            </div>
          </div> */}

          <div>
            <img src="https://png.pngtree.com/png-clipart/20240318/original/pngtree-3d-render-student-studying-concept-png-image_14621216.png" alt="" />
          </div>
        </section>

        <section id="features" className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-3xl font-bold text-center">Features</h3>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border border-green-100 rounded-xl">
                <h4 className="text-xl font-semibold text-green-700">AI Generated Questions</h4>
                <p className="mt-3 text-green-800">
                  Automatically generate high-quality questions based on difficulty and topic.
                </p>
              </div>
              <div className="p-6 border border-green-100 rounded-xl">
                <h4 className="text-xl font-semibold text-green-700">Multiple Formats</h4>
                <p className="mt-3 text-green-800">
                  MCQs, true or false, short answers, and more formats supported.
                </p>
              </div>
              <div className="p-6 border border-green-100 rounded-xl">
                <h4 className="text-xl font-semibold text-green-700">Instant Export</h4>
                <p className="mt-3 text-green-800">
                  Export quizzes as PDF or share links instantly with students.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="py-20 bg-green-50">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-3xl font-bold text-center">How It Works</h3>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-12 h-12 mx-auto bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <h4 className="mt-4 font-semibold text-lg">Enter Topic</h4>
                <p className="mt-2 text-green-800">
                  Provide a topic, document, or syllabus.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <h4 className="mt-4 font-semibold text-lg">Generate Quiz</h4>
                <p className="mt-2 text-green-800">
                  AI creates relevant and balanced questions.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <h4 className="mt-4 font-semibold text-lg">Share & Analyze</h4>
                <p className="mt-2 text-green-800">
                  Share quizzes and track performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold">Simple Pricing</h3>
            <div className="mt-12 flex justify-center">
              <div className="p-8 border border-green-200 rounded-2xl max-w-sm">
                <h4 className="text-xl font-semibold text-green-700">Starter</h4>
                <p className="mt-4 text-4xl font-bold">Free</p>
                <ul className="mt-6 space-y-2 text-green-800">
                  <li>5 quizzes per month</li>
                  <li>Basic AI questions</li>
                  <li>Email support</li>
                </ul>
                <button className="mt-8 w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700">
                  Start Free
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-green-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-sm">
          <p>© 2025 AI Quiz Generator</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
