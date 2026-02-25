import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  TagInput,
} from '@mining-sdk/core'

const minerOptions = [
  { value: 'Antminer S19', label: 'Antminer S19' },
  { value: 'Whatsminer M30S', label: 'Whatsminer M30S' },
  { value: 'Antminer S19 Pro', label: 'Antminer S19 Pro' },
  { value: 'Whatsminer M50', label: 'Whatsminer M50' },
  { value: 'Antminer S21', label: 'Antminer S21' },
]

export const SelectPage = (): JSX.Element => {
  const [tags, setTags] = useState<string[]>(['Antminer S19', 'Whatsminer M30S'])

  return (
    <section className="demo-section">
      <h2 className="demo-section__title">Selectors</h2>

      {/* ── Default ───────────────────────────────────────────────────── */}
      <h3 className="demo-section__subtitle">Selectors - Default</h3>
      <div className="demo-section__selector-row">
        <Select>
          <SelectTrigger size="lg">
            <SelectValue placeholder="Big Selector" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Miners</SelectLabel>
              <SelectItem value="antminer-s19">Antminer S19</SelectItem>
              <SelectItem value="whatsminer-m30s">Whatsminer M30S</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger size="lg" searchable>
            <SelectValue placeholder="Search Selector" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Miners</SelectLabel>
              <SelectItem value="antminer-s19">Antminer S19</SelectItem>
              <SelectItem value="whatsminer-m30s">Whatsminer M30S</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger size="md">
            <SelectValue placeholder="Medium Selector" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Miners</SelectLabel>
              <SelectItem value="antminer-s19">Antminer S19</SelectItem>
              <SelectItem value="whatsminer-m30s">Whatsminer M30S</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger size="sm">
            <SelectValue placeholder="Small Selector" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Miners</SelectLabel>
              <SelectItem value="antminer-s19">Antminer S19</SelectItem>
              <SelectItem value="whatsminer-m30s">Whatsminer M30S</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger size="sm" color="#72F59E">
            <SelectValue placeholder="Color Selector" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* ── Disabled ──────────────────────────────────────────────────── */}
      <h3 className="demo-section__subtitle">Selectors - Disabled</h3>
      <div className="demo-section__selector-row">
        <Select disabled>
          <SelectTrigger size="lg">
            <SelectValue placeholder="Big Selector" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="placeholder">—</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select disabled>
          <SelectTrigger size="lg" searchable>
            <SelectValue placeholder="Search Selector" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="placeholder">—</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select disabled>
          <SelectTrigger size="md">
            <SelectValue placeholder="Medium Selector" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="placeholder">—</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select disabled>
          <SelectTrigger size="sm">
            <SelectValue placeholder="Small Selector" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="placeholder">—</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select disabled>
          <SelectTrigger size="sm" color="#72F59E">
            <SelectValue placeholder="Color Selector" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="placeholder">—</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* ── Hover / Active ────────────────────────────────────────────── */}
      <h3 className="demo-section__subtitle">Selectors - Hover/Active</h3>
      <div className="demo-section__selector-row">
        <Select>
          <SelectTrigger size="lg">
            <SelectValue placeholder="Big Selector" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Miners</SelectLabel>
              <SelectItem value="antminer-s19">Antminer S19</SelectItem>
              <SelectItem value="whatsminer-m30s">Whatsminer M30S</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <TagInput
          value={tags}
          onTagsChange={setTags}
          options={minerOptions}
          placeholder="Search..."
          size="lg"
        />

        <Select>
          <SelectTrigger size="md">
            <SelectValue placeholder="Medium Selector" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Miners</SelectLabel>
              <SelectItem value="antminer-s19">Antminer S19</SelectItem>
              <SelectItem value="whatsminer-m30s">Whatsminer M30S</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger size="sm">
            <SelectValue placeholder="Small Selector" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Miners</SelectLabel>
              <SelectItem value="antminer-s19">Antminer S19</SelectItem>
              <SelectItem value="whatsminer-m30s">Whatsminer M30S</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select defaultValue="online">
          <SelectTrigger size="sm" color="#72F59E">
            <SelectValue placeholder="Color Selector" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="online">Color Selector</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </section>
  )
}
