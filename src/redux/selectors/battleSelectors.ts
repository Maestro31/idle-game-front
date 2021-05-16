import { CharacterDTO } from '../../core/models/Character'
import { AppState, BattleResultStatus } from '../appState.interface'

function statusFor(status: BattleResultStatus): string {
  return {
    won: 'Victoire',
    lost: 'Défaite',
    draw: 'Match nul',
  }[status]
}

function colorFor(status: BattleResultStatus): string {
  return {
    won: '#4ea950',
    lost: '#af3535',
    draw: '#75513b',
  }[status]
}

export const findBattleResultsByCharacterId =
  (id: string) => (state: AppState) => {
    const battleResults = state.character.battleHistoriesByCharacterId[id]

    return battleResults?.map((battleResult) => ({
      ...battleResult,
      displayStatus: statusFor(battleResult.status),
      colorStatus: colorFor(battleResult.status),
    }))
  }

export interface FightResultVM {
  status: BattleResultStatus
  statusColor: string
  displayStatus: string
  title: string
  winner: CharacterDTO
  looser: CharacterDTO
  logs: FightLogVM[]
  draw: boolean
}

export interface FightLogVM {
  turn: number
  assailant: CharacterDTO
  assailed: CharacterDTO
  assaultResult: {
    attack: number
    damageTaken: number
  }
  critical: boolean
  color: string
  attackResult: string
}

export const findFightResult =
  (characterId: string) =>
  (state: AppState): FightResultVM | null => {
    const fightResult = state.fightResult.data

    if (!fightResult) return null

    const status = fightResult.draw
      ? 'draw'
      : fightResult.winner.id === characterId
      ? 'won'
      : 'lost'

    return {
      ...fightResult,
      status,
      statusColor: colorFor(status),
      displayStatus: statusFor(status),
      title:
        status === 'draw'
          ? 'Match nul'
          : `${fightResult.winner.name} a vaincu ${fightResult.looser.name} en ${fightResult.logs.length} tours`,
      logs: fightResult.logs.map((log) => ({
        ...log,
        critical:
          log.assailant.magic ===
            log.assaultResult.attack - log.assailed.defense &&
          log.assailant.magic !== 0,
        color: log.assailant.id === characterId ? '#4ea950' : '#af3535',
        attackResult:
          log.assaultResult.damageTaken > 0
            ? `-${log.assaultResult.damageTaken} 💔`
            : 'Échec',
      })),
    }
  }

export const findFightErrorMessage = (state: AppState) =>
  state.fightResult.errorMessage

export const findFightFetching = (state: AppState) => state.fightResult.fetching
