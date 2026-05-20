import { ConfigProvider } from 'antd';
import './App.css';
import CompetitorForm from './components/CompetitorForm.tsx';
import ResultsTable from './components/ResultsTable.tsx';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 6,
        },
      }}
    >
      <main className="app">
        <CompetitorForm />
        <ResultsTable />
      </main>
    </ConfigProvider>
  );
}

export default App;
