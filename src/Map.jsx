import { useState, useEffect, useContext } from "react";
import { useUserData } from "./userContext";
/* import "./App.css"; */
import axios from "axios";
import styled from "styled-components";
import Modal from "react-modal";
import { IoMdEgg } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import { IconContext } from "react-icons";

function MapPage() {
  const [states, setStates] = useState([]);
  const [refreshAxios, setRefreshAxios] = useState(false);
  const [selection, setSelection] = useState([]);
  const [userData] = useUserData();
  const config = {
    headers: {
      Authorization: `Bearer ${userData}`,
    },
  };

  function getMap() {
    const request = axios.get(`http://localhost:5000/map`, config);
    // setLoading(true);
    request
      .then((response) => {
        setStates(response.data);
        //  setLoading(false);
      })
      .catch((err) => {
        /*                     setConnectError(err);
                        setLoading(false); */
        console.error(err);
      });
  }

  function State({ id, name, path, status }) {
    const [modalOpen, setModal] = useState(false);

    function showModal() {
      setModal(!modalOpen);
    }
    function updateStatus(event, id, status) {
      event.preventDefault();
      const request = axios.patch(
        `http://localhost:5000/map`,
        [{ uf: id, status: status }],
        config
      );
      request
        .then((response) => {
          setModal(false);
          setRefreshAxios(!refreshAxios);
        })
        .catch((err) => {
          console.error(err);
          alert("Erro ao atualizar status");
        });
    }

    function modalOptions() {
      if (status === "available") {
        return (
          <>
            <button
              type="submit"
              className="delete"
              onClick={() => {
                updateStatus(event, id, "gone");
              }}
            >
              {" "}
              Já fui
            </button>
            <button
              type="submit"
              className="delete"
              onClick={() => {
                updateStatus(event, id, "wishlist");
              }}
            >
              {" "}
              Quero ir
            </button>
          </>
        );
      }
      if (status === "gone") {
        return (
          <>
            <button
              type="submit"
              className="delete"
              onClick={() => {
                updateStatus(event, id, "available");
              }}
            >
              {" "}
              Nunca fui
            </button>
            <button
              type="submit"
              className="delete"
              onClick={() => {
                updateStatus(event, id, "wishlist");
              }}
            >
              {" "}
              Quero ir
            </button>
          </>
        );
      }
      if (status === "wishlist") {
        return (
          <>
            <button
              type="submit"
              className="delete"
              onClick={() => {
                updateStatus(event, id, "available");
              }}
            >
              {" "}
              Nunca fui
            </button>
            <button
              type="submit"
              className="delete"
              onClick={() => {
                updateStatus(event, id, "gone");
              }}
            >
              {" "}
              Já fui
            </button>
          </>
        );
      }
    }
    return (
      <>
        <path
          id={id}
          name={name}
          d={path}
          className={status}
          onClick={showModal}
        />
        <Modal
          isOpen={modalOpen}
          onRequestClose={showModal}
          contentLabel="Delete Modal"
          style={modalStyle}
          ariaHideApp={false}
        >
          <ContainerModal>
            <>
              <h4>{name}</h4>
              <div className="modalButtons">
                <button className="back" onClick={showModal}>
                  Cancelar
                </button>
                {modalOptions()}
              </div>
            </>
          </ContainerModal>
        </Modal>
      </>
    );
  }

  useEffect(() => {
    getMap();
  }, [refreshAxios]);
  return (
    <>
      <Container>
        <div className="legend">
          <div className="sub-item">
            <IconContext.Provider
              value={{
                style: {
                  color: "#286240",
                  fontSize: "20px",
                  marginRight: "10px",
                },
              }}
            >
              <FaCircle></FaCircle> Visitado
            </IconContext.Provider>
          </div>
          <div className="sub-item">
            <IconContext.Provider
              value={{
                style: {
                  color: "#6c8e9f",
                  fontSize: "20px",
                  marginRight: "10px",
                },
              }}
            >
              <FaCircle></FaCircle> Lista de Desejos
            </IconContext.Provider>
          </div>
          <div className="sub-item">
            <IconContext.Provider
              value={{
                style: {
                  color: "#605e5a",
                  fontSize: "20px",
                  marginRight: "10px",
                },
              }}
            >
              <FaCircle></FaCircle> Sem Marcação
            </IconContext.Provider>
          </div>
        </div>
        <BrazilMap
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 613 639"
          aria-label="Map of Brazil"
        >
          {states.map((state, index) => (
            <State
              key={index}
              id={state.uf}
              name={state.name}
              path={state.path}
              status={state.status}
            />
          ))}
        </BrazilMap>
        <div className="legend-mobile">
          <div className="sub-item">
            <IconContext.Provider
              value={{
                style: {
                  color: "#286240",
                  fontSize: "20px",
                  marginRight: "10px",
                  marginLeft: "10px",
                },
              }}
            >
              <FaCircle></FaCircle> Visitado
            </IconContext.Provider>
          </div>
          <div className="sub-item">
            <IconContext.Provider
              value={{
                style: {
                  color: "#6c8e9f",
                  fontSize: "20px",
                  marginRight: "10px",
                  marginLeft: "10px",
                },
              }}
            >
              <FaCircle></FaCircle> Lista de Desejos
            </IconContext.Provider>
          </div>
          <div className="sub-item">
            <IconContext.Provider
              value={{
                style: {
                  color: "#605e5a",
                  fontSize: "20px",
                  marginRight: "10px",
                  marginLeft: "10px",
                },
              }}
            >
              <FaCircle></FaCircle> Sem Marcação
            </IconContext.Provider>
          </div>
        </div>
      </Container>
    </>
  );
}

