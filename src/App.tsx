import ProductGrid from "./components/ProductGrid";
import FAQSection from "./components/FAQSection";
import ProductCarousel from './components/ProductCarousel';


function App() {
  return (
  <main className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
    <div className="max-w-7xl mx-auto">
      <ProductCarousel />
      <ProductGrid />
      <FAQSection />
    </div>
  </main>
  );
}

export default App;