import React, {useEffect, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';

import * as AdminService from '../services/AdminService';

const columns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 150 
    },
    {
        field: 'image',
        headerName: 'תמונה',
        width: 120,
        editable: true,
        renderCell: (params) => (
            <img src={params.row.imageURL} height='100' width='100'/>
        )
      },
  {
    field: 'name',
    headerName: 'שם',
    width: 150,
    editable: true,
  },
  {
    field: 'race',
    headerName: 'גזע',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'גיל',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'color',
    headerName: 'צבע',
    width: 110,
    editable: true,
  },
  {
    field: 'delete',
    headerName: 'מחק',
    type: 'number',
    width: 110,
    editable: true,
    renderCell: (params) => (
        <button
            onClick={_ => {console.log(params)}}
        >מחק</button>
    )
  }
];

const Dogs = props => {
    const [dogs, setDogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        AdminService.GetAllDogs()
        .then(receviedDogs => {
            setDogs(receviedDogs);
        }).catch(err => {
            console.log(err);
        }).finally(() =>{
            setIsLoading(false)
        })
    }, [])

    return (
        <div style={{ }}>
            <DataGrid
                style={{margin: 80}}
                rows={dogs}
                columns={columns}
                autoHeight
                wid
                autoPageSize
                loading={isLoading}
                rowHeight={100}
            />
      </div>
    )
}

export default Dogs;