import { makeStyles } from '@material-ui/core/styles'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from '@mui/x-data-grid'
import { Card } from '@material-ui/core'
import { useEffect } from 'react'
import { useState } from 'react'
import { getTotal } from 'api/result'
import { localeText } from 'utils.js'
import { useParams } from 'react-router'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(7.7),
    padding: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
}))

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport csvOptions={{ utf8WithBom: true }} />
    </GridToolbarContainer>
  )
}

function Summary() {
  const classes = useStyles()
  const [data, setData] = useState([])
  const { id: hashcode } = useParams()

  useEffect(() => {
    getTotal({ hash: hashcode }).then((res) => {
      let columns = res.data.column.map((item) => {
        return {
          field: item,
          headerName: item,
        }
      })
      let rows = []
      for (let index = 0; index < res.data.row.length; ++index) {
        let tmp = {}
        for (let i = 0; i < columns.length; ++i) {
          tmp[columns[i].field] = res.data.row[index][i]
        }
        rows.push(tmp)
      }
      setData({ rows, columns })
    })
  }, [])

  return (
    <Card className={classes.root}>
      <DataGrid
        rows={data.rows}
        columns={data.columns}
        pageSize={15}
        disableSelectionOnClick
        localeText={localeText}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </Card>
  )
}

export default Summary
