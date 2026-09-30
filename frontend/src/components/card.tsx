import type { CardProps } from "@/types/types";
import "./card.css";
import Image from "next/image";

export default function Card({ countries }: CardProps) {
  return (
    <div>
      {Object.entries(countries).map(([code, country]) => (
        <div key={code} className="card">
          <Image
            className="flag"
            src={`/assets/${code}.svg`}
            alt={`${country.alt} flag`}
            width={120}
            height={80}
          />
          <h2 className="title">{country.language}</h2>
        </div>
      ))}
    </div>
  );
}
