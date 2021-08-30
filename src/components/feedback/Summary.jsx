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

const useStyles = makeStyles((theme) => ({}))

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

  useEffect(() => {}, [])

  return (
    <Card></Card>
    // <DataGrid
    //   rows={data.ansList}
    //   columns={columns}
    //   pageSize={5}
    //   disableSelectionOnClick
    //   localeText={localeText}
    //   components={{
    //     Toolbar: CustomToolbar,
    //   }}
    //   rowsPerPageOptions={[5]}
    //   componentsProps={{ panel: { disablePortal: true } }}
    // />
  )
}

export default Summary
