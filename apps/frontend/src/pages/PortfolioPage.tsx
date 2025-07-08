import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Typography, List, Spin } from 'antd';
import portfolioStore from '@stores/PortfolioStore';
import { StockCard } from '@components/StockCard';
import { AddStockInput } from '@components/AddStockInput';

const { Title } = Typography;

export const PortfolioPage = observer(() => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    portfolioStore.fetchPortfolio();
  }, []);

  const handleAdd = () => {
    const symbol = input.trim().toUpperCase();
    if (symbol) {
      portfolioStore.addStock(symbol);
      setInput('');
    }
  };

  const stockItems = useMemo(() => {
    return portfolioStore.stocks.slice(); // ensure it's a new array for memoization
  }, [portfolioStore.stocks.length]);

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <Title level={2}>My Stocks Portfolio</Title>

      <AddStockInput value={input} onChange={setInput} onSearch={handleAdd} />

      {portfolioStore.loading ? (
        <Spin size="large" />
      ) : (
        <List
          dataSource={stockItems}
          renderItem={(stock) => (
            <StockCard
              stock={stock}
              onView={() => navigate(`/stocks/${stock.symbol}`)}
              onRemove={() => portfolioStore.removeStock(stock.symbol)}
            />
          )}
        />
      )}
    </div>
  );
});
