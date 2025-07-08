import { Input } from 'antd';

export const AddStockInput = ({
  value,
  onChange,
  onSearch,
}: {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
}) => (
  <Input.Search
    placeholder="Enter stock symbol (e.g. AAPL)"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onSearch={onSearch}
    enterButton="Add"
    style={{ marginBottom: 16, width: '100%', cursor: 'pointer' }}
  />
);
