import React, { useEffect, useState } from 'react';
import HomeHeader from '../components/HomeHeader';
import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { yearDropdown } from '../utils/data';

const AddNewFir = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [crimeFields, setCrimeFields] = useState([{ id: 1, value: '' }]);
  const [yearData , setYearData] = useState([]);

  useEffect(()=>{
      setYearData(yearDropdown());
  },[])

  const [formData, setFormData] = useState({
    psName: 'شاہ شمس',
    district: 'ملتان',  // Set default value here
    firNumber: '',
    year: '2024',  // Set default value here
    incidentDateTime: dateTime,
    currentDateTime:currentDateTime,
    reportReference: '',
    phoneNumber: '',
    idCard: '',
    fatherOrHusbandName: '',
    name: '',
    initialReport: ''
  });

  const handleDateTimeChange = (value) => {
    setDateTime(value);
  };

  const handleCurrentDateTimeChange = (value) => {
    setCurrentDateTime(value);
  };

  const handleCrimeFieldChange = (id, value) => {
    const updatedFields = crimeFields.map((field) =>
      field.id === id ? { ...field, value: value } : field
    );
    setCrimeFields(updatedFields);
  };

  const addCrimeField = () => {
    setCrimeFields([...crimeFields, { id: crimeFields.length + 1, value: '' }]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Collect all data here
    const dataToSubmit = {
      ...formData,
      crimeFields: crimeFields.map(field => field.value)
    };
    console.log(dataToSubmit);
    toast.success("FIR Submitted successfully");

    // Post data to the database
    setFormData({
      psName: 'شاہ شمس',
      district: 'ملتان',
      firNumber: '',
      year: '2024',
      incidentDateTime: new Date(),
      currentDateTime: new Date(),
      reportReference: '',
      phoneNumber: '',
      idCard: '',
      fatherOrHusbandName: '',
      name: '',
      initialReport: ''
    });
    setDateTime(new Date());
    setCurrentDateTime(new Date());
    setCrimeFields([{ id: 1, value: '' }]);

    // Show success toast
  };

  const psName = ["شاہ شمس", "گلگشت", "چہلیک", "نیو ملتان", "جلیل آباد", "کینٹ"];

  return (
    <div>
      <HomeHeader />
      <h1 className='font-urdufont text-center mt-5 font-bold bg-[#f7f7f7] p-4'>
        نئی ایف آئی آر درج کریں
      </h1>
      <div className='container mx-auto flex justify-end py-10'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-[#f7f7f7] p-4'>
          {/* Row 1 */}
          <div id='row 1' className='flex items-center justify-end gap-3 shadow-sm py-2 px-1 '>
            <div className='flex gap-2 items-center'>
              <DatePicker
                value={dateTime}
                onChange={handleDateTimeChange}
                format='DD/MM/YYYY hh:mm:ss A'
                plugins={[<TimePicker position='right' format="hh:mm A" />]}
                style={{ 
                  height: '40px', 
                  width: '200px',
                  border: "grey 200px",
                  borderRadius: '0rem' 
                }}
              />
              <label htmlFor="crimeDateTime" className='font-urdufont pl-4'>تاریخ وقت وقوعہ</label>
            </div>
            <div className='flex gap-2 items-center'>
              <select 
                name="psName" 
                id="psName" 
                className='border border-gray-200 w-40 h-10 shadow-sm rounded-sm font-urdufont text-right px-2'
                onChange={handleInputChange}
                value={formData.psName}
              >
                {
                  psName.map((name, index) => (
                    <option key={index} value={name} className='font-urdufont pr-2'>{name}</option>
                  ))
                }
              </select>
              <label htmlFor="psName" className='font-urdufont pl-4'>تھانہ</label>
            </div>
            <div className='flex gap-2 items-center'>
              <select 
                name="district" 
                id="district" 
                className='border border-gray-200 w-20 h-10 shadow-sm rounded-sm'
                onChange={handleInputChange}
                value={formData.district}
              >
                <option value="ملتان">ملتان</option>
              </select>
              <label htmlFor="district" className='font-urdufont pl-4'>ضلع</label>
            </div>
            <div className='flex gap-2 items-center'>
              <input 
                type="text" 
                name="firNumber" 
                placeholder='نمبر Fir' 
                className='font-urdufont border-gray-200 w-20 h-10 border shadow-sm rounded-sm placeholder:text-right p-2' 
                onChange={handleInputChange}
                value={formData.firNumber}
                required
              />
              <label htmlFor="firNumber" className='font-urdufont pl-4'>نمبر </label>
            </div>
            <div className='flex gap-2 items-center'>
              <select 
                name="year" 
                id="year" 
                className='border border-gray-200 w-20 h-10 shadow-sm rounded-sm'
                onChange={handleInputChange}
                value={formData.year}
              >
                {
               yearData.map((year,index) => (
                  <option index={index} value={year}>{year}</option>
               ))
              }
              </select>
              <label htmlFor="year" className='font-urdufont pl-4'>سال</label>
            </div>
          </div>
          {/* Row 2 */}
          <div id='Row 2' className='flex items-center justify-end gap-3 shadow-sm py-2 px-1'>
            <div className='flex gap-2 items-center'>
              <DatePicker
                value={currentDateTime}
                onChange={handleCurrentDateTimeChange}
                format='DD/MM/YYYY hh:mm:ss A'
                plugins={[<TimePicker position='right' format="hh:mm A" />]}
                style={{
                  height: '40px', 
                  width: '200px', 
                  border: "grey 200px",
                  borderRadius: '0rem'
                }}
              />
              <label htmlFor="currentDateTime" className='pl-4 font-urdufont'>مورخہ</label>
            </div>
            <div className='flex gap-2 items-center'>
              <input 
                type="text" 
                name="reportReference" 
                placeholder='رپٹ نمبر درج کریں' 
                className='font-urdufont border-gray-200 w-[130px] h-10 border shadow-sm rounded-sm placeholder:text-right p-2 focus:outline-none focus:border-[#092635] focus:ring-1 focus:ring-[#092635]' 
                onChange={handleInputChange}
                value={formData.reportReference}
                required
              />
              <label htmlFor="reportReference" className='pl-4 font-urdufont'>بحوالہ</label>
            </div>
            <div className='pl-4 font-urdufont'>
              تاریخ ووقت رپورٹ
            </div>
          </div>
          {/* Row 3 */}
          <div className='flex items-center justify-end gap-3 shadow-sm py-2 px-1'>
            <div>
              <input 
                type="number" 
                name="phoneNumber" 
                placeholder='فون نمبر درج کریں' 
                className='font-urdufont border-gray-200 w-[150px] h-10 border shadow-sm rounded-sm placeholder:text-right p-2 focus:outline-none focus:border-[#092635] focus:ring-1 focus:ring-[#092635]'
                onChange={handleInputChange}
                value={formData.phoneNumber}
                required
              />
              <label htmlFor="phoneNumber" className='pl-4 font-urdufont'>فون نمبر</label>
            </div>
            <div>
              <input 
                type="number" 
                name="idCard" 
                placeholder='شناختی کارڈ درج کریں' 
                className='font-urdufont border-gray-200 w-[170px] h-10 border shadow-sm rounded-sm placeholder:text-right p-2 focus:outline-none focus:border-[#092635] focus:ring-1 focus:ring-[#092635]'
                onChange={handleInputChange}
                value={formData.idCard}
                required
              />
              <label htmlFor="idCard" className='pl-4 font-urdufont'>شناختی کارڈ</label>
            </div>
            <div>
              <input 
                type="text" 
                name="fatherOrHusbandName" 
                placeholder='ولدیت /شوہر کا نام درج کریں' 
                className='font-urdufont border-gray-200 w-[200px] h-10 border shadow-sm rounded-sm placeholder:text-right p-2 focus:outline-none focus:border-[#092635] focus:ring-1 focus:ring-[#092635]' 
                onChange={handleInputChange}
                value={formData.fatherOrHusbandName}
                required
              />
              <label htmlFor="fatherOrHusbandName" className='pl-4 font-urdufont'>نام ولدیت/شوہر</label>
            </div>
            <div>
              <input 
                type="text" 
                name="name" 
                placeholder='نام درج کریں' 
                className='font-urdufont border-gray-200 w-[130px] h-10 border shadow-sm rounded-sm placeholder:text-right p-2 focus:outline-none focus:border-[#092635] focus:ring-1 focus:ring-[#092635]' 
                onChange={handleInputChange}
                value={formData.name}
                required
              />
              <label htmlFor="name" className='pl-4 font-urdufont'>نام</label>
            </div>
            <h1 className='pl-4 font-urdufont'>نام و اطلاع دہندہ مستغیث</h1>
          </div>
          {/* Row 4 */}
          <div>
            <button 
              type="button" 
              onClick={addCrimeField} 
              className='bg-[#092635] text-white px-4 py-2 rounded-sm font-urdufont'
            >
                نیا اندراج
            </button>
            {crimeFields.map((field) => (
              <div key={field.id} className='flex items-center justify-end mb-2'>
                <input 
                  type="text" 
                  placeholder='جرم' 
                  className='font-urdufont border-gray-200 w-[300px] h-10 shadow-sm rounded-sm placeholder:text-right p-2 focus:outline-none focus:border-[#092635] focus:ring-1 focus:ring-[#092635]' 
                  value={field.value}
                  onChange={(e) => handleCrimeFieldChange(field.id, e.target.value)}
                  required
                />
                <h1 className='font-urdufont pl-4'>مختصر کیفیت جرم</h1>
              </div>
            ))}
          </div>
          {/* Row 5 */}
          <div className='flex flex-col gap-3 items-center'>
            <h1 className='font-urdufont'>(ابتدائی اطلاع نیچے درج کرو)</h1>
            <div>
              <textarea 
                name="initialReport" 
                id="initialReport"  
                className='border resize-none w-[1200px] h-[500px] border-gray-300 text-right' 
                onChange={handleInputChange}
                value={formData.initialReport}
                required
              ></textarea>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <button type="submit" className='font-urdufont p-2 bg-[#092635] rounded-sm tracking-wider w-80 text-white font-semibold hover:bg-black '>محفوظ کریں</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewFir;
