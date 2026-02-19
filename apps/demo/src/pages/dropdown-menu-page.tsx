import { Button, DropdownMenu } from '@mining-sdk/core'

export const DropdownMenuPage = (): JSX.Element => {
  return (
    <section className="demo-section">
      <h2 className="demo-section__title">Dropdown Menu</h2>
      <div className="demo-section__select-grid">
        <section>
          <h3>Basic</h3>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="secondary">Open menu</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item onClick={() => {}}>Move Miner</DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => {}}>Repair</DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => {}}>Inventory Logs</DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => {}}>Add Comment</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </section>
        <section>
          <h3>With shortcuts</h3>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="secondary">Actions</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content alignWidth>
              <DropdownMenu.Item onClick={() => {}}>
                Copy <DropdownMenu.Shortcut>⌘C</DropdownMenu.Shortcut>
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => {}}>
                Paste <DropdownMenu.Shortcut>⌘V</DropdownMenu.Shortcut>
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item onClick={() => {}}>
                Delete <DropdownMenu.Shortcut>⌫</DropdownMenu.Shortcut>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </section>
        <section>
          <h3>With label and separator</h3>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="secondary">Miner actions</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>Primary</DropdownMenu.Label>
              <DropdownMenu.Item onClick={() => {}}>Move Miner</DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => {}}>Repair</DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => {}}>Add Comment</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Label>Danger Zone</DropdownMenu.Label>
              <DropdownMenu.Item onClick={() => {}}>Delete Miner</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </section>
        <section>
          <h3>With submenu</h3>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="secondary">Export</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item onClick={() => {}}>Export CSV</DropdownMenu.Item>
              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>Export formats</DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item onClick={() => {}}>PDF</DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => {}}>Excel</DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => {}}>JSON</DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </section>
        <section>
          <h3>Above trigger</h3>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="secondary">Open above</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content side="top">
              <DropdownMenu.Item onClick={() => {}}>Option A</DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => {}}>Option B</DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => {}}>Option C</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </section>
        <section>
          <h3>To the side</h3>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="secondary">Open right</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content side="right">
              <DropdownMenu.Item onClick={() => {}}>Option 1</DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => {}}>Option 2</DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => {}}>Option 3</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </section>
      </div>
    </section>
  )
}
