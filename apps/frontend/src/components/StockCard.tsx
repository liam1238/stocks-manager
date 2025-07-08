import { Card, Button, Popconfirm } from 'antd';
import type { Stock } from '@interfaces/stocks';

interface StockCardProps {
  stock: Stock;
  onView: () => void;
  onRemove: () => void | Promise<void>; // allow both sync and async
}

export const StockCard = ({ stock, onView, onRemove }: StockCardProps) => {
  return (
    <Card
      style={{ marginBottom: 16 }}
      title={stock.symbol}
      extra={
        <Button type="link" onClick={onView}>
          View
        </Button>
      }
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>
          <strong>Price:</strong>{' '}
          {stock.price !== undefined
            ? `$${stock.price.toFixed(2)}`
            : 'Loading...'}
        </p>

        <Popconfirm
          title="Remove this stock?"
          onConfirm={onRemove}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Remove</Button>
        </Popconfirm>
      </div>
    </Card>
  );
};
