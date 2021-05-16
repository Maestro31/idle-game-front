import styled from '@emotion/styled'
import { FightLogVM } from '../../../../redux/selectors/battleSelectors'
import TableView from '../TableView'

interface LogListProps {
  logs: FightLogVM[]
}

export default function LogList({ logs }: LogListProps) {
  return (
    <TableView>
      {logs.map((log, index) => (
        <TableRow key={index} backgroundColor={log.color}>
          <td style={{ textAlign: 'center' }}>{log.turn}</td>
          <td>
            <CharacterName>{log.assailant.name}</CharacterName>
            <FlexRowCenterStartContainer>
              <StatCount>{log.assailant.attack}&nbsp;⚔️</StatCount>
              <StatCount>{log.assailant.magic}&nbsp;🪄</StatCount>
              <StatCount>{log.assailant.health}&nbsp;❤️</StatCount>
            </FlexRowCenterStartContainer>
          </td>
          <td style={{ fontSize: '1em' }}>
            <StatCount>{log.assaultResult.attack}&nbsp;🗡️</StatCount>
            {log.critical && (
              <StatCount>+{log.assailant.magic}&nbsp;🪄</StatCount>
            )}
          </td>
          <td>{log.attackResult}</td>
          <td style={{ textAlign: 'right' }}>
            <CharacterName>{log.assailed.name}</CharacterName>
            <FlexRowCenterEndContainer>
              <StatCount>{log.assailed.defense}&nbsp;🛡️</StatCount>
              <StatCount>{log.assailed.health}&nbsp;❤️</StatCount>
            </FlexRowCenterEndContainer>
          </td>
        </TableRow>
      ))}
    </TableView>
  )
}

const FlexRowCenterStartContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  columnGap: '5px',
})

const FlexRowCenterEndContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
  columnGap: '5px',
})

const TableRow = styled.tr(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    '& > td': {
      backgroundColor,
    },
  })
)

const StatCount = styled.span({})

const CharacterName = styled.div({})
