import React, {useEffect, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as AdminService from '../services/AdminService';

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Dogs = props => {
    const [dogs, setDogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dogToRemove, setDogToRemove] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalLoading, setModalIsLoading] = useState(false);

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
    }, [isModalOpen])

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
              <img src={params.row.imageURL} height='100' width='100' alt="dog"/>
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
        <Button
            variant="contained" 
            color="secondary"
            onClick={_ => {openConfirmationModal(params.row)}}
        >
          מחק
        </Button>
      )
    }
  ];
  
    const openConfirmationModal = (dogDetails) => {
      setIsModalOpen(true);
      setDogToRemove(dogDetails)
    }

    const closeModal = () => {
      setIsModalOpen(false);
    }

    const removeDog = async () => {
      try {
        setModalIsLoading(true);
        const result = await AdminService.RemoveDog(dogToRemove.id);
        if(result) {
          console.log('deleted', result);
          setIsModalOpen(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setModalIsLoading(false);
      }

    }

    const modalBody = () => {
      return (
        <div className="modal-content">
              <p>האם אתה בטוח שברצונך להסיר את הכלב {dogToRemove?.name}</p>
              {isModalLoading && <CircularProgress />}
              <span style={{marginTop: 40, display: 'flex'}}>
                <Button onClick={removeDog} variant="contained" color="primary" style={{marginRight: 20}}>כן</Button>
                <Button onClick={closeModal} variant="contained">לא</Button>
              </span>
        </div>
      )
    }

    return (
        <div>
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
            <Modal
                isOpen={isModalOpen}
                style={modalStyle}
                contentLabel="הסר כלב"
                shouldCloseOnOverlayClick={true}
                onRequestClose={closeModal}
                ariaHideApp={false}
            >
              {modalBody()}
            </Modal>
      </div>
    )
}

export default Dogs;