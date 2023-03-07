import React, {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import ToTranslit from "./ToTranslit";
import  DtPicker  from 'react-calendar-datetime-picker';
import 'react-calendar-datetime-picker/dist/index.css';
import './domainFormDate.scss';

const DomainFormRu = () => {
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
    const [datePassport, setDatePassport] = useState(null);

    useEffect(()=>{
        domain.setDomainForm({
            'nameRu': nameRu,
            'familiaRu': familiaRu,
            'otchestvoRu': otchestvoRu,
            'familiaEn': familiaEn,
            'nameEn': nameEn,
            'otchestvoEn': otchestvoEn
        });
        setFamiliaEn(ToTranslit(familiaRu));
        setNameEn(ToTranslit(nameRu));
        setOtchestvoEn(ToTranslit(otchestvoRu));
    },[nameRu, familiaRu, otchestvoRu])


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
              <input type="text" id="inputPhone" name="phone" value={phone}
                     onChange={e => setPhone(e.target.value)}
                     className="form-control"/>
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
              <input type="text" id="inputDatePassport" name="date_passport" value={datePassport ? (datePassport.day + '.' + datePassport.month + '.' + datePassport.year) : ''}
                     onChange={e => setDatePassport(e.target.value)}
                     className="form-control"/>
              <DtPicker
                  onChange={setDatePassport}
                  placeholder='Выбрать дату2'
                  inputClass='custom-input'
              />
          </div>
      </>
    );

}

export default DomainFormRu;