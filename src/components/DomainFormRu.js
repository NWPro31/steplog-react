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
    const [codePassport, setCodePassport] = useState('');
    const [dateBirthday, setDateBirthday] = useState('');
    const [addressCountry, setAddressCountry] = useState('');
    const [addressObl, setAddressObl] = useState('');
    const [addressInd, setAddressInd] = useState('');
    const [addressCity, setAddressCity] = useState('');
    const [addressStr, setAddressStr] = useState('');
    const [errors, setErrors] = useState({});


    useEffect(()=>{
        domain.setDomainForm({
            'nameRu': nameRu,
            'familiaRu': familiaRu,
            'otchestvoRu': otchestvoRu,
            'familiaEn': familiaEn,
            'nameEn': nameEn,
            'otchestvoEn': otchestvoEn,
            'email': email,
            'phone': phone,
            'numPassport': numPassport,
            'datePassport': datePassport,
            'orgPassport': orgPassport,
            'dateBirthday': dateBirthday,
            'codePassport': codePassport,
            'addressCountry': addressCountry,
            'addressObl': addressObl,
            'addressInd': addressInd,
            'addressCity': addressCity,
            'addressStr': addressStr,
            'error': domain.domainForm.error
        });

    },[nameRu, familiaRu, otchestvoRu, familiaEn, nameEn, otchestvoEn, email, phone, orgPassport, numPassport, datePassport, dateBirthday, codePassport, addressCountry, addressCountry, addressObl, addressInd, addressCity, addressStr, errors])

    useEffect(() => {
        setErrors(domain.domainForm.error);
    }, [domain.domainForm.error])

    const changeDatePassport = (event) => {
        setDatePassport(new Date(event).toLocaleDateString('fr-CA'));
        errors.datePassport && new Date(event).toLocaleDateString('fr-CA') !== "" && new Date(event).toLocaleDateString('fr-CA').match(/\d{4}-\d{2}-\d{2}/) && delete errors.datePassport;
    }

    const changeDateBirthday = (event) => {
        setDateBirthday(new Date(event).toLocaleDateString('fr-CA'));
        errors.dateBirthday && new Date(event).toLocaleDateString('fr-CA') !== "" && new Date(event).toLocaleDateString('fr-CA').match(/\d{4}-\d{2}-\d{2}/) && delete errors.dateBirthday;
    }

    const removeError = (name, pattern, e) => {
        if(errors[name]) {
            if(e.target.value !== "" && e.target.value.match(pattern)) delete errors[name];
        }
    };

    const toEn = (name, set) => {
        if(set === 'familiaRu') {
            setFamiliaEn(ToTranslit(name));
            errors.familiaEn && ToTranslit(name) !== "" && ToTranslit(name).match(/^[A-Z][a-z]{1,}/) && delete errors.familiaEn;
        }
        if(set === 'nameRu') {
            setNameEn(ToTranslit(name));
            errors.nameRu && ToTranslit(name) !== "" && ToTranslit(name).match(/^[A-Z][a-z]{1,}/) && delete errors.nameRu;
        }
        if(set === 'otchestvoRu') {
            setOtchestvoEn(ToTranslit(name));
            errors.otchestvoRu && ToTranslit(name) !== "" && ToTranslit(name).match(/^[A-Z][a-z]{1,}/) && delete errors.otchestvoRu;
        }
    };

    return(
      <>
          <div className="form-group">
              <label htmlFor="inputFamiliaRu">Фамилия</label>
              <input type="text" id="inputFamiliaRu" name="familiaRu" value={familiaRu}
                     onChange={e => {
                         setFamiliaRu(e.target.value);
                         errors.familiaRu && removeError('familiaRu', /^[А-Я][а-я]{1,}/, e);
                         toEn(e.target.value, 'familiaRu');
                     }}
                     className={`form-control ${errors.familiaRu && "border-danger"}`}/>
              {errors.familiaRu && <span className="text-danger">{errors.familiaRu}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputNameRu">Имя</label>
              <input type="text" id="inputNameRu" name="nameRu" value={nameRu}
                     onChange={e => {
                         setNameRu(e.target.value);
                         errors.nameRu && removeError('nameRu', /^[А-Я][а-я]{1,}/, e);
                         toEn(e.target.value, 'nameRu');
                     }}
                     className={`form-control ${errors.nameRu && "border-danger"}`}/>
              {errors.nameRu && <span className="text-danger">{errors.nameRu}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputOtchestvoRu">Отчество</label>
              <input type="text" id="inputOtchestvoRu" name="otchestvoRu" value={otchestvoRu}
                     onChange={e => {
                         setOtchestvoRu(e.target.value);
                         errors.otchestvoRu && removeError('otchestvoRu', /^[А-Я][а-я]{2,}/, e);
                         toEn(e.target.value, 'otchestvoRu');
                     }}
                     className={`form-control ${errors.otchestvoRu && "border-danger"}`}/>
              {errors.otchestvoRu && <span className="text-danger">{errors.otchestvoRu}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputFamiliaEn">Фамилия (латиницей)</label>
              <input type="text" id="inputFamiliaEn" name="familiaEn" value={familiaEn}
                     onChange={e => {
                         setFamiliaEn(e.target.value);
                         errors.familiaEn && removeError('familiaEn', /^[A-Z][a-z]{1,}/, e);
                     }}
                     className={`form-control ${errors.familiaEn && "border-danger"}`}/>
              {errors.familiaEn && <span className="text-danger">{errors.familiaEn}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputNameEn">Имя  (латиницей)</label>
              <input type="text" id="inputNameEn" name="nameEn" value={nameEn}
                     onChange={e => {
                         setNameEn(e.target.value);
                         errors.nameEn && removeError('nameEn', /^[A-Z][a-z]{1,}/, e);
                     }}
                     className={`form-control ${errors.nameEn && "border-danger"}`}/>
              {errors.nameEn && <span className="text-danger">{errors.nameEn}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputOtchestvoEn">Отчество  (латиницей)</label>
              <input type="text" id="inputOtchestvoEn" name="otchestvoEn" value={otchestvoEn}
                     onChange={e => {
                         setOtchestvoEn(e.target.value);
                         errors.otchestvoEn && removeError('otchestvoEn', /^[A-Z][a-z]{1,}/, e);
                     }}
                     className={`form-control ${errors.otchestvoEn && "border-danger"}`}/>
              {errors.otchestvoEn && <span className="text-danger">{errors.otchestvoEn}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputEmail">Email</label>
              <input type="text" id="inputEmail" name="email" value={email}
                     onChange={e => {
                         setEmail(e.target.value);
                         errors.email && removeError('email', /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, e);
                     }}
                     className={`form-control ${errors.email && "border-danger"}`}/>
              {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="form-group">
          <label htmlFor="inputPhone">Телефон</label>
          <InputMask mask="+7 (999) 999-99-99" value={phone}
                     onChange={e => {
                         setPhone(e.target.value);
                         errors.phone && removeError('phone', /\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}/, e);
                     }}>
              {() => <input type="text" id="inputPhone" name="phone"
                            placeholder="+7 (123) 123-45-67"
                            className={`form-control ${errors.phone && "border-danger"}`}/>
              }

          </InputMask>
              {errors.phone && <span className="text-danger">{errors.phone}</span>}
          </div>
          <div className="border-top text-center">
              <p className="m-0 mt-3 mb-1">Паспортные данные</p>
          </div>
          <div className="form-group">
              <label htmlFor="inputNumPassport">Серия и номер паспорта</label>
              <InputMask mask="9999 999999" value={numPassport}
                         onChange={e => {
                             setNumPassport(e.target.value);
                             errors.numPassport && removeError('numPassport', /\d{4}\s\d{6}/, e);
                         }}>
                  {() => <input type="text" id="inputNumPassport" name="num_passport"
                                placeholder="1234 123456"
                                className={`form-control ${errors.numPassport && "border-danger"}`}/>
                  }
              </InputMask>
              {errors.numPassport && <span className="text-danger">{errors.numPassport}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputOrgPassport">Организация, выдавшая паспорт</label>
              <input type="text" id="inputOrgPassport" name="org_passport" value={orgPassport}
                     onChange={e => {
                         setOrgPassport(e.target.value);
                         errors.orgPassport && removeError('orgPassport', /^[а-яА-Яa-zA-Z0-9\s?!,.'Ёё]+$/, e);
                     }}
                     className={`form-control ${errors.orgPassport && "border-danger"}`}/>
              {errors.orgPassport && <span className="text-danger">{errors.orgPassport}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputDatePassport">Дата выдачи паспорта</label>
              <div className="input-group date">
                  <InputMask mask="2099-99-99" value={datePassport}
                             onChange={e => {
                                 setDatePassport(e.target.value);
                                 errors.datePassport && removeError('datePassport', /\d{4}-\d{2}-\d{2}/, e);
                             }}>
                      {() =>
                          <input type="text" id="inputDatePassport" name="date_passport"
                                 placeholder="ГГГГ-ММ-ДД"
                                 className={`form-control ${errors.datePassport && "border-danger"}`}/>
                      }
                  </InputMask>
                  <div className="input-group-append">
                      <DatePicker onChange={changeDatePassport}/>
                  </div>
              </div>
              {errors.datePassport && <span className="text-danger">{errors.datePassport}</span>}
          </div>
          <div className="form-group border-bottom">
              <label htmlFor="inputDateBirthday">Дата рождения</label>
              <div className="input-group date">
                  <InputMask mask="9999-99-99" value={dateBirthday}
                             onChange={e => {
                                 setDateBirthday(e.target.value);
                                 errors.dateBirthday && removeError('dateBirthday', /\d{4}-\d{2}-\d{2}/, e);
                             }}>
                      {() =>
                          <input type="text" id="inputDateBirthday" name="date_birthday"
                                 placeholder="ГГГГ-ММ-ДД"
                                 className={`form-control ${errors.dateBirthday && "border-danger"}`}/>
                      }
                  </InputMask>
                  <div className="input-group-append">
                      <DatePicker onChange={changeDateBirthday}/>
                  </div>
              </div>
              {errors.dateBirthday && <span className="text-danger">{errors.dateBirthday}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputCodePassport">Код подразделения, выдавшего паспорт</label>
              <InputMask mask="999-999" value={codePassport}
                         onChange={e => {
                             setCodePassport(e.target.value);
                             errors.codePassport && removeError('codePassport', /\d{3}-\d{3}/, e);
                         }}>
                  {() => <input type="text" id="inputCodePassport" name="code_passport"
                                placeholder="000-000"
                                className={`form-control ${errors.codePassport && "border-danger"}`}/>
                  }
              </InputMask>
              {errors.codePassport && <span className="text-danger">{errors.codePassport}</span>}
          </div>
          <div className="border-top text-center">
              <p className="m-0 mt-3 mb-1">Данные регистрации</p>
          </div>
          <div className="form-group">
              <label htmlFor="inputAddressCountry">Страна</label>
              <input type="text" id="inputAddressCountry" name="address_country" value={addressCountry}
                     onChange={e => {
                         setAddressCountry(e.target.value);
                         errors.addressCountry && removeError('addressCountry', /^[а-яА-Яa-zA-Z0-9\s?!,.'Ёё]+$/, e);
                     }}
                     className={`form-control ${errors.addressCountry && "border-danger"}`}/>
              {errors.addressCountry && <span className="text-danger">{errors.addressCountry}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputAddressObl">Регион</label>
              <input type="text" id="inputAddressObl" name="address_obl" value={addressObl}
                     onChange={e => {
                         setAddressObl(e.target.value);
                         errors.addressObl && removeError('addressObl', /^[а-яА-Яa-zA-Z0-9\s?!,.'Ёё]+$/, e);
                     }}
                     className={`form-control ${errors.addressObl && "border-danger"}`}/>
              {errors.addressObl && <span className="text-danger">{errors.addressObl}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputAddressInd">Индекс</label>
              <input type="text" id="inputAddressInd" name="address_ind" value={addressInd}
                     onChange={e => {
                         setAddressInd(e.target.value);
                         errors.addressInd && removeError('addressInd', /^[а-яА-Яa-zA-Z0-9\s?!,.'Ёё]+$/, e);
                     }}
                     className={`form-control ${errors.addressInd && "border-danger"}`}/>
              {errors.addressInd && <span className="text-danger">{errors.addressInd}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputAddressCity">Город</label>
              <input type="text" id="inputAddressCity" name="address_city" value={addressCity}
                     onChange={e => {
                         setAddressCity(e.target.value);
                         errors.addressCity && removeError('addressCity', /^[а-яА-Яa-zA-Z0-9\s?!,.'Ёё]+$/, e);
                     }}
                     className={`form-control ${errors.addressCity && "border-danger"}`}/>
              {errors.addressCity && <span className="text-danger">{errors.addressCity}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputAddressStr">Адрес</label>
              <input type="text" id="inputAddressStr" name="address_str" value={addressStr}
                     onChange={e => {
                         setAddressStr(e.target.value);
                         errors.addressStr && removeError('addressStr', /^[а-яА-Яa-zA-Z0-9\s?!,.'Ёё]+$/, e);
                     }}
                     className={`form-control ${errors.addressStr && "border-danger"}`}/>
              {errors.addressStr && <span className="text-danger">{errors.addressStr}</span>}
          </div>
      </>
    );

});

export default DomainFormRu;