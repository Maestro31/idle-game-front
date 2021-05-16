import styled from '@emotion/styled'

export interface TableViewProps {
  children: JSX.Element[]
}

export default function TableView({ children }: TableViewProps) {
  return (
    <Container className="custom-scrollbar">
      <Table>
        <tbody>{children}</tbody>
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
    //backgroundColor: '#4ea950',
    padding: '5px 15px',
  },
  '& tr:nth-of-type(2n) td': {
    //backgroundColor: '#af3535',
  },
  '& td:first-of-type': {
    borderTopLeftRadius: '3px',
    borderBottomLeftRadius: '3px',
  },
  '& td:last-of-type': {
    borderTopRightRadius: '3px',
    borderBottomRightRadius: '3px',
  },
})
