import { useMemo } from 'react';
import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { HARDCODED_COMPETITORS } from '../constants/competitors.ts';
import type { Competitor } from '../types/competitor.ts';
import { getCompetitorName } from '../types/competitor.ts';
import type { CompetitorResultRow } from '../types/results.ts';

const { Title } = Typography;

function buildInitialResults(competitors: readonly (Competitor | string)[]): CompetitorResultRow[] {
  return competitors.map((competitor) => {
    const name = getCompetitorName(competitor);
    return {
      key: name,
      name,
      metaAds: '',
      googleAds: '',
    };
  });
}

type ResultsTableProps = {
  competitors?: readonly (Competitor | string)[];
};

function ResultsTable({ competitors }: ResultsTableProps) {
  const dataSource = useMemo(
    () => buildInitialResults(competitors ?? HARDCODED_COMPETITORS),
    [competitors],
  );

  const columns: ColumnsType<CompetitorResultRow> = [
    {
      title: 'Competitor',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Meta Ads',
      dataIndex: 'metaAds',
      key: 'metaAds',
      render: (value: string) => value || '—',
    },
    {
      title: 'Google Ads',
      dataIndex: 'googleAds',
      key: 'googleAds',
      render: (value: string) => value || '—',
    },
  ];

  return (
    <section className="results">
      <Title level={4} className="results__title">
        Results
      </Title>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        size="middle"
        bordered
      />
    </section>
  );
}

export default ResultsTable;
