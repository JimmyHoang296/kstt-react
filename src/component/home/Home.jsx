import React, { useEffect, useState } from 'react'
import { getCurrentWeek, getDayOfWeek, getWeekDayList } from '../../assets/getWeekDay'
import submitWork from '../../api/submitWork'
import Loading from '../Loading'


function startWorks(week) {
  const { user, works } = JSON.parse(localStorage.getItem('data'))
  const dayList = getWeekDayList(week)
  console.log(works)
  const jobs = dayList.reduce((acc, day) => ([...acc,
  {
    week: week,
    id: day + user.id,
    date: `${day.slice(-2)}/${day.slice(4, 6)}/${day.slice(0, 4)}`,
    place: (works.find(i => i.id === (day + user.id))?.place || ""),
    work: (works.find(i => i.id === (day + user.id))?.job || "")
  }]
  ), [])
  return jobs
}



export default function Home() {
  const [week, setWeek] = useState(getCurrentWeek())
  const [works, setWorks] = useState(startWorks(week))
  const [showModal, setShowModal] = useState(false)

  async function submitChange (){

    setShowModal(true)
    const res = await submitWork(works)
    localStorage.setItem('data', JSON.stringify(res.data))
    
    setShowModal(false)

  }

  useEffect(() => {
    setWorks(startWorks(week))
  }, [week])

  const btnStyle = 'px-2 py-1 h-10 text-base'

  const handleInputChange = (e) => { 
    const name = e.target.name
    const id = e.target.id
    const oldVal = works.find(work => work.id === id)
    const newVal = { ...oldVal, [name]: e.target.value }
    setWorks(works.map(work => (work.id === id ? newVal : work)))
  }


  return (
    <div className='p-3'>
      <div className='flex gap-2 mt-3 mb-2'>
        <button className={btnStyle} onClick={e => setWeek(week - 1)}>Tuần trước</button>
        <select className='px-2 rounded-full' value={week} onChange={e => setWeek(e.target.value)}>
          {[...Array(52).keys()].map(w => (
            <option key={w + 1} value={w + 1}>Tuần {w + 1}</option>
          ))}
        </select>
        <button className={btnStyle} onClick={e => setWeek(week + 1)}>Tuần sau</button>
      </div>
      <h1 className='my-2'>Nhập lịch làm việc từ {getDayOfWeek(week)}</h1>
      <button onClick={submitChange} className={btnStyle}>Lưu thay đổi</button>

      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">

          <tr>
            <th className='px-6 py-4'>Ngày</th>
            <th className='px-6 py-4'>Nơi làm việc</th>
            <th className='px-6 py-4'>Công việc</th>
          </tr>
        </thead>
        <tbody>
          {works.map(work => (
            <tr className='border-b dark:border-neutral-500' key={work.id}>
              <td className='whitespace-nowrap px-6 py-4' >{work.date}</td>
              <td className='whitespace-nowrap px-6 py-4'> <input type="text" name='place' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" id={work.id} value={work.place} onChange={e => handleInputChange(e)} /> </td>
              <td className='whitespace-nowrap px-6 py-4'><input type="text" name='work' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" id={work.id} value={work.work} onChange={e => handleInputChange(e)} /></td>
            </tr>
          ))}
        </tbody>


      </table>

      {showModal&&<Loading />}
    </div>
  )
}
