import Counter from "@/components/Counter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-8">iFarmer Assessment</h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Redux Counter Test</h2>
        <Counter />
      </div>
    </div>
  );
}
