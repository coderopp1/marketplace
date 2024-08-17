import { CategorySelection } from "../../components/storefront/CategorySelection";
import { FeaturedProducts } from "../../components/storefront/FeaturedProducts";
import { Hero } from "../../components/storefront/Hero";

export default function indexPage() {
  return (
    <h1>
      <Hero />
      <CategorySelection />
      <FeaturedProducts />
    </h1>
  );
}
