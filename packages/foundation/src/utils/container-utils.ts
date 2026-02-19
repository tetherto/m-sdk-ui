import {
  COMPLETE_CONTAINER_TYPE,
  CONTAINER_MODEL,
  CONTAINER_TYPE,
  CONTAINER_TYPE_NAME_MAP,
  MAINTENANCE_CONTAINER,
} from '../constants/container-constants'
import { CONTAINER_STATUS } from './status-utils'
import _capitalize from 'lodash/capitalize'
import _includes from 'lodash/includes'
import _isEmpty from 'lodash/isEmpty'
import _slice from 'lodash/slice'
import _split from 'lodash/split'
import _toLower from 'lodash/toLower'
import _toUpper from 'lodash/toUpper'
import { separateByHyphenRegExp, separateByTwoHyphensRegExp } from './device-utils'

export const isContainerOffline = (snap: { stats?: { status?: string } } | undefined): boolean =>
  snap?.stats?.status === CONTAINER_STATUS.OFFLINE

export const isBitdeer = (type: string | undefined): boolean =>
  _includes(_toLower(type), CONTAINER_TYPE.BITDEER) ||
  _includes(_toLower(type), CONTAINER_MODEL.BITDEER)

export const isAntspaceHydro = (type: string): boolean =>
  _includes(_toLower(type), CONTAINER_TYPE.ANTSPACE_HYDRO) ||
  _includes(_toLower(type), CONTAINER_MODEL.ANTSPACE_HYDRO) ||
  _includes(_toLower(type), CONTAINER_MODEL.BITMAIN_HYDRO)

export const isMicroBT = (type: string | undefined): boolean =>
  _includes(_toLower(type), CONTAINER_TYPE.MICROBT) ||
  _includes(_toLower(type), CONTAINER_MODEL.MICROBT)

export const isMicroBTKehua = (type: string): boolean =>
  _includes(_toLower(type), COMPLETE_CONTAINER_TYPE.MICROBT_KEHUA)

export const isAntspaceImmersion = (type: string): boolean =>
  _includes(_toLower(type), CONTAINER_TYPE.ANTSPACE_IMMERSION) ||
  _includes(_toLower(type), CONTAINER_MODEL.ANTSPACE_IMMERSION) ||
  _includes(_toLower(type), CONTAINER_MODEL.BITMAIN_IMMERSION) ||
  _includes(_toLower(type), CONTAINER_MODEL.BITMAIN_IMM)

export const isBitmainImmersion = (type: string): boolean =>
  _includes(_toLower(type), CONTAINER_MODEL.BITMAIN_IMMERSION) ||
  _includes(_toLower(type), CONTAINER_MODEL.BITMAIN_IMM) ||
  _includes(_toLower(type), CONTAINER_MODEL.IMMERSION_CONTAINER)

export const getContainerName = (container: string | undefined, type?: string): string => {
  if (_isEmpty(container)) {
    return ''
  }
  if (container === MAINTENANCE_CONTAINER) {
    return 'Maintenance'
  }
  const isBitdeerContainer = isBitdeer(container) || isBitdeer(type)
  const isMicroBTContainer = isMicroBT(container) || isMicroBT(type)

  if (isBitdeerContainer || isMicroBTContainer) {
    const [name, id] = _slice((container || '').match(separateByHyphenRegExp) || [], 1)
    const containerName = `${_capitalize(name)} ${id}`
    if (!type) {
      return containerName
    }
    const [, containerModel] = _slice((type || '').match(separateByHyphenRegExp) || [], 1)
    if (isMicroBTContainer) {
      let typeKey

      if (_includes(COMPLETE_CONTAINER_TYPE.MICROBT_KEHUA, containerModel)) {
        typeKey = COMPLETE_CONTAINER_TYPE.MICROBT_KEHUA
      } else if (_includes(COMPLETE_CONTAINER_TYPE.MICROBT_WONDERINT, containerModel)) {
        typeKey = COMPLETE_CONTAINER_TYPE.MICROBT_WONDERINT
      }

      if (!typeKey) {
        return `MicroBT ${id}`
      }

      const [name, model] = _split(CONTAINER_TYPE_NAME_MAP[typeKey], ' ')
      return `${name} ${id} ${model}`
    }
    // Bitdeer labels
    return `${containerName} ${_toUpper(containerModel)}`
  }
  const [name, model, id] = _slice((container || '').match(separateByTwoHyphensRegExp) || [], 1)
  return `${_capitalize(name)} ${_capitalize(model)} ${id}`
}
