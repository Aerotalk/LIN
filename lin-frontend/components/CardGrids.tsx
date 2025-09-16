import { se } from "date-fns/locale";
import React from "react";
import { Card } from "./ui/card";
import { CardData } from "@/lib/types";

const CardGrids = ({ cardsData }: { cardsData: CardData[] }) => {
  return (
    <section className="w-full max-w-7xl mx-auto py-4 px-6 md:p-12 lg:p-20">
      <div
        className={`grid md:grid-cols-${Math.ceil(
          cardsData.length / 2
        )} grid-cols-1 gap-6 w-full`}
      >
        {cardsData.map((card, index) => (
          <Card key={index} className="bg-secondary rounded-lg shadow-md p-6">
            <div className="flex flex-col justify-center items-center text-center space-y-4">
              <div className="bg-primary p-4 rounded-full">{card.iconImg}</div>
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CardGrids;
