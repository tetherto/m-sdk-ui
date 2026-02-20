/* eslint-disable no-alert */
import { ActionButton } from '@mining-sdk/core'

export const ActionButtonPage = (): JSX.Element => {
  return (
    <section className="demo-section">
      <h2 className="demo-section__title">Action Button</h2>
      <div className="demo-section__column">
        <div>
          <p className="demo-section__label">Danger 1</p>
          <ActionButton
            label="Restart System"
            variant="danger"
            confirmation={{
              title: 'Restart System',
              description: (
                <>
                  <p>
                    The restart feature will temporarily stop all running services. This may take a
                    few minutes to complete.
                  </p>
                  <p style={{ marginTop: '0.75rem' }}>
                    Please ensure all pending tasks are saved before proceeding. Any unsaved changes
                    will be lost. This action requires confirmation.
                  </p>
                </>
              ),
              onConfirm: () => alert('System restarting...'),
            }}
          />
        </div>

        <div>
          <p className="demo-section__label">Danger 2</p>
          <ActionButton
            label="Enable Automation"
            variant="danger"
            confirmation={{
              title: 'Enable Automation',
              description:
                'The automation feature will automatically manage resources based on system conditions. This may affect running processes.',
              onConfirm: () => alert('Automation enabled!'),
            }}
          />
        </div>

        <div>
          <p className="demo-section__label">Primary</p>
          <ActionButton
            label="Power On All"
            variant="primary"
            confirmation={{
              title: 'Power On All',
              description: 'Please ensure cooling system is active before powering on all devices.',
              onConfirm: () => alert('Powering on all devices...'),
            }}
          />
        </div>

        <div>
          <p className="demo-section__label">Secondary</p>
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
          <p className="demo-section__label">Disabled</p>
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
          <p className="demo-section__label">Loading</p>
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
