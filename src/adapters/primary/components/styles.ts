import { Interpolation } from '@emotion/serialize'

export const inputTextStyle: Interpolation<any> = {
  width: '100%',
  height: '48px',
  padding: '12px',
  color: '#362C26',
  boxSizing: 'border-box',
  borderRadius: '3px',
  backgroundColor: '#DCD0CA',
  fontSize: '1em',
  outline: 'none',
  '::placeholder': {
    color: '#A08585',
  },
  '& + input': {
    marginTop: '10px',
  },
}

export const buttonStyle: Interpolation<any> = {
  width: '100%',
  height: '48px',
  borderRadius: '3px',
  border: 'none',
  '&[disabled]': {
    opacity: '0.7',
  },
}

export const primaryButtonStyle: Interpolation<any> = {
  ...(buttonStyle as {}),
  backgroundColor: '#362C26',
  color: '#EBE0D6',
}

export const secondaryByttonStyle: Interpolation<any> = {
  ...(buttonStyle as {}),
  backgroundColor: '#8F7769',
  color: 'white',
}

export const flexColumnStyle: Interpolation<any> = {
  display: 'flex',
  flexDirection: 'column',
}

export const flexRowStyle: Interpolation<any> = {
  display: 'flex',
  flexDirection: 'row',
}

export const flexCenterStyle: Interpolation<any> = {
  alignItems: 'center',
  justifyContent: 'center',
}

export const flexRowCenterStyle: Interpolation<any> = {
  ...(flexRowStyle as {}),
  ...(flexCenterStyle as {}),
}

export const flexColumnCenterStyle: Interpolation<any> = {
  ...(flexColumnStyle as {}),
  ...(flexCenterStyle as {}),
}
