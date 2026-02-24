import { Card, Mosaic } from '@mining-sdk/core'

export const MosaicPageDemo = (): JSX.Element => {
  return (
    <div>
      <h2
        style={{
          marginBottom: '1.5rem',
          paddingBottom: '0.5rem',
        }}
      >
        Mosaic
      </h2>
      <Mosaic
        template={[
          ['header', 'header', 'header', 'header'],
          ['hashrate', 'hashrate', 'temperature', 'power'],
          ['workers', 'workers', 'chart', 'chart'],
          ['workers', 'workers', 'chart', 'chart'],
          ['alerts', 'alerts', 'earnings', 'earnings'],
        ]}
        columns="1fr 1fr 1fr 1fr"
        rowHeight="150px"
        gap="16px"
      >
        <Mosaic.Item
          area="header"
          style={{
            background: '#1a1a1a',
            padding: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid #ff9300',
            borderRadius: '8px',
          }}
        >
          <h1 style={{ margin: 0, color: '#ff9300', fontSize: '1.5rem' }}>⛏️ Mining Dashboard</h1>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <span style={{ color: '#999', fontSize: '0.875rem' }}>Active Miners: 156</span>
            <span style={{ color: '#999', fontSize: '0.875rem' }}>Pool Status: Online</span>
          </div>
        </Mosaic.Item>

        <Mosaic.Item
          area="hashrate"
          style={{
            background: '#1a1a1a',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #333',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3>Total Hashrate</h3>
          <p
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              margin: '0.5rem 0',
              color: '#ff9300',
              lineHeight: 1,
            }}
          >
            1,540 TH/s
          </p>
          <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>+2.3% from yesterday</p>
          <div style={{ fontSize: '2rem', marginTop: 'auto', textAlign: 'right' }}>📈</div>
        </Mosaic.Item>

        <Mosaic.Item
          area="temperature"
          style={{
            background: '#1a1a1a',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #333',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3>Avg Temperature</h3>
          <p
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              margin: '0.5rem 0',
              color: '#ff9300',
              lineHeight: 1,
            }}
          >
            65°C
          </p>
          <p
            style={{
              fontSize: '0.875rem',
              padding: '0.25rem 0.75rem',
              borderRadius: '4px',
              display: 'inline-block',
              width: 'fit-content',
              marginTop: '0.5rem',
              background: '#22c55e',
              color: '#0a0a0a',
              fontWeight: 600,
            }}
          >
            Normal
          </p>
          <div style={{ fontSize: '2rem', marginTop: 'auto', textAlign: 'right' }}>🌡️</div>
        </Mosaic.Item>

        <Mosaic.Item
          area="power"
          style={{
            background: '#1a1a1a',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #333',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3>Power Consumption</h3>
          <p
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              margin: '0.5rem 0',
              color: '#ff9300',
              lineHeight: 1,
            }}
          >
            234 kW
          </p>
          <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0', color: '#999' }}>$28.08/hour</p>
          <div style={{ fontSize: '2rem', marginTop: 'auto', textAlign: 'right' }}>⚡</div>
        </Mosaic.Item>

        <Mosaic.Item
          area="workers"
          style={{
            background: '#1a1a1a',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #333',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3>Active Workers</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem',
                    color: '#999',
                    fontWeight: 600,
                    borderBottom: '1px solid #333',
                  }}
                >
                  Worker
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem',
                    color: '#999',
                    fontWeight: 600,
                    borderBottom: '1px solid #333',
                  }}
                >
                  Hashrate
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem',
                    color: '#999',
                    fontWeight: 600,
                    borderBottom: '1px solid #333',
                  }}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem',
                    color: '#e5e5e5',
                    borderTop: '1px solid #333',
                  }}
                >
                  Miner-001
                </td>
                <td
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem',
                    color: '#e5e5e5',
                    borderTop: '1px solid #333',
                  }}
                >
                  10.2 TH/s
                </td>
                <td
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem',
                    color: '#e5e5e5',
                    borderTop: '1px solid #333',
                  }}
                >
                  <span style={{ color: '#22c55e', fontSize: '1.2rem' }}>●</span>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem',
                    color: '#e5e5e5',
                    borderTop: '1px solid #333',
                  }}
                >
                  Miner-002
                </td>
                <td
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem',
                    color: '#e5e5e5',
                    borderTop: '1px solid #333',
                  }}
                >
                  9.8 TH/s
                </td>
                <td
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem',
                    color: '#e5e5e5',
                    borderTop: '1px solid #333',
                  }}
                >
                  <span style={{ color: '#22c55e', fontSize: '1.2rem' }}>●</span>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem',
                    color: '#e5e5e5',
                    borderTop: '1px solid #333',
                  }}
                >
                  Miner-003
                </td>
                <td
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem',
                    color: '#e5e5e5',
                    borderTop: '1px solid #333',
                  }}
                >
                  10.5 TH/s
                </td>
                <td
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem',
                    color: '#e5e5e5',
                    borderTop: '1px solid #333',
                  }}
                >
                  <span style={{ color: '#22c55e', fontSize: '1.2rem' }}>●</span>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem',
                    color: '#e5e5e5',
                    borderTop: '1px solid #333',
                  }}
                >
                  Miner-004
                </td>
                <td
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem',
                    color: '#e5e5e5',
                    borderTop: '1px solid #333',
                  }}
                >
                  0.0 TH/s
                </td>
                <td
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem',
                    color: '#e5e5e5',
                    borderTop: '1px solid #333',
                  }}
                >
                  <span style={{ color: '#ef4444', fontSize: '1.2rem' }}>●</span>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem',
                    color: '#e5e5e5',
                    borderTop: '1px solid #333',
                  }}
                >
                  Miner-005
                </td>
                <td
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem',
                    color: '#e5e5e5',
                    borderTop: '1px solid #333',
                  }}
                >
                  10.1 TH/s
                </td>
                <td
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem',
                    color: '#e5e5e5',
                    borderTop: '1px solid #333',
                  }}
                >
                  <span style={{ color: '#22c55e', fontSize: '1.2rem' }}>●</span>
                </td>
              </tr>
            </tbody>
          </table>
        </Mosaic.Item>

        <Mosaic.Item
          area="chart"
          style={{
            background: '#1a1a1a',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #333',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3>Hashrate History (24h)</h3>
          <div style={{ marginTop: '1rem', flex: 1 }}>
            <svg
              width="100%"
              height="200"
              viewBox="0 0 400 200"
              style={{
                display: 'block',
                background: '#0a0a0a',
                borderRadius: '4px',
                padding: '1rem',
              }}
            >
              <polyline
                points="0,150 50,120 100,130 150,100 200,110 250,90 300,80 350,70 400,60"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
              />
            </svg>
          </div>
        </Mosaic.Item>

        <Mosaic.Item
          area="alerts"
          style={{
            background: '#1a1a1a',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #333',
            minHeight: '30vh',
            overflowY: 'auto',
          }}
        >
          <h3>⚠️ Recent Alerts</h3>
          <div style={{ marginTop: '1rem', flex: 1 }}>
            <Card
              style={{
                padding: '1rem',
                marginBottom: '0.75rem',
                background: '#0a0a0a',
                borderRadius: '4px',
                borderLeft: '3px solid #ff9300',
              }}
            >
              <strong
                style={{
                  display: 'block',
                  color: '#e5e5e5',
                  marginBottom: '0.25rem',
                  fontSize: '0.875rem',
                }}
              >
                High Temperature
              </strong>
              <p style={{ margin: '0 0 0.25rem 0', color: '#999', fontSize: '0.875rem' }}>
                Miner-012 reached 78°C
              </p>
              <span style={{ fontSize: '0.75rem', color: '#666' }}>2 min ago</span>
            </Card>
            <Card
              style={{
                padding: '1rem',
                marginBottom: '0.75rem',
                background: '#0a0a0a',
                borderRadius: '4px',
                borderLeft: '3px solid #ef4444',
              }}
            >
              <strong
                style={{
                  display: 'block',
                  color: '#e5e5e5',
                  marginBottom: '0.25rem',
                  fontSize: '0.875rem',
                }}
              >
                Worker Offline
              </strong>
              <p style={{ margin: '0 0 0.25rem 0', color: '#999', fontSize: '0.875rem' }}>
                Miner-004 is not responding
              </p>
              <span style={{ fontSize: '0.75rem', color: '#666' }}>15 min ago</span>
            </Card>
            <Card
              style={{
                padding: '1rem',
                marginBottom: 0,
                background: '#0a0a0a',
                borderRadius: '4px',
                borderLeft: '3px solid #3b82f6',
              }}
            >
              <strong
                style={{
                  display: 'block',
                  color: '#e5e5e5',
                  marginBottom: '0.25rem',
                  fontSize: '0.875rem',
                }}
              >
                Pool Switch
              </strong>
              <p style={{ margin: '0 0 0.25rem 0', color: '#999', fontSize: '0.875rem' }}>
                Switched to backup pool
              </p>
              <span style={{ fontSize: '0.75rem', color: '#666' }}>1 hour ago</span>
            </Card>
          </div>
        </Mosaic.Item>

        <Mosaic.Item
          area="earnings"
          style={{
            background: '#1a1a1a',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #333',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '30vh',
            overflowY: 'auto',
          }}
        >
          <h3>💰 Earnings</h3>
          <div
            style={{
              display: 'grid',
              gridGap: '1rem',
              gap: '1rem',
              marginTop: '1rem',
            }}
          >
            <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '4px' }}>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: '#999',
                  margin: '0 0 0.5rem 0',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Today
              </p>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>$673.45</p>
            </div>
            <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '4px' }}>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: '#999',
                  margin: '0 0 0.5rem 0',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                This Week
              </p>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>$4,714.15</p>
            </div>
            <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '4px' }}>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: '#999',
                  margin: '0 0 0.5rem 0',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                This Month
              </p>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>$20,187.60</p>
            </div>
            <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '4px' }}>
              <p
                style={{
                  fontSize: '0.75rem',
                  margin: '0 0 0.5rem 0',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                All Time
              </p>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>$156,432.90</p>
            </div>
          </div>
        </Mosaic.Item>
      </Mosaic>
    </div>
  )
}
