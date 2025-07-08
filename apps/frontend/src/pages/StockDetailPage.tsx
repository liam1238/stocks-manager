import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Card, Spin } from 'antd';
import { fetchStockQuote } from '@api/stockApi';
import type { Stock } from '@interfaces/stocks';

const { Title, Text } = Typography;

export const StockDetailPage = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [stock, setStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!symbol) return;

    const fetchData = async () => {
      try {
        const stockData = await fetchStockQuote(symbol);
        setStock(stockData);
      } catch (err) {
        console.error('Error fetching stock:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  if (loading) return <Spin fullscreen />;

  if (!stock) {
    return (
      <div style={{ padding: 24 }}>
        <Text type="danger">Stock not found</Text>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Link to="/">← Back to Portfolio</Link>
      <Card
        style={{
          marginTop: 16,
          width: '50%',
          textAlign: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Title level={3}>
          {stock.symbol} - {stock.name}
        </Title>
        <Text>Price: ${stock.price}</Text>
        <br />
        <Text>Change: {stock.changePercent}%</Text>
      </Card>
    </div>
  );
};
