import InfoList from '@/components/InfoList';
import { useState } from 'react';
import Modal from 'react-modal';
import { orderInfo, historyOrder, roomEquipment, supplies } from '@/assets/mockdata/order-info';
const dateToString = (timestamp: number) => {
  let date = new Date(timestamp);
  switch (date.getDay()) {
    case 0: {
      return '星期日';
    }
    case 1: {
      return '星期一';
    }
    case 2: {
      return '星期二';
    }
    case 3: {
      return '星期三';
    }
    case 4: {
      return '星期四';
    }
    case 5: {
      return '星期五';
    }
    case 6: {
      return '星期六';
    }
    default: {
      return '星期六';
    }
  }
};
const dateFormat = (timestamp: number) => {
  let date = new Date(timestamp - 1000);
  return `${date.getMonth() + 1} 月 ${date.getDate()} 日${dateToString(timestamp)}`;
};
const OrderHistoryList: React.FC = () => {
  return (
    <ul className="history-list">
      {historyOrder.map(historyItem => {
        return (
          <li className="history-item">
            <img className="history-item-image" src={historyItem.imgUrl} width="120px" height="80px" />
            <div className="history-item-info">
              <div className="item-id">預定參考編號：#{historyItem.id}</div>
              <div className="item-type">{historyItem.type}</div>
              <div className="item-day">住宿天數：{historyItem.day} 晚</div>
              <div className="item-people">住宿人數：{historyItem.people} 位</div>
              <div className="start-date">入住：{dateFormat(new Date(orderInfo.startDate).getTime())}</div>
              <div className="end-date">
                退房：{dateFormat(new Date(orderInfo.startDate).getTime() + Number(orderInfo.day) * 3600 * 1000 * 24)}
              </div>
              <div className="item-price">
                <span>NT$ </span>
                {Number(historyItem.price)
                  .toLocaleString(undefined, {
                    style: 'currency',
                    currency: 'NTD',
                    maximumFractionDigits: 0
                  })
                  .replace('NTD', '')}
              </div>
            </div>
          </li>
        );
      })}
      <div className="more-item">
        <button type="button" className="btn btn-secondary">
          查看更多
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_8919_2530)">
              <path d="M7.41 8.58997L12 13.17L16.59 8.58997L18 9.99997L12 16L6 9.99997L7.41 8.58997Z" fill="#BF9D7D" />
            </g>
            <defs>
              <clipPath id="clip0_8919_2530">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </ul>
  );
};

const Order = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function closeModal() {
    setModalIsOpen(false);
  }
  function openModal() {
    setModalIsOpen(true);
  }
  const OrderModal = () => {
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        bottom: 'auto',
        maxWidth: '650px',
        marginRight: '-50%',
        padding: '12px',
        transform: 'translate(-50%, -50%)'
      }
    };
    return (
      <>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
          <div className="order-modal">
            <div className="order-modal-text">確定要取消此房型的預定嗎</div>
            <div className="order-modal-group">
              <button className="btn btn-secondary" onClick={closeModal}>
                關閉視窗
              </button>
              <button className="btn btn-primary">確認取消</button>
            </div>
          </div>
        </Modal>
      </>
    );
  };
  return (
    <div className="member-order">
      <div className="container">
        <div className="row">
          <div className="col-7">
            <div className="card">
              <div className="card-info">預定參考編號：#{orderInfo.id}</div>
              <div className="card-title">即將來的行程</div>
              <div className="order-detail">
                <div className="order-detail-room">
                  <div className="room-image">
                    <img object-fit="cover" src={orderInfo.imgUrl} width="100%"></img>
                  </div>
                  <div className="room-info">
                    <span className="type">
                      {orderInfo.type}，{orderInfo.day} 晚
                    </span>
                    <span className="people">住宿人數：{orderInfo.people} 位</span>
                  </div>
                  <div className="room-date">
                    <div className="start-date">
                      {dateFormat(new Date(orderInfo.startDate).getTime())}，15:00 可入住
                    </div>
                    <div className="end-date">
                      {dateFormat(new Date(orderInfo.startDate).getTime() + Number(orderInfo.day) * 3600 * 1000 * 24)}
                      ，12:00 前退房
                    </div>
                  </div>
                  <div className="room-price">
                    <span>NT$ </span>
                    {Number(orderInfo.price)
                      .toLocaleString(undefined, {
                        style: 'currency',
                        currency: 'NTD',
                        maximumFractionDigits: 0
                      })
                      .replace('NTD', '')}
                  </div>
                </div>
                <ul className="order-detail-device">
                  <li className="room-info__box">
                    <div className="room-info__title">
                      <h5>房內設備</h5>
                    </div>
                    <InfoList data={roomEquipment} />
                  </li>

                  <li className="room-info__box">
                    <div className="room-info__title">
                      <h5>備品提供</h5>
                    </div>
                    <InfoList data={supplies} />
                  </li>
                </ul>
                <div className="order-detail-control">
                  <button type="button" className="btn btn-secondary" onClick={() => openModal()}>
                    取消預定
                  </button>
                  <button type="button" className="btn btn-primary">
                    查看詳情
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className="card">
              <div className="card-title">歷史訂單</div>
              <div className="order-history">
                <OrderHistoryList />
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrderModal />
    </div>
  );
};
export default Order;