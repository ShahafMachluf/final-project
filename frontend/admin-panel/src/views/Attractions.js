import React, {useEffect, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as AdminService from '../services/AdminService';
import AddAttraction from '../components/AddAttraction';

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

const Attractions = props => {
    const [attractions, setAttractions] = useState([]);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [attractionToRemove, setAttractionToRemove] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalLoading, setModalIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        AdminService.GetAllAttractions()
        .then(receviedAttractions => {
            setAttractions(receviedAttractions);
        }).catch(err => {
            console.log(err);
        }).finally(() =>{
            setIsLoading(false)
        })
    }, [isAddModalOpen, isRemoveModalOpen])

    
    const getTypeText = type => {
        switch (type){
          case 1:
              return 'וטרינר';
          case 2:
              return 'חנות אוכל ורווחה';
          case 3:
              return 'מספרה';
          case 4:
              return 'מאלף כלבים';
          case 5:
              return 'פנסיון'
          default:
              return '';
        }
    }


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
        field: 'phoneNumber',
        headerName: 'מספר טלפון',
        width: 150,
        editable: true,
      },
      {
        field: 'type',
        headerName: 'סוג',
        width: 150,
        editable: true,
        renderCell: (params) => (
            <p>{getTypeText(params.row.attractionType)}</p>
        )
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

    const openConfirmationModal = attractionDetails => {
        setIsRemoveModalOpen(true);
        setAttractionToRemove(attractionDetails)
    }

    const closeModal = () => {
        setIsRemoveModalOpen(false);
        setIsAddModalOpen(false);
    }

    const removeAttraction = async () => {
        try {
          setModalIsLoading(true);
          const result = await AdminService.RemoveAttrction(attractionToRemove.id);
          if(result) {
            console.log('deleted', result);
            setIsRemoveModalOpen(false);
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
                <p>האם אתה בטוח שברצונך להסיר את האטרקציה {attractionToRemove?.name}</p>
                {isModalLoading && <CircularProgress />}
                <span style={{marginTop: 40, display: 'flex'}}>
                  <Button onClick={removeAttraction} variant="contained" color="primary" style={{marginRight: 20}}>כן</Button>
                  <Button onClick={closeModal} variant="contained">לא</Button>
                </span>
          </div>
        )
      }


    return (
        <div>
            <Button
                style={{display: 'flex', marginLeft: 80}}
                variant="contained" 
                color="primary"
                onClick={() => {setIsAddModalOpen(true)}}
            >
                הוסף אטרקציה
            </Button>
            <DataGrid
                style={{margin: 80}}
                rows={attractions}
                columns={columns}
                autoHeight
                wid
                autoPageSize
                loading={isLoading}
                rowHeight={100}
            />
            <Modal
                isOpen={isRemoveModalOpen}
                style={modalStyle}
                contentLabel="הסר אטרקציה"
                shouldCloseOnOverlayClick={true}
                onRequestClose={closeModal}
                ariaHideApp={false}
            >
                {modalBody()}
            </Modal>
            <Modal
                isOpen={isAddModalOpen}
                style={modalStyle}
                contentLabel="הוסף אטרקציה"
                shouldCloseOnOverlayClick={true}
                onRequestClose={closeModal}
                ariaHideApp={false}
            >
                <AddAttraction closeModal={closeModal} />
            </Modal>
  </div>
    )
}

export default Attractions;