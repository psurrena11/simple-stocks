import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Button, Group } from '@mantine/core';

interface StockFormProps {
  onSubmit: (symbol: string) => Promise<void>;
  isLoading: boolean;
}

interface FormValues {
  symbol: string;
}

const StockForm: React.FC<StockFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<FormValues>({
    initialValues: {
      symbol: '',
    },
    validate: {
      symbol: (value) => (!value ? 'Stock symbol is required' : value.length > 10 ? 'Symbol too long' : null),
    },
  });

  const handleSubmit = async (values: FormValues) => {
    await onSubmit(values.symbol);
    form.reset();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="stock-form">
      <Group position="apart" grow>
        <TextInput
          placeholder="Enter stock symbol (e.g., IBM)"
          label="Stock Symbol"
          withAsterisk
          {...form.getInputProps('symbol')}
          disabled={isLoading}
          styles={{
            input: {
              fontSize: '1rem',
              padding: '0.75rem',
            },
            label: {
              fontSize: '0.9rem',
              marginBottom: '0.5rem',
              fontWeight: 600,
            },
          }}
        />
        <Button 
          type="submit" 
          loading={isLoading}
          disabled={isLoading}
          style={{
            marginTop: '1.5rem',
            backgroundColor: '#3498db',
            height: '2.75rem',
          }}
        >
          Track Stock
        </Button>
      </Group>
    </form>
  );
};

export default StockForm;