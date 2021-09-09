import React, {useEffect, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as AdminService from '../services/AdminService';
import noImage from '../assets/no-profile-picture.jpg'

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

const Users = props => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToRemove, setUserToRemove] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalLoading, setModalIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        AdminService.GetAllUsers()
        .then(receviedUserss => {
            setUsers(receviedUserss);
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
        width: 300 
      },
      {
          field: 'image',
          headerName: 'תמונה',
          width: 120,
          editable: true,
          renderCell: (params) => (
              <img src={params.row.imageUrl || noImage} height='100' width='100' alt="user"/>
          )
        },
    {
      field: 'fullName',
      headerName: 'שם',
      width: 150,
      editable: true,
    },
    {
        field: 'email',
        headerName: 'דוא"ל',
        width: 150,
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
  
    const openConfirmationModal = (userDetails) => {
      setIsModalOpen(true);
      setUserToRemove(userDetails)
    }

    const closeModal = () => {
      setIsModalOpen(false);
    }

    const removeUser = async () => {
      try {
        setModalIsLoading(true);
        const result = await AdminService.RemoveUser(userToRemove.id);
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
              <p>האם אתה בטוח שברצונך להסיר את המשתמש {userToRemove?.fullName}</p>
              {isModalLoading && <CircularProgress />}
              <span style={{marginTop: 40, display: 'flex'}}>
                <Button onClick={removeUser} variant="contained" color="primary" style={{marginRight: 20}}>כן</Button>
                <Button onClick={closeModal} variant="contained">לא</Button>
              </span>
        </div>
      )
    }

    return (
        <div>
            <DataGrid
                style={{margin: 80}}
                rows={users}
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
                contentLabel="הסר משתמש"
                shouldCloseOnOverlayClick={true}
                onRequestClose={closeModal}
                ariaHideApp={false}
            >
              {modalBody()}
            </Modal>
      </div>
    )
}

export default Users;