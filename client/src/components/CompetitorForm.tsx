import { useState } from 'react';
import { Button, Card, Input, Space, Typography } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useAnalyzeCompetitors } from '../hooks/useAnalyzeCompetitors.ts';

const { Title, Text } = Typography;

import { HARDCODED_COMPETITORS } from '../constants/competitors.ts';

const CLIENT_NAME = 'Big Ben';

function CompetitorForm() {
  const [newCompetitor, setNewCompetitor] = useState('');
  const [additionalCompetitors, setAdditionalCompetitors] = useState<string[]>([]);
  const { mutate, data, isPending } = useAnalyzeCompetitors();


  const addCompetitor = () => {
    const trimmed = newCompetitor.trim();
    if (!trimmed) return;
    setAdditionalCompetitors((prev) => [...prev, trimmed]);
    setNewCompetitor('');
  };

const handleAnalyze = () => {
    mutate([...HARDCODED_COMPETITORS]);
    };

  return (
    <div className="analyzer">
      <Title level={2} className="analyzer__title">
        AI Competitor Analyzer
      </Title>

      <Card className="analyzer__card">
        <div className="analyzer__client-row">
          <Text type="secondary" className="analyzer__label">
            Client
          </Text>
          <Space size="small" className="analyzer__client-value">
            <Text strong>{CLIENT_NAME}</Text>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              aria-label="Edit client name"
              title="Edit client (coming soon)"
              className="analyzer__edit-btn"
            />
          </Space>
        </div>

        <div className="analyzer__section">
          <Text type="secondary" className="analyzer__label">
            Competitors
          </Text>
          <Space orientation="vertical" size="middle" className="analyzer__competitors">
            <ul className="analyzer__competitor-list">
              {HARDCODED_COMPETITORS.map((competitor) => (
                <li key={competitor.name}>
                  <Text>{competitor.name}</Text>
                </li>
              ))}
              {additionalCompetitors.map((name, index) => (
                <li key={`${name}-${index}`}>
                  <Text>{name}</Text>
                </li>
              ))}
            </ul>

            <Space.Compact className="analyzer__add-row">
              <Input
                placeholder="Add competitor"
                value={newCompetitor}
                onChange={(e) => setNewCompetitor(e.target.value)}
                onPressEnter={addCompetitor}
                allowClear
              />
              <Button type="primary" icon={<PlusOutlined />} onClick={addCompetitor}>
                Add
              </Button>
            </Space.Compact>
          </Space>
        </div>

        <Button type="primary" size="large" onClick={handleAnalyze} className="analyzer__submit">
          Analyze
        </Button>
      </Card>
    </div>
  );
}

export default CompetitorForm;
