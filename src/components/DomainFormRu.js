import React, {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import ToTranslit from "./ToTranslit";
import DatePicker from "./DatePicker";
import {observer} from "mobx-react-lite";
import InputMask from "react-input-mask";

const DomainFormRu = observer(() => {
    const {domain} = useContext(Context);
    const [nameRu, setNameRu] = useState('');
    const [familiaRu, setFamiliaRu] = useState('');
    const [otchestvoRu, setOtchestvoRu] = useState('');
    const [familiaEn, setFamiliaEn] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [otchestvoEn, setOtchestvoEn] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [numPassport, setNumPassport] = useState('');
    const [orgPassport, setOrgPassport] = useState('');
    const [datePassport, setDatePassport] = useState('');
    const [dateBirthday, setDateBirthday] = useState('');
    const [addressCountry, setAddressCountry] = useState('');
    const [addressObl, setAddressObl] = useState('');
    const [addressInd, setAddressInd] = useState('');
    const [addressCity, setAddressCity] = useState('');
    const [addressStr, setAddressStr] = useState('');



    useEffect(()=>{
        domain.setDomainForm({
            'nameRu': nameRu,
            'familiaRu': familiaRu,
            'otchestvoRu': otchestvoRu,
            'familiaEn': familiaEn,
            'nameEn': nameEn,
            'otchestvoEn': otchestvoEn,
            'datePassport': datePassport,
            'dateBirthday': dateBirthday
        });
        setFamiliaEn(ToTranslit(familiaRu));
        setNameEn(ToTranslit(nameRu));
        setOtchestvoEn(ToTranslit(otchestvoRu));
    },[nameRu, familiaRu, otchestvoRu, datePassport, dateBirthday])


    const changeDatePassport = (event) => {
        setDatePassport(new Date(event).toLocaleDateString('fr-CA'));
    }

    const changeDateBirthday = (event) => {
        setDateBirthday(new Date(event).toLocaleDateString('fr-CA'));
    }

    const numberValueReduced = phone => {
        return phone.replace(/^(\d{3})(\d{3})(\d{2})(\d{2})$/, '+7 ($1) $2-$3-$4');
    };

    return(
      <>
          <div className="form-group">
              <label htmlFor="inputFamiliaRu">Фамилия</label>
              <input type="text" id="inputFamiliaRu" name="familiaRu" value={familiaRu}
                     onChange={e => setFamiliaRu(e.target.value)}
                     className="form-control"/>
          </div>
          <div className="form-group">
              <label htmlFor="inputNameRu">Имя</label>
              <input type="text" id="inputNameRu" name="nameRu" value={nameRu}
                     onChange={e => setNameRu(e.target.value)}
                     className="form-control"/>
          </div>
          <div className="form-group">
              <label htmlFor="inputOtchestvoRu">Отчество</label>
              <input type="text" id="inputOtchestvoRu" name="otchestvoRu" value={otchestvoRu}
                     onChange={e => setOtchestvoRu(e.target.value)}
                     className="form-control"/>
          </div>
          <div className="form-group">
              <label htmlFor="inputFamiliaEn">Фамилия (латиницей)</label>
              <input type="text" id="inputFamiliaEn" name="familiaEn" value={familiaEn}
                     onChange={e => setFamiliaEn(ToTranslit(e.target.value))}
                     className="form-control"/>
          </div>
          <div className="form-group">
              <label htmlFor="inputNameEn">Имя  (латиницей)</label>
              <input type="text" id="inputNameEn" name="nameEn" value={nameEn}
                     onChange={e => setNameEn(ToTranslit(e.target.value))}
                     className="form-control"/>
          </div>
          <div className="form-group">
              <label htmlFor="inputOtchestvoEn">Отчество  (латиницей)</label>
              <input type="text" id="inputOtchestvoEn" name="otchestvoEn" value={otchestvoEn}
                     onChange={e => setOtchestvoEn(ToTranslit(e.target.value))}
                     className="form-control"/>
          </div>
          <div className="form-group">
              <label htmlFor="inputEmail">Email</label>
              <input type="text" id="inputEmail" name="email" value={email}
                     onChange={e => setEmail(e.target.value)}
                     className="form-control"/>
          </div>
          <div className="form-group">
          <label htmlFor="inputPhone">Телефон</label>
          <InputMask mask="+7 (999) 999-99-99" value={phone} onChange={e => setPhone(e.target.value)}>
              {() => <input type="text" id="inputPhone" name="phone"
                     placeholder="+7 (123) 123-45-67"
                     className="form-control"/>
              }
          </InputMask>
          </div>
          <div className="border-top text-center">
              <p className="m-0 mt-3 mb-1">Паспортные данные</p>
          </div>
          <div className="form-group">
              <label htmlFor="inputNumPassport">Серия и номер паспорта</label>
              <input type="text" id="inputNumPassport" name="num_passport" value={numPassport}
                     onChange={e => setNumPassport(e.target.value)}
                     className="form-control"/>
          </div>
          <div className="form-group">
              <label htmlFor="inputOrgPassport">Организация, выдавшая паспорт</label>
              <input type="text" id="inputOrgPassport" name="org_passport" value={orgPassport}
                     onChange={e => setOrgPassport(e.target.value)}
                     className="form-control"/>
          </div>
          <div className="form-group">
              <label htmlFor="inputDatePassport">Дата выдачи паспорта</label>
              <div className="input-group date">
                  <input type="text" id="inputDatePassport" name="date_passport" value={datePassport}
                         onChange={e => setDatePassport(e.target.value)}
                         placeholder="ГГГГ-ММ-ДД"
                         className="form-control"/>
                  <div className="input-group-append">
                      <DatePicker onChange={changeDatePassport}/>
                  </div>
              </div>
          </div>
          <div className="form-group border-bottom">
              <label htmlFor="inputDateBirthday">Дата рождения</label>
              <div className="input-group date">
                  <input type="text" id="inputDateBirthday" name="date_birthday" value={dateBirthday}
                         onChange={e => setDateBirthday(e.target.value)}
                         placeholder="ГГГГ-ММ-ДД"
                         className="form-control"/>
                  <div className="input-group-append">
                      <DatePicker onChange={changeDateBirthday}/>
                  </div>
              </div>
          </div>
          <div className="border-top text-center">
              <p className="m-0 mt-3 mb-1">Адрес регистрации</p>
          </div>
          <div className="form-group">
              <label htmlFor="inputAddressCountry">Страна</label>
              <input type="text" id="inputAddressCountry" name="address_country" value={addressCountry}
                     onChange={e => setAddressCountry(e.target.value)}
                     className="form-control"/>
          </div>
          <div className="form-group">
              <label htmlFor="inputAddressObl">Регион</label>
              <input type="text" id="inputAddressObl" name="address_obl" value={addressObl}
                     onChange={e => setAddressObl(e.target.value)}
                     className="form-control"/>
          </div>
          <div className="form-group">
              <label htmlFor="inputAddressInd">Индекс</label>
              <input type="text" id="inputAddressInd" name="address_ind" value={addressInd}
                     onChange={e => setAddressInd(e.target.value)}
                     className="form-control"/>
          </div>
          <div className="form-group">
              <label htmlFor="inputAddressCity">Город</label>
              <input type="text" id="inputAddressCity" name="address_city" value={addressCity}
                     onChange={e => setAddressCity(e.target.value)}
                     className="form-control"/>
          </div>
          <div className="form-group">
              <label htmlFor="inputAddressStr">Город</label>
              <input type="text" id="inputAddressStr" name="address_str" value={addressStr}
                     onChange={e => setAddressStr(e.target.value)}
                     className="form-control"/>
          </div>
      </>
    );

});

export default DomainFormRu;