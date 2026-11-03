import HeroSlider from "@/components/home/HeroSlider";
import HomeCTA from "@/components/home/HomeCTA";
import HowBorrowingWorks from "@/components/home/HowBorrowingWorks";
import TopCategories from "@/components/home/TopCatagories";


export default function Home() {
  return (
   <>
    <HeroSlider/>
    <TopCategories />
    <HowBorrowingWorks />
    <HomeCTA />
   </>
  );
}
