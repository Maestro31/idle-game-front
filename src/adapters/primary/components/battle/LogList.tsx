import styled from '@emotion/styled'
import AssaultLog from '../../../../game/game-logger/AssaultLog'
import { flexRowCenterStyle } from '../styles'

interface LogListProps {
  logs: AssaultLog[]
}

export default function LogList({ logs }: LogListProps) {
  return (
    <Container className="custom-scrollbar">
      <Table>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td style={{ textAlign: 'center' }}>{index + 1}</td>
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
                {log.assailant.magic ===
                  log.assaultResult.attack - log.assailed.defense && (
                  <StatCount>+{log.assailant.magic}&nbsp;🪄</StatCount>
                )}
              </td>
              <td>
                {log.assaultResult.damageTaken > 0
                  ? `-${log.assaultResult.damageTaken} 💔`
                  : 'Échec'}
              </td>
              <td style={{ textAlign: 'right' }}>
                <CharacterName>{log.assailed.name}</CharacterName>
                <FlexRowCenterEndContainer>
                  <StatCount>{log.assailed.defense}&nbsp;🛡️</StatCount>
                  <StatCount>{log.assailed.health}&nbsp;❤️</StatCount>
                </FlexRowCenterEndContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

const Container = styled.div({
  overflowY: 'auto',
  width: '100%',
  marginBottom: '20px',
  paddingRight: '5px',
})

const Table = styled.table({
  width: '100%',
  fontSize: '0.8em',
  borderCollapse: 'separate',
  borderSpacing: '0px 10px',
  '& td': {
    height: '48px',
    backgroundColor: '#4ea950',
    padding: '5px 15px',
  },
  '& tr:nth-child(2n) td': {
    backgroundColor: '#af3535',
  },
  '& td:first-child': {
    borderTopLeftRadius: '3px',
    borderBottomLeftRadius: '3px',
  },
  '& td:last-child': {
    borderTopRightRadius: '3px',
    borderBottomRightRadius: '3px',
  },
})

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

const StatCount = styled.span({})

const CharacterName = styled.div({})
