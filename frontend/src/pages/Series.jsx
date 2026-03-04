import { useEffect, useState } from "react";
import { getPopularSeries } from "../services/seriesService";

export default function Series() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    getPopularSeries().then((res) => {
      setSeries(res.data.results);
    });
  }, []);

  return (
    <div>
      <h1>Series Populares</h1>

      {series.map((s) => (
        <div key={s.id}>
          <h3>{s.name}</h3>
        </div>
      ))}
    </div>
  );
}