export default MapPage;

const ContainerModal = styled.div`
  width: 597px;
  height: 262px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  h4 {
    width: 350px;
    height: 82px;
    font-size: 34px;
    font-family: "Josefin Sans", sans-serif;
    font-weight: 700;
    color: #ffffff;
    text-align: center;
  }

  .modalButtons {
    width: 500px;
    display: flex;
    justify-content: space-between;
  }

  .modalButtons > button {
    width: 100px;
    height: 37px;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    border: 0;
  }

  .back {
    background-color: #ffffff;
    color: #6c8e9f;
  }

  .delete {
    background-color: #6c8e9f;
    color: #ffffff;
  }

  @media (max-width: 935px) {
    width: 70vw;
    height: 262px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    box-sizin: border-box;

    h4 {
      width: 50vw;
      height: 40px;
      font-size: 24px;
      font-family: "Lato", sans-serif;
      font-weight: 700;
      color: #ffffff;
      text-align: center;
    }

    .modalButtons {
      width: 50vw;
      display: flex;
      flex-direction: column-reverse;
      height: 200px;
      align-items: center;
      justify-content: space-around;
    }

    .modalButtons > button {
      width: 20vw;
      height: 37px;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 700;
      border: 0;
    }

    .back {
      background-color: #ffffff;
      color: #6c8e9f;
    }

    .delete {
      background-color: #6c8e9f;
      color: #ffffff;
    }
  }
`;

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "fit-content",
    width: "fit-content",
    backgroundColor: "#605e5a",
    borderRadius: "50px",
    border: "0",
  },
};

const BrazilMap = styled.svg`
  width: 800px;
  height: auto;
  stroke: #e7dbc3;
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;

  .available {
    fill: #605e5a;
    cursor: pointer;
  }

  .gone {
    fill: #286240;
    cursor: pointer;
  }

  .wishlist {
    fill: #6c8e9f;
    cursor: pointer;
  }

  @media (max-width: 935px) {
    margin-right: 0px;
    margin-bottom: 20px;
    width: 100%;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e7dbc3;
  display: flex;
  justify-content: center;

  .legend {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .legend-mobile {
    display: none;
  }

  .sub-item {
    display: flex;
    margin-bottom: 10px;
    font-family: "Josefin Sans", sans-serif;
    align-items: center;
  }

  @media (max-width: 935px) {
    flex-direction: column;

    .legend {
      display: none;
    }

    .legend-mobile {
      display: flex;
      justify-content: center;
    }
  }
`;
