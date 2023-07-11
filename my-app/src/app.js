import Header from './components/header';
import CryptoCurrencyList from './pages/cryptoCurrencyList'; //page ---> 
import Pagination from './pagination';

function App() {
    return (
        <div>
            <Header />
            <CryptoCurrencyList />
            <Pagination />
        </div>
    )
}

export default App