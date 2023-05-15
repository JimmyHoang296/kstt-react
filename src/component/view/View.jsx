import React, { useEffect, useState } from "react";
import {
  getCurrentWeek,
  getDayOfWeek,
  getWeekDayList,
} from "../../assets/getWeekDay";

function startWorks(week, weekDay = "all") {
  const { works } = JSON.parse(localStorage.getItem("data"));
  const workWeek = works.filter((work) => work.week === week);
  var jobs = workWeek.map((d) => ({
    ...d,
    date: `${d.id.slice(6, 8)}/${d.id.slice(4, 6)}/${d.id.slice(0, 4)}`,
  }));

  if (weekDay === "all") {
    return jobs;
  }

  jobs = jobs.filter((d) => d.id.includes(weekDay));

  return jobs;
}

export default function View() {
  const [week, setWeek] = useState(getCurrentWeek());
  const [weekDay, setWeekDay] = useState("all");
  const [works, setWorks] = useState(startWorks(week, weekDay));
  const dayList = getWeekDayList(week);

  useEffect(() => {
    setWeekDay("all");
  }, [week]);
  useEffect(() => {
    setWorks(startWorks(week, weekDay));
  }, [week, weekDay]);

  const btnStyle = "px-2 py-1 h-10 text-base";

  return (
    <div className="p-3">
      <h1 className="my-2">Nhập lịch làm việc từ {getDayOfWeek(week)}</h1>
      <div className="flex gap-2 mt-3 mb-2">
        <button className={btnStyle} onClick={(e) => setWeek(week - 1)}>
          Tuần trước
        </button>
        <select
          className="px-2 rounded-full"
          value={week}
          onChange={(e) => setWeek(e.target.value)}
        >
          {[...Array(52).keys()].map((w) => (
            <option key={w + 1} value={w + 1}>
              Tuần {w + 1}
            </option>
          ))}
        </select>
        <button className={btnStyle} onClick={(e) => setWeek(week + 1)}>
          Tuần sau
        </button>
      </div>
      <div className="flex">
        {dayList.map((day, index) => (
          <button
            className={day === weekDay ? "p-2 bg-white" : "p-2 "}
            onClick={(e) => setWeekDay(day)}
          >
            Thứ {index + 2}
          </button>
        ))}
        <button
          className={weekDay === "all" ? "p-2 bg-white" : "p-2 "}
          onClick={(e) => setWeekDay("all")}
        >
          All
        </button>
      </div>

      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th className="px-6 py-4">Ngày</th>
            <th className="px-6 py-4">Member</th>
            <th className="px-6 py-4">Nơi làm việc</th>
            <th className="px-6 py-4">Công việc</th>
          </tr>
        </thead>
        <tbody>
          {works.map((work) => (
            <tr className="border-b dark:border-neutral-500" key={work.id}>
              <td className="w-1/6 px-6 py-4">{work.date}</td>
              <td className="w-1/6 px-6 py-4">{work.name}</td>
              <td className="w-1/6 px-6 py-4">{work.place}</td>
              <td className="w-1/2break-words px-6 py-4">{work.job}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
