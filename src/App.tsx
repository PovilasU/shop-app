import { FAQSection } from "./components/FAQSection";
import { ProductGrid } from "./components/ProductCatalog";
import { ProductCarousel } from "./components/ProductCarousel";
import { Footer } from "./components/Footer";

function App() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <ProductCarousel />
        <ProductGrid />
        <FAQSection />
        <Footer
          gitUrl="https://github.com/PovilasU/shop-app"
          linkedinUrl="https://www.linkedin.com/in/povilas-urbonas-0a6a53a4/"
        />
      </div>
    </main>
  );
}

export default App;
