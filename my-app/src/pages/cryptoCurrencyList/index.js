import React from 'react';
import Table from '../../components/table';
import Loading from '../../components/loading';
import Pagination from '../../pagination';
class CryptoCurrencyList extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            data: [],
            error: null,
            page: 1,
        };
    }
    async handleGetCurrenciesList() {
        this.setState({
            loading: true,
        });
        try {
            const { page } = this.state;
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/?per_page=10&page=${page}`);
            const result = await response.json();
            this.setState({
                data: result,
            });
        } catch (error) {
            this.setState({
                error: 'Error Oops',
            });
        } finally {
            this.setState({
                loading: false,
            });
        }
    }
    handlePageChange = (page) => {
        this.setState(
            {
                page: page,
            },
            () => {
                this.handleGetCurrenciesList();
            }
        );
    };
    componentDidMount() {
        this.handleGetCurrenciesList();
    }
    handleSearchChange = (event) => {
        this.setState(
            {
                page: 1, // Reset page number when search term changes
            },
            () => {
                this.handleGetCurrenciesList();
            }
        );
    };
    render() {
        const { loading, error, data, page } = this.state;
        const totalPages = 10; // Set the total number of pages based on your data
        if (loading) {
            return (
                <div className="loading-container">
                    <Loading width="80px" height="80px" />
                </div>
            );
        }
        if (error) {
            return <div>{error}</div>;
        }
        return (
            <div>
                <Table currencyList={data} />
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={this.handlePageChange} />
            </div>
        );
    }
}
export default CryptoCurrencyList;