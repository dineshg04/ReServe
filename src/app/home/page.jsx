import AllStores from "../../../components/AllStores.jsx";
import Categories from "../../../components/Categories.jsx";
import Header from "../../../components/Header.jsx";
import HighestRated from "../../../components/HighestRated.jsx";
import Options from "../../../components/Options.jsx";


const Home = () => {
  return (
    <main>
       <Header />
       <Categories />
       <HighestRated />
       <Options />
       <AllStores />
    </main>
  )  
};

export default Home;
