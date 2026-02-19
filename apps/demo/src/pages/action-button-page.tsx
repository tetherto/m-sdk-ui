/* eslint-disable no-alert */
import { ActionButton } from '@mining-sdk/core'

export const ActionButtonPage = (): JSX.Element => {
  return (
    <section className="demo-section">
      <h2 className="demo-section__title">Action Button</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <p style={{ marginBottom: '0.5rem', fontSize: '13px', opacity: 0.7 }}>Danger 1</p>
          <ActionButton
            label="Reboot MiningOS"
            variant="danger"
            confirmation={{
              title: 'Reboot MiningOS',
              description: (
                <>
                  <p>
                    The Reboot feature restarts all the device communication workers. This will help
                    when any one type of device information goes missing in MiningOS.
                  </p>
                  <p style={{ marginTop: '0.75rem' }}>
                    There should not be any pending actions in the Actions chart when rebooting
                    MiningOS. Please submit or discard all other pending actions before submitting
                    the request to reboot MiningOS. This action needs a 2nd approval.
                  </p>
                </>
              ),
              onConfirm: () => alert('Rebooting MiningOS...'),
            }}
          />
        </div>

        <div>
          <p style={{ marginBottom: '0.5rem', fontSize: '13px', opacity: 0.7 }}>Danger 2</p>
          <ActionButton
            label="Enable container automation"
            variant="danger"
            confirmation={{
              title: 'Enable container automation',
              description:
                'The container automation feature sends miners to sleep if critical container pump failures occur in Bitmain immersion containers.',
              onConfirm: () => alert('Container automation enabled!'),
            }}
          />
        </div>

        <div>
          <p style={{ marginBottom: '0.5rem', fontSize: '13px', opacity: 0.7 }}>Primary</p>
          <ActionButton
            label="Power All Sockets On"
            variant="primary"
            confirmation={{
              title: 'Power All Sockets On',
              description:
                'Please ensure cooling system is ON before turning ON sockets and miners',
              onConfirm: () => alert('Powering all sockets on...'),
            }}
          />
        </div>

        <div>
          <p style={{ marginBottom: '0.5rem', fontSize: '13px', opacity: 0.7 }}>Secondary</p>
          <ActionButton
            label="Restart Service"
            variant="secondary"
            confirmation={{
              title: 'Restart Service',
              description: 'The service will be temporarily unavailable during restart.',
              onConfirm: () => alert('Service restarting...'),
            }}
          />
        </div>

        <div>
          <p style={{ marginBottom: '0.5rem', fontSize: '13px', opacity: 0.7 }}>Disabled</p>
          <ActionButton
            label="Disabled Action"
            variant="secondary"
            disabled
            confirmation={{
              title: 'Disabled',
              description: 'This action is currently disabled.',
            }}
          />
        </div>

        <div>
          <p style={{ marginBottom: '0.5rem', fontSize: '13px', opacity: 0.7 }}>Loading</p>
          <ActionButton
            label="Processing..."
            variant="primary"
            loading
            confirmation={{
              title: 'Processing',
              description: 'Please wait while the action is being processed.',
            }}
          />
        </div>
      </div>
    </section>
  )
}
