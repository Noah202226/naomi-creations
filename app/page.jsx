import Image from "next/image";
import DropDown from "./components/DropDown";
import CenteredHero from "./components/CenteredHero";
import ProductList from "./components/ProductLists";

export default function Home() {
  return (
    <>
      <CenteredHero />
      <ProductList />
    </>
  );
}
