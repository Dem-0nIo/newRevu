import React, { useState, useEffect } from 'react';
// @ts-ignore
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, subDays, startOfMonth, endOfMonth, startOfYear } from 'date-fns';

import Card, {
  CardHeader,
  CardLabel,
  CardTitle,
  CardBody,
} from '../../../components/bootstrap/Card';

const DailyRecruiterWidget = () => {
  const [week, setWeek] = useState('actual');
  const [recruiters, setRecruiters] = useState([]);
  const [customRange, setCustomRange] = useState<[Date | null, Date | null]>([null, null]);
  const [showCalendar, setShowCalendar] = useState(false);

  // Calcula las fechas según la opción seleccionada
  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const API_URL = process.env.REACT_APP_URL_API;
        const today = new Date();
        let startDate: string | undefined;
        let endDate: string | undefined;

        switch (week) {
          case 'actual': {
            const day = today.getDay();
            const diff = today.getDate() - day + (day === 0 ? -6 : 1);
            const monday = new Date(today.setDate(diff));
            const sunday = new Date(monday);
            sunday.setDate(monday.getDate() + 6);
            startDate = monday.toISOString().slice(0, 10);
            endDate = sunday.toISOString().slice(0, 10);
            break;
          }
          case 'anterior': {
            const currentDay = today.getDay();
            const currentMonday = new Date(today);
            currentMonday.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1));
            const lastMonday = new Date(currentMonday);
            lastMonday.setDate(currentMonday.getDate() - 7);
            const lastSunday = new Date(lastMonday);
            lastSunday.setDate(lastMonday.getDate() + 6);
            startDate = lastMonday.toISOString().slice(0, 10);
            endDate = lastSunday.toISOString().slice(0, 10);
            break;
          }
          case '7d':
            startDate = subDays(today, 6).toISOString().slice(0, 10);
            endDate = today.toISOString().slice(0, 10);
            break;
          case '28d':
            startDate = subDays(today, 27).toISOString().slice(0, 10);
            endDate = today.toISOString().slice(0, 10);
            break;
          case '90d':
            startDate = subDays(today, 89).toISOString().slice(0, 10);
            endDate = today.toISOString().slice(0, 10);
            break;
          case 'mes_actual':
            startDate = startOfMonth(today).toISOString().slice(0, 10);
            endDate = today.toISOString().slice(0, 10);
            break;
          case 'mes_pasado': {
            const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            startDate = startOfMonth(prevMonth).toISOString().slice(0, 10);
            endDate = endOfMonth(prevMonth).toISOString().slice(0, 10);
            break;
          }
          case 'año_actual':
            startDate = startOfYear(today).toISOString().slice(0, 10);
            endDate = today.toISOString().slice(0, 10);
            break;
          case 'personalizado':
            if (customRange[0] && customRange[1]) {
              startDate = customRange[0].toISOString().slice(0, 10);
              endDate = customRange[1].toISOString().slice(0, 10);
            } else {
              // Si no hay rango, no hagas fetch
              setRecruiters([]);
              return;
            }
            break;
          default:
            // Por defecto, semana actual
            const defDay = today.getDay();
            const defDiff = today.getDate() - defDay + (defDay === 0 ? -6 : 1);
            const defMonday = new Date(today.setDate(defDiff));
            const defSunday = new Date(defMonday);
            defSunday.setDate(defMonday.getDate() + 6);
            startDate = defMonday.toISOString().slice(0, 10);
            endDate = defSunday.toISOString().slice(0, 10);
        }

        if (!startDate || !endDate) {
          setRecruiters([]);
          return;
        }

        const res = await fetch(`${API_URL}/api/influencer/by-recruiter?startDate=${startDate}&endDate=${endDate}`);
        const data = await res.json();
        setRecruiters(data);
      } catch (err) {
        console.error('❌ Error loading recruiter data:', err);
        setRecruiters([]);
      }
    };

    fetchRecruiters();

  }, [week, customRange]);

  // Cambia el estado del select y abre/cierra el calendario
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWeek(e.target.value);
    if (e.target.value === "personalizado") {
      setShowCalendar(true);
    } else {
      setShowCalendar(false);
    }
  };

  return (
    <Card stretch>
      <CardHeader>
        <CardLabel>
          <CardTitle tag="div" className="h5">
            Registros diarios por reclutador
          </CardTitle>
        </CardLabel>
      </CardHeader>
      <CardBody isScrollable>
        <div className="d-flex justify-content-end mb-3 align-items-center gap-2 flex-wrap">
          <select
            className="form-select form-select-sm w-auto"
            value={week}
            onChange={handleSelectChange}
          >
            <option value="actual">Esta semana</option>
            <option value="anterior">Semana anterior</option>
            <option value="7d">Últimos 7 días</option>
            <option value="28d">Últimos 28 días</option>
            <option value="90d">Últimos 90 días</option>
            <option value="mes_actual">Este mes</option>
            <option value="mes_pasado">El mes pasado</option>
            <option value="año_actual">Este año</option>
            <option value="personalizado">Personalizado</option>
          </select>
          {week === "personalizado" && (
            <div>
              {/* @ts-ignore */}
              <DatePicker
                selectsRange
                startDate={customRange[0]}
                endDate={customRange[1]}
                 style={{ minWidth: '240px' }}
               onChange={(dates: [Date | null, Date | null]) => {
                  setCustomRange(dates);
                }}
                maxDate={new Date()}
                isClearable
                placeholderText="Selecciona rango de fechas"
                dateFormat="yyyy-MM-dd"
                className="form-control form-control-sm datepicker-custom-width"
              />
            </div>
          )}
        </div>
        <div className="row g-2" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {recruiters.length > 0 ? (
            recruiters.map((r: any) => (
              <div key={r.id} className="col-12 d-flex justify-content-between">
                <span>{r.username}</span>
                <span className="fw-medium">{r.total}</span>
              </div>
            ))
          ) : (
            <div className="col-12 text-muted">No hay registros para este período</div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default DailyRecruiterWidget;