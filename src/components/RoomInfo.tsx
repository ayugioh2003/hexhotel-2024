type RoomInfoType = {
  showToKnow?: boolean;
  roomInfo: Array<Record<string, string>>;
  roomLayout: string[];
  roomEquipment: string[];
  supplies: string[];
};

import InfoList from '@/components/InfoList';
import SvgIcon from '@/components/SvgIcon';

const RoomInfo = ({ showToKnow = false, roomInfo, roomLayout, roomEquipment, supplies }: RoomInfoType) => {
  return (
    <div className="room-info">
      <h4 className="mb-4">房間資訊</h4>
      <ul style={{ padding: 0 }}>
        <li className="room-info__box">
          <div className="room-info__title">
            <h5>房型基本資訊</h5>
          </div>
          <ul className="room-info__content room-info--type">
            {roomInfo.map(item => {
              return (
                <li key={item.text} className="room-info__item">
                  <SvgIcon className="mb-2" name={`svg/${item.icon}`} width={24} height={24} color={'#BF9D7D'} />
                  <span className="fw-bold">{item.text}</span>
                </li>
              );
            })}
          </ul>
        </li>

        <li className="room-info__box">
          <div className="room-info__title">
            <h5>房間格局</h5>
          </div>
          <InfoList data={roomLayout} />
        </li>

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

        {showToKnow ? (
          <li className="room-info__box">
            <div className="room-info__title">
              <h5>訂房須知</h5>
            </div>
            <ol>
              <li>入住時間為下午3點，退房時間為上午12點。</li>
              <li>如需延遲退房，請提前與櫃檯人員聯繫，視當日房況可能會產生額外費用。</li>
              <li>請勿在房間內抽煙，若有抽煙需求，可以使用設在酒店各樓層的專用吸煙區。</li>
            </ol>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default RoomInfo;
