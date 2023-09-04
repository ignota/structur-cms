import C from 'chroma-js'
import open from 'open-color/open-color.json'
import R from 'ramda'

export const chroma = {
  black: C(open.gray[9]),
  blue: C(open.blue[6]),
  cyan: C(open.cyan[6]),
  danger: C(open.red[6]),
  disabled: C(0, 0, 0).alpha(0.38),
  editorBackground: C(open.gray[1]).alpha(0.66),
  google: C('#ea4335'),
  grape: C(open.grape[6]),
  gray: C(open.gray[6]),
  green: C(open.green[6]),
  highlight: C(open.yellow[4]),
  hint: C(0, 0, 0).alpha(0.38),
  indigo: C(open.indigo[6]),
  inputBorder: C(open.gray[9]),
  inputBorderDisabled: C(open.gray[9]).alpha(0.26),
  inputLabel: C(open.gray[9]).alpha(0.6),
  ledeText: C(open.gray[7]),
  lime: C(open.lime[6]),
  orange: C(open.orange[6]),
  pink: C(open.pink[6]),
  placeholder: C(open.gray[9]).alpha(0.38),
  primary: C(open.violet[6]),
  primaryDark: C(open.violet[8]),
  quote: C(open.gray[7]).alpha(0.33),
  quoteText: C(open.gray[7]).alpha(0.66),
  red: C(open.red[6]),
  secondary: C(open.yellow[6]),
  teal: C(open.teal[6]),
  text: C(0, 0, 0).alpha(0.87),
  transparent: C('#fff').alpha(0),
  twitter: C('#1da1f2'),
  violet: C(open.violet[6]),
  white: C('#fff'),
  yellow: C(open.yellow[6]),
}

export const rgb = R.map(R.invoker(0, 'css'), chroma)
