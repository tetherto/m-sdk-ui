import { describe, expect, it } from 'vitest'
import { getContainerName, isContainerOffline } from '../container-utils'

const GET_CONTAINER_NAME_TEST_ARGS = {
  bitdeer: { type: 'container-bd-d40-m56', container: 'bitdeer-5a' },
  bitmainImmersion: { type: 'container-as-immersion', container: 'antspace-immersion-2' },
  bitmainHydro: { type: 'container-as-hk3', container: 'bitmain-hydro-1' },
  microBT: { type: 'container-mbt-kehua', container: 'microbt-1' },
}

describe('container utils', () => {
  describe('getContainerName', () => {
    it('should get the proper container name', () => {
      expect(
        getContainerName(
          GET_CONTAINER_NAME_TEST_ARGS.bitdeer.container,
          GET_CONTAINER_NAME_TEST_ARGS.bitdeer.type,
        ),
      ).toBe('Bitdeer 5a M56')

      expect(
        getContainerName(
          GET_CONTAINER_NAME_TEST_ARGS.bitmainImmersion.container,
          GET_CONTAINER_NAME_TEST_ARGS.bitmainImmersion.type,
        ),
      ).toBe('Antspace Immersion 2')

      expect(
        getContainerName(
          GET_CONTAINER_NAME_TEST_ARGS.bitmainHydro.container,
          GET_CONTAINER_NAME_TEST_ARGS.bitmainHydro.type,
        ),
      ).toBe('Bitmain Hydro 1')

      expect(
        getContainerName(
          GET_CONTAINER_NAME_TEST_ARGS.microBT.container,
          GET_CONTAINER_NAME_TEST_ARGS.microBT.type,
        ),
      ).toBe('MicroBT 1 Kehua')
    })
  })

  describe('isContainerOffline', () => {
    it('should detect offline status properly', () => {
      expect(
        isContainerOffline({
          stats: {
            status: 'offline',
          },
        }),
      ).toBe(true)

      expect(
        isContainerOffline({
          stats: {
            status: 'other',
          },
        }),
      ).toBe(false)

      expect(
        isContainerOffline({
          stats: {},
        }),
      ).toBe(false)

      expect(isContainerOffline({})).toBe(false)
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-ignore
      expect(isContainerOffline()).toBe(false)
    })
  })
})
