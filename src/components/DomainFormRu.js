import React, {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import ToTranslit from "./ToTranslit";
import DatePicker from "./DatePicker";
import {observer} from "mobx-react-lite";
import InputMask from "react-input-mask";

const DomainFormRu = observer(() => {
    const {domain} = useContext(Context);
    const [formValue, setFormValue] = useState({
        'nameRu': '',
        'familiaRu': '',
        'otchestvoRu': '',
        'familiaEn': '',
        'nameEn': '',
        'otchestvoEn': '',
        'email': '',
        'phone': '',
        'numPassport': '',
        'datePassport': '',
        'orgPassport': '',
        'dateBirthday': '',
        'codePassport': '',
        'addressCountry': '',
        'addressObl': '',
        'addressInd': '',
        'addressCity': '',
        'addressStr': '',
        'error': {}
    });
    const [errors, setErrors] = useState({});


    useEffect(() => {
        Object.keys(domain.domainForm).map((objectKey) => {
            domain.domainForm[objectKey] !== formValue[objectKey] && setFormValue(formValue => ({...formValue, [objectKey]: domain.domainForm[objectKey]}));
        });
    }, [domain.domainForm])

    useEffect(()=>{
        domain.setDomainForm({...domain.domainForm, 'error': domain.domainForm.error});
    },[errors])

    useEffect(() => {
        setErrors(domain.domainForm.error);
    }, [domain.domainForm.error])

    const changeDatePassport = (event) => {
        setFormValue({...formValue, 'datePassport': new Date(event).toLocaleDateString('fr-CA')});
        errors.datePassport && new Date(event).toLocaleDateString('fr-CA') !== "" && new Date(event).toLocaleDateString('fr-CA').match(/\d{4}-\d{2}-\d{2}/) && delete errors.datePassport;
    }

    const changeDateBirthday = (event) => {
        setFormValue({...formValue, 'dateBirthday': new Date(event).toLocaleDateString('fr-CA')});
        errors.dateBirthday && new Date(event).toLocaleDateString('fr-CA') !== "" && new Date(event).toLocaleDateString('fr-CA').match(/\d{4}-\d{2}-\d{2}/) && delete errors.dateBirthday;
    }

    const removeError = (name, pattern, e) => {
        if(errors[name]) {
            if(e.target.value !== "" && e.target.value.match(pattern)) delete errors[name];
        }
    };

    const toEn = (name, set) => {
        setFormValue(formValue => ({...formValue, [set]: ToTranslit(name)}));
        errors[set] && ToTranslit(name) !== "" && ToTranslit(name).match(/^[A-Z][a-z]{1,}/) && delete errors[set];
        set === 'familiaRu' && domain.setDomainForm({...domain.domainForm, 'familiaEn': ToTranslit(name)});
        set === 'nameRu' && domain.setDomainForm({...domain.domainForm, 'nameEn': ToTranslit(name)});
        set === 'otchestvoRu' && domain.setDomainForm({...domain.domainForm, 'otchestvoEn': ToTranslit(name)});
    };

    return(
      <>
          <div className="form-group">
              <label htmlFor="inputFamiliaRu">Фамилия</label>
              <input type="text" id="inputFamiliaRu" name="familiaRu" value={formValue.familiaRu}
                     onChange={e => {
                         setFormValue({...formValue, 'familiaRu': e.target.value});
                         domain.setDomainForm({...domain.domainForm, 'familiaRu': e.target.value});
                         errors.familiaRu && removeError('familiaRu', /^[А-Я][а-я]{1,}/, e);
                         toEn(e.target.value, 'familiaRu');
                     }}
                     className={`form-control ${errors.familiaRu && "border-danger"}`}/>
              {errors.familiaRu && <span className="text-danger">{errors.familiaRu}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputNameRu">Имя</label>
              <input type="text" id="inputNameRu" name="nameRu" value={formValue.nameRu}
                     onChange={e => {
                         setFormValue({...formValue, 'nameRu': e.target.value});
                         domain.setDomainForm({...domain.domainForm, 'nameRu': e.target.value});
                         errors.nameRu && removeError('nameRu', /^[А-Я][а-я]{1,}/, e);
                         toEn(e.target.value, 'nameRu');
                     }}
                     className={`form-control ${errors.nameRu && "border-danger"}`}/>
              {errors.nameRu && <span className="text-danger">{errors.nameRu}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputOtchestvoRu">Отчество</label>
              <input type="text" id="inputOtchestvoRu" name="otchestvoRu" value={formValue.otchestvoRu}
                     onChange={e => {
                         setFormValue({...formValue, 'otchestvoRu': e.target.value});
                         domain.setDomainForm({...domain.domainForm, 'otchestvoRu': e.target.value});
                         errors.otchestvoRu && removeError('otchestvoRu', /^[А-Я][а-я]{2,}/, e);
                         toEn(e.target.value, 'otchestvoRu');
                     }}
                     className={`form-control ${errors.otchestvoRu && "border-danger"}`}/>
              {errors.otchestvoRu && <span className="text-danger">{errors.otchestvoRu}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputFamiliaEn">Фамилия (латиницей)</label>
              <input type="text" id="inputFamiliaEn" name="familiaEn" value={formValue.familiaEn}
                     onChange={e => {
                         setFormValue({...formValue, 'familiaEn': e.target.value});
                         domain.setDomainForm({...domain.domainForm, 'familiaEn': e.target.value});
                         errors.familiaEn && removeError('familiaEn', /^[A-Z][a-z]{1,}/, e);
                     }}
                     className={`form-control ${errors.familiaEn && "border-danger"}`}/>
              {errors.familiaEn && <span className="text-danger">{errors.familiaEn}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputNameEn">Имя  (латиницей)</label>
              <input type="text" id="inputNameEn" name="nameEn" value={formValue.nameEn}
                     onChange={e => {
                         setFormValue({...formValue, 'nameEn': e.target.value});
                         domain.setDomainForm({...domain.domainForm, 'nameEn': e.target.value});
                         errors.nameEn && removeError('nameEn', /^[A-Z][a-z]{1,}/, e);
                     }}
                     className={`form-control ${errors.nameEn && "border-danger"}`}/>
              {errors.nameEn && <span className="text-danger">{errors.nameEn}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputOtchestvoEn">Отчество  (латиницей)</label>
              <input type="text" id="inputOtchestvoEn" name="otchestvoEn" value={formValue.otchestvoEn}
                     onChange={e => {
                         setFormValue({...formValue, 'otchestvoEn': e.target.value});
                         domain.setDomainForm({...domain.domainForm, 'otchestvoEn': e.target.value});
                         errors.otchestvoEn && removeError('otchestvoEn', /^[A-Z][a-z]{1,}/, e);
                     }}
                     className={`form-control ${errors.otchestvoEn && "border-danger"}`}/>
              {errors.otchestvoEn && <span className="text-danger">{errors.otchestvoEn}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputEmail">Email</label>
              <input type="text" id="inputEmail" name="email" value={formValue.email}
                     onChange={e => {
                         setFormValue({...formValue, 'email': e.target.value});
                         domain.setDomainForm({...domain.domainForm, 'email': e.target.value});
                         errors.email && removeError('email', /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, e);
                     }}
                     className={`form-control ${errors.email && "border-danger"}`}/>
              {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="form-group">
          <label htmlFor="inputPhone">Телефон</label>
          <InputMask mask="+7 (999) 999-99-99" value={formValue.phone}
                     onChange={e => {
                         setFormValue({...formValue, 'phone': e.target.value});
                         domain.setDomainForm({...domain.domainForm, 'phone': e.target.value});
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
              <InputMask mask="9999 999999" value={formValue.numPassport}
                         onChange={e => {
                             setFormValue({...formValue, 'numPassport': e.target.value});
                             domain.setDomainForm({...domain.domainForm, 'numPassport': e.target.value});
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
              <input type="text" id="inputOrgPassport" name="org_passport" value={formValue.orgPassport}
                     onChange={e => {
                         setFormValue({...formValue, 'orgPassport': e.target.value});
                         domain.setDomainForm({...domain.domainForm, 'orgPassport': e.target.value});
                         errors.orgPassport && removeError('orgPassport', /^[а-яА-Яa-zA-Z0-9\s?!,.'Ёё]+$/, e);
                     }}
                     className={`form-control ${errors.orgPassport && "border-danger"}`}/>
              {errors.orgPassport && <span className="text-danger">{errors.orgPassport}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputDatePassport">Дата выдачи паспорта</label>
              <div className="input-group date">
                  <InputMask mask="2099-99-99" value={formValue.datePassport}
                             onChange={e => {
                                 setFormValue({...formValue, 'datePassport': e.target.value});
                                 domain.setDomainForm({...domain.domainForm, 'datePassport': e.target.value});
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
                  <InputMask mask="9999-99-99" value={formValue.dateBirthday}
                             onChange={e => {
                                 setFormValue({...formValue, 'dateBirthday': e.target.value});
                                 domain.setDomainForm({...domain.domainForm, 'dateBirthday': e.target.value});
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
              <InputMask mask="999-999" value={formValue.codePassport}
                         onChange={e => {
                             setFormValue({...formValue, 'codePassport': e.target.value});
                             domain.setDomainForm({...domain.domainForm, 'codePassport': e.target.value});
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
              <input type="text" id="inputAddressCountry" name="address_country" value={formValue.addressCountry}
                     onChange={e => {
                         setFormValue({...formValue, 'addressCountry': e.target.value});
                         domain.setDomainForm({...domain.domainForm, 'addressCountry': e.target.value});
                         errors.addressCountry && removeError('addressCountry', /^[а-яА-Я0-9\s?!,.'Ёё]+$/, e);
                     }}
                     className={`form-control ${errors.addressCountry && "border-danger"}`}/>
              {errors.addressCountry && <span className="text-danger">{errors.addressCountry}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputAddressObl">Регион</label>
              <input type="text" id="inputAddressObl" name="address_obl" value={formValue.addressObl}
                     onChange={e => {
                         setFormValue({...formValue, 'addressObl': e.target.value});
                         domain.setDomainForm({...domain.domainForm, 'addressObl': e.target.value});
                         errors.addressObl && removeError('addressObl', /^[а-яА-Я0-9\s?!,.'Ёё]+$/, e);
                     }}
                     className={`form-control ${errors.addressObl && "border-danger"}`}/>
              {errors.addressObl && <span className="text-danger">{errors.addressObl}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputAddressInd">Индекс</label>
              <input type="text" id="inputAddressInd" name="address_ind" value={formValue.addressInd}
                     onChange={e => {
                         setFormValue({...formValue, 'addressInd': e.target.value});
                         domain.setDomainForm({...domain.domainForm, 'addressInd': e.target.value});
                         errors.addressInd && removeError('addressInd', /^[а-яА-Я0-9\s?!,.'Ёё]+$/, e);
                     }}
                     className={`form-control ${errors.addressInd && "border-danger"}`}/>
              {errors.addressInd && <span className="text-danger">{errors.addressInd}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputAddressCity">Город</label>
              <input type="text" id="inputAddressCity" name="address_city" value={formValue.addressCity}
                     onChange={e => {
                         setFormValue({...formValue, 'addressCity': e.target.value});
                         domain.setDomainForm({...domain.domainForm, 'addressCity': e.target.value});
                         errors.addressCity && removeError('addressCity', /^[а-яА-Я0-9\s?!,.'Ёё]+$/, e);
                     }}
                     className={`form-control ${errors.addressCity && "border-danger"}`}/>
              {errors.addressCity && <span className="text-danger">{errors.addressCity}</span>}
          </div>
          <div className="form-group">
              <label htmlFor="inputAddressStr">Адрес</label>
              <input type="text" id="inputAddressStr" name="address_str" value={formValue.addressStr}
                     onChange={e => {
                         setFormValue({...formValue, 'addressStr': e.target.value});
                         domain.setDomainForm({...domain.domainForm, 'addressStr': e.target.value});
                         errors.addressStr && removeError('addressStr', /^[а-яА-Я0-9\s?!,.'Ёё]+$/, e);
                     }}
                     className={`form-control ${errors.addressStr && "border-danger"}`}/>
              {errors.addressStr && <span className="text-danger">{errors.addressStr}</span>}
          </div>
      </>
    );

});

export default DomainFormRu;